/* app.js — progress bar, phase dropdown, reveals, copy buttons, meter strip, ticker, spotlight, magnetic, tilt, split-text, scroll-top, resources search + preview */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var lenisInstance = null;

  function revealAll() {
    var items = document.querySelectorAll(".reveal, .hero__word");
    items.forEach(function (el) { el.classList.add("is-in"); });
  }

  try {

  /* ---- lenis smooth scroll ---- */
  (function lenis() {
    if (reduceMotion || typeof window.Lenis === "undefined") return;
    lenisInstance = new window.Lenis({
      autoRaf: true,
      anchors: true,
      autoToggle: true,
      syncTouch: true,
      lerp: 0.09,
      wheelMultiplier: 0.85,
      touchMultiplier: 0.85,
      allowNestedScroll: true,
      stopInertiaOnNavigate: true
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
    var steps = Array.prototype.slice.call(document.querySelectorAll(".step-progress__step"));
    if (!nodes.length) return;
    var phases = nodes.map(function (n) {
      return document.getElementById(n.getAttribute("href").slice(1));
    });

    function setActive(i) {
      nodes.forEach(function (n, idx) {
        n.classList.toggle("is-active", idx === i);
      });
      steps.forEach(function (s, idx) {
        s.classList.toggle("is-active", idx === i);
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
    // ponytail: skip SVG glass on touch-primary devices — CSS frosted stays
    if (window.matchMedia("(pointer: coarse)").matches) return;
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

  /* ---- stat ticker: digits roll 0→target when the stats scroll in ---- */
  (function ticker() {
    var nums = Array.prototype.slice.call(document.querySelectorAll(".stat__num"));
    if (!nums.length) return;
    if (reduceMotion || !("IntersectionObserver" in window)) return;

    function build(el) {
      var target = el.getAttribute("data-num") || el.textContent.trim();
      if (!/^\d+$/.test(target)) return null;
      el.textContent = "";
      var ticks = target.split("").map(function (d) {
        var tick = document.createElement("span");
        tick.className = "tick";
        tick.setAttribute("data-t", d);
        var col = document.createElement("span");
        col.className = "tick__col";
        for (var i = 0; i <= 9; i++) {
          var b = document.createElement("b");
          b.textContent = String(i);
          col.appendChild(b);
        }
        tick.appendChild(col);
        el.appendChild(tick);
        return tick;
      });
      return ticks;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        io.unobserve(el);
        var ticks = build(el);
        if (!ticks) return;
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            ticks.forEach(function (t) {
              t.style.setProperty("--t", t.getAttribute("data-t"));
              t.classList.add("is-run");
            });
          });
        });
      });
    }, { threshold: 0.6 });
    nums.forEach(function (n) { io.observe(n); });
  })();

  /* ---- spotlight: amber glow follows the cursor on the tooling cards ---- */
  (function spotlight() {
    var cols = document.querySelectorAll(".tooling > div");
    if (!cols.length) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    cols.forEach(function (col) {
      col.addEventListener("pointermove", function (e) {
        var r = col.getBoundingClientRect();
        col.style.setProperty("--spot-x", (e.clientX - r.left).toFixed(0) + "px");
        col.style.setProperty("--spot-y", (e.clientY - r.top).toFixed(0) + "px");
      });
    });
  })();

  /* ---- magnetic buttons: lean toward the cursor ---- */
  (function magnetic() {
    var btns = document.querySelectorAll(".btn-fill, .btn-ghost, .cta-fill");
    if (!btns.length) return;
    if (reduceMotion || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    btns.forEach(function (btn) {
      btn.addEventListener("pointermove", function (e) {
        var r = btn.getBoundingClientRect();
        var dx = e.clientX - (r.left + r.width / 2);
        var dy = e.clientY - (r.top + r.height / 2);
        btn.style.setProperty("--mx", (dx * 0.25).toFixed(1) + "px");
        btn.style.setProperty("--my", (dy * 0.25).toFixed(1) + "px");
      });
      btn.addEventListener("pointerleave", function () {
        btn.style.removeProperty("--mx");
        btn.style.removeProperty("--my");
      });
    });
  })();

  /* ---- tilt cards: subtle 3d lean on the tooling columns ---- */
  (function tilt() {
    var cards = document.querySelectorAll(".tooling > div");
    if (!cards.length) return;
    if (reduceMotion || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    cards.forEach(function (card) {
      card.addEventListener("pointermove", function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        card.style.setProperty("--rx", (-py * 4).toFixed(2) + "deg");
        card.style.setProperty("--ry", (px * 4).toFixed(2) + "deg");
      });
      card.addEventListener("pointerleave", function () {
        card.style.removeProperty("--rx");
        card.style.removeProperty("--ry");
      });
    });
  })();

  /* ---- split-text reveal on section + phase titles ---- */
  (function splitText() {
    var heads = document.querySelectorAll(".section__title, .phase__title");
    if (!heads.length) return;
    if (reduceMotion || !("IntersectionObserver" in window)) return;
    heads.forEach(function (h) {
      var words = h.textContent.trim().split(/\s+/);
      if (words.length < 2) return;
      h.textContent = "";
      words.forEach(function (w, i) {
        var mask = document.createElement("span");
        mask.className = "split";
        mask.style.setProperty("--d", (i * 45) + "ms");
        var span = document.createElement("span");
        span.className = "split__word";
        span.textContent = w;
        mask.appendChild(span);
        h.appendChild(mask);
        if (i < words.length - 1) h.appendChild(document.createTextNode(" "));
      });
      h.classList.add("split-ready");
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-split-in");
        io.unobserve(entry.target);
      });
    }, { threshold: 0.4 });
    heads.forEach(function (h) { if (h.classList.contains("split-ready")) io.observe(h); });
  })();

  /* ---- scroll-to-top pill ---- */
  (function scrollTop() {
    var btn = document.getElementById("scrollTop");
    if (!btn) return;
    var ticking = false;
    function update() {
      ticking = false;
      btn.classList.toggle("is-show", window.scrollY > 600);
    }
    window.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }, { passive: true });
    btn.addEventListener("click", function () {
      if (lenisInstance) lenisInstance.scrollTo(0);
      else window.scrollTo({ top: 0, behavior: "smooth" });
    });
    update();
  })();

  /* ---- resources: filter the serial library ---- */
  (function resSearch() {
    var input = document.getElementById("resSearch");
    var ol = document.querySelector(".res-list__ol");
    if (!input || !ol) return;
    var rows = Array.prototype.slice.call(ol.querySelectorAll(".res-row"));
    var count = document.getElementById("resCount");
    var none = document.getElementById("resNone");
    function apply() {
      var q = input.value.trim().toLowerCase();
      var shown = 0;
      rows.forEach(function (row) {
        var hit = !q || row.textContent.toLowerCase().indexOf(q) !== -1;
        row.classList.toggle("is-filtered", !hit);
        if (hit) {
          row.classList.add("is-in");
          shown++;
        }
      });
      if (count) count.textContent = shown + " of " + rows.length;
      if (none) none.hidden = shown !== 0;
    }
    input.addEventListener("input", apply);
    input.addEventListener("search", apply);
  })();

  /* ---- resources: floating hover-preview card (fine pointers only) ---- */
  (function resPreview() {
    var wrap = document.getElementById("resPreview");
    if (!wrap) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    var rows = Array.prototype.slice.call(document.querySelectorAll(".res-row--link"));
    if (!rows.length) return;
    var rAF = null;

    function move(x, y) {
      var pad = 14;
      var left = Math.min(x + 18, window.innerWidth - wrap.offsetWidth - pad);
      wrap.style.left = left + "px";
      wrap.style.top = Math.max(y - wrap.offsetHeight / 2, pad) + "px";
    }
    function show(row) {
      wrap.innerHTML = "";
      var icon = row.querySelector(".res-row__icon");
      if (icon) {
        var ic = icon.cloneNode(true);
        ic.className = "res-row__icon res-preview__icon";
        wrap.appendChild(ic);
      }
      var title = row.querySelector(".res-row__title");
      var sub = row.querySelector(".res-row__sub");
      var src = row.querySelector("a").getAttribute("href");
      var t = document.createElement("p");
      t.className = "res-preview__title";
      t.textContent = title ? title.textContent : "";
      var s = document.createElement("p");
      s.className = "res-preview__sub";
      s.textContent = sub ? sub.textContent : "";
      var u = document.createElement("p");
      u.className = "res-preview__src";
      u.textContent = src;
      wrap.appendChild(t);
      wrap.appendChild(s);
      wrap.appendChild(u);
      wrap.classList.add("is-show");
    }

    rows.forEach(function (row) {
      var a = row.querySelector(".res-row__anchor");
      if (!a) return;
      a.addEventListener("pointerenter", function (e) { show(row); move(e.clientX, e.clientY); });
      a.addEventListener("pointermove", function (e) {
        if (rAF) return;
        rAF = requestAnimationFrame(function () { rAF = null; move(e.clientX, e.clientY); });
      });
      a.addEventListener("pointerleave", function () { wrap.classList.remove("is-show"); });
    });
  })();

  /* ---- radar chart for the proof scorecard ---- */
  (function radar() {
    var svg = document.getElementById("radarChart");
    if (!svg) return;
    // ponytail: mirrors the proof-scorecard table above
    var data = [
      ["spec", 8.5], ["phases", 9], ["context", 8.5], ["verif", 7.5],
      ["team", 7.5], ["loop", 7.5], ["comp", 9], ["frontend", 9.5], ["docs", 8.5]
    ];
    var NS = "http://www.w3.org/2000/svg";
    var cx = 160, cy = 160, R = 104;
    var n = data.length;
    var angle = function (i) { return ((i / n) * 360 - 90) * Math.PI / 180; };
    var pt = function (i, f) {
      return [cx + Math.cos(angle(i)) * R * f, cy + Math.sin(angle(i)) * R * f];
    };
    function poly(pts, cls) {
      var p = document.createElementNS(NS, "polygon");
      p.setAttribute("points", pts.map(function (q) { return q[0].toFixed(1) + "," + q[1].toFixed(1); }).join(" "));
      p.setAttribute("class", cls);
      svg.appendChild(p);
    }
    function line(x1, y1, x2, y2, cls) {
      var l = document.createElementNS(NS, "line");
      l.setAttribute("x1", x1); l.setAttribute("y1", y1);
      l.setAttribute("x2", x2); l.setAttribute("y2", y2);
      l.setAttribute("class", cls);
      svg.appendChild(l);
    }
    [0.25, 0.5, 0.75, 1].forEach(function (f) {
      poly(data.map(function (_, i) { return pt(i, f); }), "chart-ring");
    });
    for (var i = 0; i < n; i++) {
      var p = pt(i, 1);
      line(cx, cy, p[0], p[1], "chart-axis");
    }
    poly(data.map(function (d, i) { return pt(i, d[1] / 10); }), "chart-fill");
    data.forEach(function (d, i) {
      var p = pt(i, d[1] / 10);
      var dot = document.createElementNS(NS, "circle");
      dot.setAttribute("cx", p[0].toFixed(1)); dot.setAttribute("cy", p[1].toFixed(1));
      dot.setAttribute("r", "2.4"); dot.setAttribute("class", "chart-point");
      svg.appendChild(dot);
    });
    data.forEach(function (d, i) {
      var a = angle(i);
      var p = pt(i, 1.28);
      var t = document.createElementNS(NS, "text");
      t.setAttribute("x", p[0].toFixed(1)); t.setAttribute("y", (p[1] + 3).toFixed(1));
      var cos = Math.cos(a);
      t.setAttribute("text-anchor", Math.abs(cos) < 0.25 ? "middle" : (cos > 0 ? "start" : "end"));
      t.textContent = d[0];
      svg.appendChild(t);
    });
  })();

  /* ---- logo cloud: derived from the benchmark table so it can't drift ---- */
  (function logoCloud() {
    var cloud = document.getElementById("logoCloud");
    var table = document.querySelector(".proof-bench");
    if (!cloud || !table) return;
    var links = table.querySelectorAll("tbody a");
    links.forEach(function (a) {
      var item = document.createElement("a");
      item.href = a.href;
      item.target = "_blank";
      item.rel = "noopener";
      item.className = "logo-cloud__item";
      item.textContent = a.textContent;
      cloud.appendChild(item);
    });
  })();

  } catch (err) {
    /* harden: never leave content hidden if a module throws */
    revealAll();
  }
})();
