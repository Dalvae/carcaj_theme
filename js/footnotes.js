document.addEventListener("DOMContentLoaded", () => {
  const tooltip = document.createElement("div");
  tooltip.className = "footnote-tooltip";
  document.body.appendChild(tooltip);

  function isMobile() {
    return window.innerWidth <= 1000;
  }

  function getFootnoteText(element) {
    const parent = element.parentNode;
    const clone = parent.cloneNode(true);

    const footnoteNumber = clone.querySelector(
      `a[id^="sdfootnote"], a[id^="_ftn"]`
    );
    if (footnoteNumber) footnoteNumber.remove();

    const returnLinks = clone.querySelectorAll(
      `a[href^="#sdfootnote"], a[href^="#_ftnref"]`
    );
    returnLinks.forEach((link) => link.remove());

    const supElement = clone.querySelector("sup");
    if (supElement) supElement.remove();

    return clone.innerHTML
      .trim()
      .replace(/^\s*\[\d+\]\s*/, "")
      .replace(/^\s*\d+\s*/, "");
  }

  function positionTooltip(element, tooltip) {
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let left = rect.left;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const tooltipWidth = tooltip.offsetWidth;
    const tooltipHeight = tooltip.offsetHeight;

    if (left + tooltipWidth > viewportWidth) {
      left = viewportWidth - tooltipWidth - 20;
    }
    left = Math.max(10, left);

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
    '.content-full sup a[href^="#sdfootnote"], .content-full a[href^="#_ftn"] sup'
  );

  footnoteLinks.forEach((link) => {
    const href =
      link.getAttribute("href") || link.parentNode.getAttribute("href");
    let targetId = href.substring(1);

    if (targetId.startsWith("sdfootnote")) {
      targetId = targetId.replace("anc", "sym");
    }

    const footnoteContent = document.getElementById(targetId);
    if (!footnoteContent) return;

    const eventTarget = link.tagName === "SUP" ? link.parentNode : link;

    // Verificar si estamos en las notas al pie
    const isInFootnotes =
      href.includes("_ftnref") || href.includes("sdfootnoteanc");

    if (isMobile() && !isInFootnotes) {
      eventTarget.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        const nextElement = eventTarget.nextElementSibling;

        // Si ya existe una nota expandida, la removemos
        if (nextElement?.classList.contains("expanded-footnote")) {
          nextElement.classList.add("removing");
          nextElement.classList.remove("entering");
          // Removemos después de la animación de opacidad
          setTimeout(() => nextElement.remove(), 200);
          return;
        }

        // Remover cualquier otra nota expandida
        document.querySelectorAll(".expanded-footnote").forEach((el) => {
          el.classList.add("removing");
          el.classList.remove("entering");
          setTimeout(() => el.remove(), 200);
        });

        // Crear y agregar la nueva nota
        const noteText = getFootnoteText(footnoteContent);
        const expandedNote = document.createElement("div");
        expandedNote.className = "expanded-footnote";
        expandedNote.innerHTML = noteText;

        // Insertar después del eventTarget
        eventTarget.insertAdjacentElement("afterend", expandedNote);

        // Forzar reflow
        expandedNote.offsetHeight;

        // Iniciar animación de entrada
        requestAnimationFrame(() => {
          expandedNote.classList.add("entering");
          expandedNote.style.maxHeight = expandedNote.scrollHeight + "px";
        });

        // Evento click para cerrar
        expandedNote.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          expandedNote.classList.add("removing");
          expandedNote.classList.remove("entering");
          setTimeout(() => expandedNote.remove(), 200);
        });
      });
    } else if (!isMobile()) {
      // Comportamiento desktop sin cambios
      eventTarget.addEventListener("mouseover", (e) => {
        const noteText = getFootnoteText(footnoteContent);
        tooltip.innerHTML = noteText;
        tooltip.style.display = "block";
        positionTooltip(eventTarget, tooltip);
      });

      eventTarget.addEventListener("mouseout", () => {
        tooltip.style.display = "none";
      });

      eventTarget.addEventListener("click", (e) => {
        const target = document.getElementById(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth" });
        }
      });
    }
  });
});
