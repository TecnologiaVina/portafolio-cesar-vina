(function () {
  "use strict";

  var root = document.documentElement;

  // ===== Tema claro/oscuro =====
  var THEME_KEY = "cv-theme";
  var stored = null;
  try { stored = localStorage.getItem(THEME_KEY); } catch (e) {}
  var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  var initial = stored || (prefersDark ? "dark" : "light");
  root.setAttribute("data-theme", initial);

  var toggle = document.getElementById("theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem(THEME_KEY, next); } catch (e) {}
    });
  }

  // ===== Menú móvil =====
  var navToggle = document.querySelector(".nav-toggle");
  var navMenu = document.getElementById("nav-menu");
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      var open = navMenu.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    });
    navMenu.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        navMenu.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // ===== Año dinámico =====
  var year = document.getElementById("year");
  if (year) { year.textContent = new Date().getFullYear(); }

  // ===== Animación de aparición al hacer scroll =====
  var revealTargets = document.querySelectorAll(
    ".hero-text, .hero-card, .section-head, .section-sub, .card, .project-card, .service-card, .timeline-item, .stats li, .contact-list li, .contact-form, .prose"
  );
  if ("IntersectionObserver" in window) {
    revealTargets.forEach(function (el) {
      el.style.opacity = "0";
      el.style.transform = "translateY(14px)";
      el.style.transition = "opacity .55s ease, transform .55s ease";
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
    revealTargets.forEach(function (el) { io.observe(el); });
  }

  // ===== Formulario de contacto =====
  var EMAIL = "cesarluisvina@gmail.com";
  var form = document.getElementById("contact-form");
  if (form) {
    var statusEl = document.getElementById("form-status");
    var button = document.getElementById("form-button");

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Honeypot anti-spam
      var honey = form.querySelector('[name="_honey"]');
      if (honey && honey.value) { return; }

      if (typeof form.reportValidity === "function" && !form.reportValidity()) { return; }

      var f = form.elements;
      var payload = {
        nombre: f.nombre.value.trim(),
        email: f.email.value.trim(),
        asunto: f.asunto.value.trim() || "Contacto desde el portafolio",
        mensaje: f.mensaje.value.trim(),
        _subject: "Nuevo mensaje desde el portafolio web",
        _template: "table"
      };

      var original = button.textContent;
      button.disabled = true;
      button.textContent = "Enviando...";
      statusEl.textContent = "";
      statusEl.className = "form-status";

      fetch("https://formsubmit.co/ajax/" + EMAIL, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(payload)
      })
        .then(function (res) {
          if (!res.ok) { throw new Error("HTTP " + res.status); }
          return res.json();
        })
        .then(function () {
          form.reset();
          statusEl.textContent = "¡Gracias! Tu mensaje fue enviado. Te responderé lo antes posible.";
          statusEl.className = "form-status ok";
        })
        .catch(function () {
          statusEl.innerHTML =
            'No se pudo enviar en este momento. Escríbeme directamente a ' +
            '<a href="mailto:' + EMAIL + '">' + EMAIL + "</a>.";
          statusEl.className = "form-status err";
        })
        .then(function () {
          button.disabled = false;
          button.textContent = original;
        });
    });
  }
})();
