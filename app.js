/* app.js — progress bar, phase dropdown, reveals, copy buttons, meter strip */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function revealAll() {
    var items = document.querySelectorAll(".reveal, .hero__word");
    items.forEach(function (el) { el.classList.add("is-in"); });
  }

  try {

  /* ---- lenis smooth scroll ---- */
  (function lenis() {
    if (reduceMotion || typeof window.Lenis === "undefined") return;
    new window.Lenis({
      autoRaf: true,
      anchors: true,
      autoToggle: true
    });
  })();

  /* ---- meter strip: procedurally varied bars (sine envelope) ---- */
  (function meter() {
    var bars = document.getElementById("meterBars");
    if (!bars) return;
    var frag = document.createDocumentFragment();
    for (var i = 0; i < 64; i++) {
      var span = document.createElement("span");
      var env = 0.35 + 0.65 * Math.abs(Math.sin(i / 6.2));
      var noise = 0.8 + Math.random() * 0.4;
      var h = Math.round((14 + env * 14) * noise);
      span.style.height = h + "px";
      span.style.opacity = String(0.25 + env * 0.65);
      frag.appendChild(span);
    }
    bars.appendChild(frag);

    /* one connected instrument moment: rise in after the hero entrance */
    if (reduceMotion) return;
    var spans = Array.prototype.slice.call(bars.children);
    spans.forEach(function (s, i) {
      s.style.transform = "scaleY(0)";
      s.style.transition =
        "transform 700ms cubic-bezier(0.25, 1, 0.5, 1) " + (700 + i * 12) + "ms";
    });
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        spans.forEach(function (s) { s.style.transform = "scaleY(1)"; });
      });
    });
  })();

  /* ---- apparatus parallax (slow drift on scroll) ---- */
  (function parallax() {
    var el = document.querySelector(".apparatus");
    if (!el || reduceMotion || !("IntersectionObserver" in window)) return;
    var rAF = null;
    function update() {
      var r = el.getBoundingClientRect();
      var mid = r.top + r.height / 2;
      var vMid = window.innerHeight / 2;
      var delta = (mid - vMid) * -0.12;
      el.style.transform = "rotate(-6deg) translateY(" + delta.toFixed(1) + "px)";
    }
    window.addEventListener("scroll", function () {
      if (rAF) return;
      rAF = requestAnimationFrame(function () { rAF = null; update(); });
    }, { passive: true });
    window.addEventListener("resize", function () {
      if (rAF) return;
      rAF = requestAnimationFrame(function () { rAF = null; update(); });
    }, { passive: true });
    update();
  })();

  /* ---- scroll progress bar ---- */
  (function progress() {
    var bar = document.getElementById("progressBar");
    if (!bar) return;
    var complete = false;
    function update() {
      var doc = document.documentElement;
      var max = doc.scrollHeight - window.innerHeight;
      var pct = max > 0 ? window.scrollY / max : 0;
      bar.style.transform = "scaleX(" + pct + ")";
      if (pct >= 0.999 && !complete) {
        complete = true;
        if (!reduceMotion) bar.classList.add("is-complete");
      }
    }
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  })();

  /* ---- apparatus charge: the foundry fires up as you scroll ---- */
  (function charge() {
    var hero = document.querySelector(".hero");
    if (!hero) return;
    if (reduceMotion) { hero.style.setProperty("--charge", "1"); return; }
    var rAF = null;
    function update() {
      var doc = document.documentElement;
      var max = doc.scrollHeight - window.innerHeight;
      var v = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      hero.style.setProperty("--charge", String(0.2 + 0.8 * v));
    }
    window.addEventListener("scroll", function () {
      if (rAF) return;
      rAF = requestAnimationFrame(function () { rAF = null; update(); });
    }, { passive: true });
    window.addEventListener("resize", function () {
      if (rAF) return;
      rAF = requestAnimationFrame(function () { rAF = null; update(); });
    }, { passive: true });
    update();
  })();

  /* ---- reveal on scroll ---- */
  (function reveal() {
    var items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || reduceMotion) {
      items.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    items.forEach(function (el) { io.observe(el); });
  })();

  /* ---- phase dropdown: top-right menu + active-phase highlight ---- */
  (function phasesMenu() {
    var trigger = document.querySelector(".phase-menu__trigger");
    var panel = document.querySelector(".phase-menu__panel");
    if (!trigger || !panel) return;

    function setOpen(open, refocus) {
      panel.classList.toggle("is-open", open);
      trigger.setAttribute("aria-expanded", open ? "true" : "false");
      if (!open && refocus) trigger.focus();
    }

    trigger.addEventListener("click", function () {
      setOpen(!panel.classList.contains("is-open"));
    });

    panel.addEventListener("click", function (e) {
      if (e.target.closest(".phase-menu__item")) setOpen(false);
    });

    document.addEventListener("click", function (e) {
      if (!e.target.closest(".phase-menu")) setOpen(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && panel.classList.contains("is-open")) {
        e.stopPropagation();
        setOpen(false, true);
      }
    });

    var nodes = Array.prototype.slice.call(panel.querySelectorAll(".phase-menu__item"));
    if (!nodes.length) return;
    var phases = nodes.map(function (n) {
      return document.getElementById(n.getAttribute("href").slice(1));
    });

    function setActive(i) {
      nodes.forEach(function (n, idx) {
        n.classList.toggle("is-active", idx === i);
      });
    }

    if (!("IntersectionObserver" in window)) {
      nodes.forEach(function (n) {
        n.addEventListener("click", function () {
          nodes.forEach(function (x) { x.classList.remove("is-active"); });
          n.classList.add("is-active");
        });
      });
      return;
    }

    var visible = new Map();
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          visible.set(entry.target, entry.isIntersecting);
        });
        // active phase = the first phase section currently in view from the top
        var current = -1;
        for (var i = 0; i < phases.length; i++) {
          if (visible.get(phases[i])) { current = i; break; }
        }
        if (current === -1) {
          // fallback: nearest phase above viewport top
          var best = -1;
          for (var j = 0; j < phases.length; j++) {
            if (phases[j].getBoundingClientRect().top < window.innerHeight * 0.6) best = j;
          }
          current = best;
        }
        setActive(current);
      },
      { threshold: [0, 0.15, 0.5] }
    );
    phases.forEach(function (p) { if (p) io.observe(p); });
  })();

  /* ---- liquid glass refraction on the dropdown panel + nav pill ---- */
  (function glass() {
    var els = document.querySelectorAll(".phase-menu__panel, .nav-pill");
    if (!els.length || typeof window.liquidGlass !== "function") return;
    els.forEach(function (el) {
      try {
        window.liquidGlass(el, { scale: -60, chroma: 4, blur: 5 });
      } catch (e) { /* CSS frosted-glass fallback stays in place */ }
    });
  })();

  /* ---- copy buttons ---- */
  (function copy() {
    var toast = document.getElementById("toast");
    var toastTimer = null;
    var buttons = Array.prototype.slice.call(document.querySelectorAll(".copy-btn"));

    function showToast() {
      if (!toast) return;
      toast.classList.add("is-show");
      clearTimeout(toastTimer);
      toastTimer = setTimeout(function () {
        toast.classList.remove("is-show");
      }, 1600);
    }

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var ref = btn.getAttribute("data-copy");
        var code = null;
        var el = document.querySelector('code[data-id="' + ref + '"]');
        if (el) code = el.textContent;
        var payload = code !== null ? code : ref;

        if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(payload).then(done, function () { fallback(payload); });
        } else {
          fallback(payload);
        }

        function done() {
          flash(btn);
          showToast();
        }
        function fallback(txt) {
          var ta = document.createElement("textarea");
          ta.value = txt;
          ta.style.position = "fixed";
          ta.style.opacity = "0";
          document.body.appendChild(ta);
          ta.select();
          try { document.execCommand("copy"); done(); } catch (e) { /* noop */ }
          document.body.removeChild(ta);
        }
      });
    });

    function flash(btn) {
      btn.classList.add("is-copied");
      btn.textContent = "copied ✓";
      btn.disabled = true;
      setTimeout(function () {
        btn.classList.remove("is-copied");
        btn.textContent = "copy";
        btn.disabled = false;
      }, 1600);
    }
  })();

  /* ---- stat count-up (first view only) ---- */
  (function countup() {
    var nums = Array.prototype.slice.call(document.querySelectorAll(".stat__num"));
    if (!nums.length) return;
    if (reduceMotion || !("IntersectionObserver" in window)) return;

    function animate(el) {
      var target = parseInt(el.textContent, 10);
      if (isNaN(target)) return;
      var start = null;
      var dur = 650;
      function step(ts) {
        if (start === null) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 4); /* ease-out-quart */
        el.textContent = String(Math.round(eased * target));
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animate(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    nums.forEach(function (n) { io.observe(n); });
  })();

  } catch (err) {
    /* harden: never leave content hidden if a module throws */
    revealAll();
  }
})();
