// robot.js
// Tabs + robot photo lightbox (images only)

(function () {
  // -------------------------
  // Season/Year tabs (optional)
  // -------------------------
  function initRobotTabs() {
    const tabs = document.querySelectorAll(".robot-tab");
    const panels = document.querySelectorAll(".robot-year");
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
  // Robot photo lightbox
  // -------------------------
  function initRobotLightbox() {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    const lightboxClose = document.getElementById("lightboxClose");

    if (!lightbox || !lightboxImg || !lightboxClose) return;

    function openLightbox(src, alt) {
      lightboxImg.src = src;
      lightboxImg.alt = alt || "Robot photo";
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
    }

    function closeLightbox() {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      lightboxImg.src = "";
      lightboxImg.alt = "";
    }

    // Open when clicking any robot photo card
    document.addEventListener("click", (e) => {
      const card = e.target.closest(".robot-photo-card");
      if (!card) return;

      const full = card.getAttribute("data-full");
      const img = card.querySelector("img");
      if (!full) return;

      openLightbox(full, img ? img.alt : "Robot photo");
    });

    // Close button
    lightboxClose.addEventListener("click", closeLightbox);

    // Close on backdrop click
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    // Escape closes
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && lightbox.classList.contains("is-open")) {
        closeLightbox();
      }
    });

    // Optional: soft protection
    document.addEventListener("contextmenu", (e) => {
      if (e.target.closest(".robot-photo-card img") || e.target.closest(".lightbox-img")) {
        e.preventDefault();
      }
    });
  }

  // Init
  document.addEventListener("DOMContentLoaded", () => {
    initRobotTabs();
    initRobotLightbox();
  });
})();

