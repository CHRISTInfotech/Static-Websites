(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealSelector = ".section, .category-tile, .product, .process-card, .occasion-card, .testimonial-card, .contact-card, .about-intro-copy, .about-intro-photo, .about-craft-copy, .craft-detail-photo, .contact-layout > *, .contact-form-grid > *";
  const revealElements = [...document.querySelectorAll(revealSelector)];
  if (!reduceMotion && "IntersectionObserver" in window) {
    document.documentElement.classList.add("motion-ready");
    revealElements.forEach((element, index) => {
      element.classList.add("scroll-reveal");
      const siblings = [...element.parentElement.children].filter(sibling => sibling.matches(revealSelector));
      const position = Math.max(0, siblings.indexOf(element));
      element.style.setProperty("--reveal-delay", `${Math.min(position * 55, 220)}ms`);
    });
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.08, rootMargin: "0px 0px -24px 0px" });
    revealElements.forEach(element => observer.observe(element));
  }

  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    const updateBackToTop = () => backToTop.classList.toggle("is-shown", window.scrollY > 420);
    window.addEventListener("scroll", updateBackToTop, { passive: true });
    updateBackToTop();
  }

  document.querySelectorAll(".navbar-collapse .nav-link").forEach(link => {
    link.addEventListener("click", () => {
      const menu = link.closest(".navbar-collapse");
      if (menu?.classList.contains("show") && window.bootstrap) {
        bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });
})();
