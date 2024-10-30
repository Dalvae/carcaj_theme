document.addEventListener("DOMContentLoaded", () => {
  // Remover barras existentes
  const existingBars = document.querySelectorAll(
    ".progress-bar, .progress-bar-container"
  );
  existingBars.forEach((bar) => {
    if (bar.parentElement.getAttribute("style")?.includes("position: fixed")) {
      bar.parentElement.remove();
    } else {
      bar.remove();
    }
  });

  // Obtener el ancho del viewport antes de crear la barra
  const viewportWidth = window.visualViewport
    ? window.visualViewport.width
    : window.innerWidth;
  console.log("Viewport width:", viewportWidth); // Debug

  // Crear la barra con el ancho máximo establecido
  const progressBar = document.createElement("div");
  progressBar.className = "progress-bar";
  progressBar.style.maxWidth = `${viewportWidth}px`;
  document.body.insertBefore(progressBar, document.body.firstChild);

  function updateProgressBar() {
    requestAnimationFrame(() => {
      // Actualizar el ancho máximo en cada cambio
      const currentViewportWidth = window.visualViewport
        ? window.visualViewport.width
        : window.innerWidth;
      progressBar.style.maxWidth = `${currentViewportWidth}px`;

      const viewportHeight = window.innerHeight;
      const totalScroll =
        document.documentElement.scrollHeight - viewportHeight;
      const currentScroll = window.scrollY;
      const progress = (currentScroll / totalScroll) * 100;

      // Aplicar el progreso como porcentaje del viewport width
      const progressWidth =
        (currentViewportWidth * Math.min(progress, 100)) / 100;
      progressBar.style.width = `${progressWidth}px`;

      // Debug
      console.log({
        viewportWidth: currentViewportWidth,
        progressWidth,
        progress: `${progress}%`,
      });
    });
  }

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

  // Actualizar cuando cambie el tamaño de la ventana
  window.addEventListener("resize", updateProgressBar);
  window.addEventListener("orientationchange", updateProgressBar);

  // Usar VisualViewport API para mayor precisión en móviles
  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", updateProgressBar);
    window.visualViewport.addEventListener("scroll", updateProgressBar);
  }

  updateProgressBar();
});
