document.addEventListener("DOMContentLoaded", () => {
  // Remover cualquier barra de progreso existente
  const existingBars = document.querySelectorAll(".progress-bar");
  existingBars.forEach((bar) => bar.remove());

  // Crear nueva barra
  const progressBar = document.createElement("div");
  progressBar.className = "progress-bar";
  document.body.insertBefore(progressBar, document.body.firstChild);

  function updateProgressBar() {
    requestAnimationFrame(() => {
      const windowHeight = window.innerHeight;
      const documentHeight =
        Math.max(
          document.body.scrollHeight,
          document.body.offsetHeight,
          document.documentElement.clientHeight,
          document.documentElement.scrollHeight,
          document.documentElement.offsetHeight
        ) - windowHeight;
      const scrolled = window.pageYOffset || document.documentElement.scrollTop;
      const progress = (scrolled / documentHeight) * 100;
      progressBar.style.width = `${Math.min(progress, 100)}%`;
    });
  }

  // Eventos con throttling para mejor rendimiento
  let ticking = false;
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateProgressBar();
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true }
  );

  // Actualizar en cambios de tamaño y orientación
  window.addEventListener("resize", updateProgressBar);
  window.addEventListener("orientationchange", updateProgressBar);

  // Actualización inicial
  updateProgressBar();

  const tooltip = document.createElement("div");
  tooltip.className = "footnote-tooltip";
  document.body.appendChild(tooltip);

  function getFootnoteText(element) {
    const parent = element.parentNode;
    const clone = parent.cloneNode(true);

    // Remover el número de la nota y el enlace de retorno
    const footnoteNumber = clone.querySelector(`a[id^="sdfootnote"]`);
    if (footnoteNumber) {
      footnoteNumber.remove();
    }

    // También remover el enlace de retorno si existe
    const returnLink = clone.querySelector(`a[href^="#sdfootnote"]`);
    if (returnLink) {
      returnLink.remove();
    }

    // Limpiar espacios extra al inicio
    const cleanText = clone.innerHTML.trim().replace(/^\s*\d+\s*/, "");
    return cleanText;
  }

  function positionTooltip(element, tooltip) {
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let left = rect.left;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const tooltipWidth = tooltip.offsetWidth;
    const tooltipHeight = tooltip.offsetHeight;

    // Ajustar posición horizontal
    if (left + tooltipWidth > viewportWidth) {
      left = viewportWidth - tooltipWidth - 20;
    }
    left = Math.max(10, left);

    // Decidir si mostrar arriba o abajo
    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;
    const showAbove = spaceBelow < tooltipHeight && spaceAbove > tooltipHeight;

    const top = showAbove
      ? rect.top + scrollTop - tooltipHeight - 5
      : rect.bottom + scrollTop + 5;

    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
  }

  const footnoteLinks = document.querySelectorAll(
    '.content-full sup a[href^="#sdfootnote"]'
  );

  footnoteLinks.forEach((link) => {
    const targetId = link
      .getAttribute("href")
      .substring(1)
      .replace("anc", "sym");
    const footnoteContent = document.getElementById(targetId);

    if (!footnoteContent) return;

    // Eventos para el tooltip
    link.addEventListener("mouseover", (e) => {
      const noteText = getFootnoteText(footnoteContent);
      tooltip.innerHTML = noteText;
      tooltip.style.display = "block";
      positionTooltip(link, tooltip);
      e.preventDefault();
    });

    link.addEventListener("mouseout", () => {
      tooltip.style.display = "none";
    });

    link.addEventListener("click", (e) => {});
  });
});
