document.addEventListener("DOMContentLoaded", () => {
  const contentFull = document.querySelector(".content-full");

  // If there's no content-full div, don't create the progress bar
  if (!contentFull) {
    return;
  }

  // Remove any existing progress bars
  const existingBars = document.querySelectorAll(".progress-bar");
  existingBars.forEach((bar) => bar.remove());

  // Create the progress bar
  const progressBar = document.createElement("div");
  progressBar.className = "progress-bar";
  document.body.insertBefore(progressBar, document.body.firstChild);

  function updateProgressBar() {
    // Get the content dimensions
    const contentRect = contentFull.getBoundingClientRect();
    const contentTop = contentRect.top + window.pageYOffset;
    const contentHeight = contentRect.height;

    // Calculate visible portion of the content
    const viewportHeight = window.innerHeight;
    const currentScroll = window.pageYOffset;

    // Calculate progress based on content visibility
    let progress = 0;

    if (currentScroll > contentTop) {
      // Calculate how much of the content has been scrolled past
      const scrolledContent = currentScroll - contentTop;
      // The viewable content height is the content height minus one viewport
      const viewableContentHeight = contentHeight - viewportHeight;
      // Calculate progress percentage
      progress = (scrolledContent / viewableContentHeight) * 100;
      // Ensure progress stays between 0 and 100
      progress = Math.min(Math.max(progress, 0), 100);
    }

    requestAnimationFrame(() => {
      progressBar.style.width = `${progress}%`;
    });
  }

  let ticking = false;
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateProgressBar();
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true }
  );

  // Handle window resize and orientation changes
  window.addEventListener("resize", updateProgressBar);
  window.addEventListener("orientationchange", updateProgressBar);

  // Initial update
  updateProgressBar();
});
