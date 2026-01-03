// innovation.js
// Tabs + modal gallery (images only)

(function () {
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

  function initMediaModal() {
    const modal = document.getElementById("mediaModal");
    const imgEl = document.getElementById("mediaImage");
    const captionEl = document.getElementById("mediaCaption");
    const closeBtn = document.getElementById("mediaClose");
    const prevBtn = document.getElementById("mediaPrev");
    const nextBtn = document.getElementById("mediaNext");
    const bodyEl = document.getElementById("mediaBody");

    if (!modal || !imgEl || !captionEl || !closeBtn || !prevBtn || !nextBtn) return;

    let gallery = [];
    let index = 0;

    function render() {
      if (!gallery.length) return;
      imgEl.src = gallery[index];
      captionEl.textContent = `Viewing ${index + 1} / ${gallery.length}`;
      prevBtn.disabled = index === 0;
      nextBtn.disabled = index === gallery.length - 1;
    }

    function openModal(list, startIdx) {
      gallery = Array.isArray(list) ? list : [];
      index = Math.max(0, Math.min(Number(startIdx) || 0, gallery.length - 1));
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      render();
    }

    function closeModal() {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      imgEl.src = "";
      gallery = [];
      index = 0;
    }

    document.querySelectorAll(".media-thumb").forEach((btn) => {
      btn.addEventListener("click", () => {
        try {
          const list = JSON.parse(btn.dataset.gallery || "[]");
          const start = parseInt(btn.dataset.start || "0", 10);
          openModal(list, start);
        } catch (e) {
          console.error("Invalid gallery JSON in data-gallery", e);
        }
      });
    });

    closeBtn.addEventListener("click", closeModal);
    modal.addEventListener("mousedown", (e) => {
      if (e.target === modal) closeModal();
    });

    prevBtn.addEventListener("click", () => {
      index = Math.max(0, index - 1);
      render();
    });

    nextBtn.addEventListener("click", () => {
      index = Math.min(gallery.length - 1, index + 1);
      render();
    });

    window.addEventListener("keydown", (e) => {
      if (!modal.classList.contains("is-open")) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") { index = Math.max(0, index - 1); render(); }
      if (e.key === "ArrowRight") { index = Math.min(gallery.length - 1, index + 1); render(); }
    });

    if (bodyEl) bodyEl.addEventListener("contextmenu", (e) => e.preventDefault());
  }

  document.addEventListener("DOMContentLoaded", () => {
    initInnovationTabs();
    initMediaModal();
  });
})();

