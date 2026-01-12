// innovation.js
// Tabs + poster lightbox (images only)

(function () {
  // -------------------------
  // Year tabs
  // -------------------------
  function initInnovationTabs() {
    const tabs = document.querySelectorAll(".year-tab");
    const panels = document.querySelectorAll(".innovation-year");
    if (!tabs.length || !panels.length) return;

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const targetId = tab.dataset.year;

        tabs.forEach((t) => {
          t.classList.remove("is-active");
          t.setAttribute("aria-selected", "false");
        });

        panels.forEach((p) => p.classList.remove("is-active"));

        tab.classList.add("is-active");
        tab.setAttribute("aria-selected", "true");

        const panel = document.getElementById(targetId);
        if (panel) panel.classList.add("is-active");
      });
    });
  }

  // -------------------------
  // Poster lightbox
  // -------------------------
  function initPosterLightbox() {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    const lightboxClose = document.getElementById("lightboxClose");

    if (!lightbox || !lightboxImg || !lightboxClose) return;

    function openLightbox(src, alt) {
      lightboxImg.src = src;
      lightboxImg.alt = alt || "Poster";
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
    }

    function closeLightbox() {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      lightboxImg.src = "";
      lightboxImg.alt = "";
    }

    // Open when clicking any poster card
    document.addEventListener("click", (e) => {
      const card = e.target.closest(".poster-card");
      if (!card) return;

      const full = card.getAttribute("data-full");
      const img = card.querySelector("img");
      if (!full || !img) return;

      openLightbox(full, img.alt);
    });

    // Close button
    lightboxClose.addEventListener("click", closeLightbox);

    // Close on backdrop click
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    // Escape key closes
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && lightbox.classList.contains("is-open")) {
        closeLightbox();
      }
    });

    // Optional: prevent easy right-click save on poster images (soft protection)
    document.addEventListener("contextmenu", (e) => {
      if (e.target.closest(".poster-card img") || e.target.closest(".lightbox-img")) {
        e.preventDefault();
      }
    });
  }

  // Init
  document.addEventListener("DOMContentLoaded", () => {
    initInnovationTabs();
    initPosterLightbox();
  });
})();

