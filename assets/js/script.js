(function () {
  "use strict";

  const offcanvas = document.querySelector(".offcanvas");
  const overlay = document.querySelector(".header-offcanvas-overlay");
  const openMenuButton = document.querySelector(".header-offcanvas-toogle");
  const closeMenuButton = document.querySelector(".offcanvas-close-toggle");
  const progress = document.getElementById("progress");

  const closeMenu = () => {
    offcanvas?.classList.remove("header-offcanvas-open");
    overlay?.classList.remove("header-offcanvas-overlay-open");
  };

  openMenuButton?.addEventListener("click", () => {
    offcanvas?.classList.add("header-offcanvas-open");
    overlay?.classList.add("header-offcanvas-overlay-open");
  });

  closeMenuButton?.addEventListener("click", closeMenu);
  overlay?.addEventListener("click", closeMenu);

  document.querySelectorAll(".offcanvas-menu a[href^='#']").forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetHash = link.getAttribute("href");
      const target = targetHash ? document.querySelector(targetHash) : null;

      if (!target) {
        return;
      }

      event.preventDefault();
      closeMenu();
      target.scrollIntoView({ behavior: "smooth", block: "start" });

      if (window.history && window.history.pushState) {
        const cleanPath = window.location.pathname.replace(/index\.html$/, "");
        window.history.pushState(null, "", cleanPath + targetHash);
      } else {
        window.location.hash = targetHash;
      }
    });
  });

  const updateStickyHeader = () => {
    const header = document.getElementById("menu-header-sticky");
    header?.classList.toggle("header-sticky", window.scrollY >= 100);
  };

  const updateProgress = () => {
    if (!progress) {
      return;
    }

    const scrollableHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollValue = scrollableHeight > 0 ? Math.round((window.scrollY * 100) / scrollableHeight) : 0;

    progress.style.display = window.scrollY > 100 ? "grid" : "none";
    progress.style.background = `conic-gradient(#9490e3 ${scrollValue}%, #FFF ${scrollValue}%)`;
  };

  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  progress?.addEventListener("click", backToTop);
  progress?.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      backToTop();
    }
  });

  const revealElements = document.querySelectorAll(
    ".section-heading, .chapter-item, .feature-style-2, .pricing-item, .review-item, .author-section, .faq .accordion-item, .synopsis-content"
  );

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -80px 0px" });

    revealElements.forEach((element) => {
      element.classList.add("reveal");
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("active");
    });
  }

  updateStickyHeader();
  updateProgress();
  window.addEventListener("scroll", () => {
    updateStickyHeader();
    updateProgress();
  }, { passive: true });
})();
