/* ============================================================
   Lajpat Public School — site interactions
   ============================================================ */
(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- Theme ---------- */
  (function theme() {
    var saved = null;
    try { saved = localStorage.getItem("lps-theme"); } catch (e) {}
    if (saved) document.documentElement.setAttribute("data-theme", saved);
    else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.setAttribute("data-theme", "dark");
    }
    document.addEventListener("click", function (e) {
      var btn = e.target.closest && e.target.closest(".theme-toggle");
      if (!btn) return;
      var next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try { localStorage.setItem("lps-theme", next); } catch (err) {}
    });
  })();

  document.addEventListener("DOMContentLoaded", function () {

    /* ---------- Preloader ---------- */
    var pre = $(".preloader");
    if (pre) {
      var done = function () { setTimeout(function () { pre.classList.add("is-done"); }, 480); };
      if (document.readyState === "complete") done();
      else window.addEventListener("load", done);
      setTimeout(function () { pre.classList.add("is-done"); }, 4200);
    }

    /* ---------- Header state + scroll progress ---------- */
    var header = $(".header");
    var progress = $(".progress");
    var fabTop = $(".fab--top");
    var ticking = false;

    function onScroll() {
      var y = window.scrollY || window.pageYOffset;
      if (header) header.classList.toggle("is-stuck", y > 40);
      if (fabTop) fabTop.classList.toggle("show", y > 700);
      if (progress) {
        var h = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.transform = "scaleX(" + (h > 0 ? y / h : 0) + ")";
      }
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(onScroll); }
    }, { passive: true });
    onScroll();

    /* ---------- Mobile drawer ---------- */
    var burger = $(".burger"), drawer = $(".drawer");
    if (burger && drawer) {
      var links = $$(".drawer__nav a", drawer);
      links.forEach(function (a, i) { a.style.transitionDelay = (0.1 + i * 0.07) + "s"; });
      var setDrawer = function (open) {
        drawer.classList.toggle("is-open", open);
        burger.classList.toggle("is-open", open);
        burger.setAttribute("aria-expanded", open ? "true" : "false");
        document.body.style.overflow = open ? "hidden" : "";
      };
      burger.addEventListener("click", function () { setDrawer(!drawer.classList.contains("is-open")); });
      links.forEach(function (a) { a.addEventListener("click", function () { setDrawer(false); }); });
      $$(".drawer__cta a", drawer).forEach(function (a) { a.addEventListener("click", function () { setDrawer(false); }); });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && drawer.classList.contains("is-open")) setDrawer(false);
      });
    }

    /* ---------- Reveal on scroll ---------- */
    var revealables = $$(".reveal");
    if ("IntersectionObserver" in window && !reduced) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          var d = parseFloat(en.target.dataset.delay || 0);
          setTimeout(function () { en.target.classList.add("in"); }, d * 1000);
          io.unobserve(en.target);
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
      revealables.forEach(function (n) { io.observe(n); });
    } else {
      revealables.forEach(function (n) { n.classList.add("in"); });
    }

    /* auto stagger inside grids */
    $$("[data-stagger]").forEach(function (wrap) {
      $$(".reveal", wrap).forEach(function (n, i) {
        if (!n.dataset.delay) n.dataset.delay = (i * 0.09).toFixed(2);
      });
    });

    /* ---------- Counters ---------- */
    var counters = $$("[data-count]");
    if (counters.length) {
      var run = function (node) {
        var end = parseFloat(node.dataset.count);
        var dur = parseInt(node.dataset.dur || 1800, 10);
        var suffix = node.dataset.suffix || "";
        var t0 = null;
        var step = function (ts) {
          if (!t0) t0 = ts;
          var p = Math.min((ts - t0) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          var val = end * eased;
          node.textContent = (end % 1 ? val.toFixed(1) : Math.round(val).toLocaleString("en-IN")) + suffix;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      };
      if ("IntersectionObserver" in window && !reduced) {
        var cio = new IntersectionObserver(function (en) {
          en.forEach(function (e) { if (e.isIntersecting) { run(e.target); cio.unobserve(e.target); } });
        }, { threshold: 0.5 });
        counters.forEach(function (c) { cio.observe(c); });
      } else {
        counters.forEach(function (c) { c.textContent = c.dataset.count + (c.dataset.suffix || ""); });
      }
    }

    /* ---------- Typewriter ---------- */
    var typed = $("[data-typed]");
    if (typed) {
      var words = JSON.parse(typed.dataset.typed);
      var out = $(".typed-out", typed) || typed;
      var wi = 0, ci = 0, del = false;
      var tick = function () {
        var w = words[wi];
        ci += del ? -1 : 1;
        out.textContent = w.slice(0, ci);
        var wait = del ? 45 : 82;
        if (!del && ci === w.length) { wait = 1700; del = true; }
        else if (del && ci === 0) { del = false; wi = (wi + 1) % words.length; wait = 320; }
        setTimeout(tick, wait);
      };
      if (reduced) out.textContent = words[0]; else setTimeout(tick, 900);
    }

    /* ---------- Card spotlight ---------- */
    if (!reduced && window.matchMedia("(hover:hover)").matches) {
      $$(".card").forEach(function (card) {
        card.addEventListener("pointermove", function (e) {
          var r = card.getBoundingClientRect();
          card.style.setProperty("--mx", (e.clientX - r.left) + "px");
          card.style.setProperty("--my", (e.clientY - r.top) + "px");
        });
      });

      /* 3D tilt */
      $$("[data-tilt]").forEach(function (n) {
        var max = parseFloat(n.dataset.tilt || 8);
        n.style.transformStyle = "preserve-3d";
        n.addEventListener("pointermove", function (e) {
          var r = n.getBoundingClientRect();
          var px = (e.clientX - r.left) / r.width - 0.5;
          var py = (e.clientY - r.top) / r.height - 0.5;
          n.style.transform = "perspective(900px) rotateY(" + (px * max) + "deg) rotateX(" + (-py * max) + "deg) translateY(-6px)";
        });
        n.addEventListener("pointerleave", function () { n.style.transform = ""; });
      });
    }

    /* ---------- Hero particles ---------- */
    var canvas = $("#heroParticles");
    if (canvas && !reduced) {
      var ctx = canvas.getContext("2d");
      var dots = [], raf, w, h, dpr = Math.min(window.devicePixelRatio || 1, 2);
      var colors = ["rgba(255,217,74,", "rgba(255,255,255,", "rgba(124,77,255,", "rgba(240,48,48,"];
      function size() {
        var r = canvas.getBoundingClientRect();
        w = r.width; h = r.height;
        canvas.width = w * dpr; canvas.height = h * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        var n = Math.min(72, Math.round(w * h / 16000));
        dots = [];
        for (var i = 0; i < n; i++) {
          dots.push({
            x: Math.random() * w, y: Math.random() * h,
            r: Math.random() * 2.1 + 0.5,
            vx: (Math.random() - 0.5) * 0.28,
            vy: (Math.random() - 0.5) * 0.28,
            a: Math.random() * 0.5 + 0.18,
            c: colors[Math.floor(Math.random() * colors.length)]
          });
        }
      }
      function draw() {
        ctx.clearRect(0, 0, w, h);
        for (var i = 0; i < dots.length; i++) {
          var d = dots[i];
          d.x += d.vx; d.y += d.vy;
          if (d.x < -10) d.x = w + 10; if (d.x > w + 10) d.x = -10;
          if (d.y < -10) d.y = h + 10; if (d.y > h + 10) d.y = -10;
          ctx.beginPath();
          ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
          ctx.fillStyle = d.c + d.a + ")";
          ctx.fill();
          for (var j = i + 1; j < dots.length; j++) {
            var o = dots[j], dx = d.x - o.x, dy = d.y - o.y, dist = dx * dx + dy * dy;
            if (dist < 13000) {
              ctx.beginPath();
              ctx.moveTo(d.x, d.y); ctx.lineTo(o.x, o.y);
              ctx.strokeStyle = "rgba(255,255,255," + (0.09 * (1 - dist / 13000)) + ")";
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        }
        raf = requestAnimationFrame(draw);
      }
      size(); draw();
      window.addEventListener("resize", function () { cancelAnimationFrame(raf); size(); draw(); });
      document.addEventListener("visibilitychange", function () {
        if (document.hidden) cancelAnimationFrame(raf);
        else { cancelAnimationFrame(raf); draw(); }
      });
    }

    /* ---------- Hero parallax ---------- */
    var crest = $(".crest");
    if (crest && !reduced && window.matchMedia("(hover:hover)").matches) {
      var hero = $(".hero");
      hero.addEventListener("pointermove", function (e) {
        var px = (e.clientX / window.innerWidth - 0.5);
        var py = (e.clientY / window.innerHeight - 0.5);
        crest.style.transform = "translate3d(" + (px * 26) + "px," + (py * 22) + "px,0)";
      });
      hero.addEventListener("pointerleave", function () { crest.style.transform = ""; });
    }

    /* ---------- Marquee duplication ---------- */
    $$(".marquee__track, .notice-bar__scroll div").forEach(function (t) {
      t.innerHTML += t.innerHTML;
    });

    /* ---------- Active nav ---------- */
    var here = location.pathname.split("/").pop() || "index.html";
    $$(".nav__link, .drawer__nav a").forEach(function (a) {
      var href = a.getAttribute("href") || "";
      if (href === here || (here === "index.html" && href === "index.html")) {
        a.setAttribute("aria-current", "page");
      }
    });

    /* ---------- Section spy (home) ---------- */
    var sections = $$("section[id]");
    if (sections.length && "IntersectionObserver" in window) {
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          var id = "#" + e.target.id;
          $$('.nav__link[href^="#"]').forEach(function (a) {
            a.toggleAttribute("aria-current", a.getAttribute("href") === id);
            if (a.getAttribute("href") === id) a.setAttribute("aria-current", "page");
            else a.removeAttribute("aria-current");
          });
        });
      }, { threshold: 0.4, rootMargin: "-20% 0px -50% 0px" });
      sections.forEach(function (s) { spy.observe(s); });
    }

    /* ---------- FAQ accordion (single open) ---------- */
    var faqs = $$(".faq details");
    faqs.forEach(function (d) {
      d.addEventListener("toggle", function () {
        if (!d.open) return;
        faqs.forEach(function (o) { if (o !== d) o.open = false; });
      });
    });

    /* ---------- Forms ---------- */
    $$("form[data-form]").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var data = new FormData(form);
        var name = (data.get("name") || "there").toString().trim();
        var cls = (data.get("class") || "").toString();
        var phone = (data.get("phone") || "").toString();
        var msg = (data.get("message") || "").toString();
        var lines = [
          "Hello Lajpat Public School,",
          "",
          "Name: " + name,
          cls ? "Class of interest: " + cls : "",
          phone ? "Phone: " + phone : "",
          msg ? "Message: " + msg : ""
        ].filter(Boolean).join("\n");
        var url = "https://wa.me/919031388358?text=" + encodeURIComponent(lines);
        var note = form.querySelector(".form-status");
        if (note) {
          note.textContent = "Opening WhatsApp so you can send this enquiry to our office…";
          note.style.color = "var(--teal-500)";
        }
        window.open(url, "_blank", "noopener");
        form.reset();
      });
    });

    /* ---------- Smooth anchor with offset fallback ---------- */
    $$('a[href^="#"]').forEach(function (a) {
      a.addEventListener("click", function (e) {
        var id = a.getAttribute("href");
        if (id.length < 2) return;
        var t = document.querySelector(id);
        if (!t) return;
        e.preventDefault();
        var top = t.getBoundingClientRect().top + window.scrollY - (parseInt(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 84) - 14;
        window.scrollTo({ top: top, behavior: reduced ? "auto" : "smooth" });
      });
    });

    /* ---------- Back to top ---------- */
    var top = $(".fab--top");
    if (top) top.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
    });

    /* ---------- Year ---------- */
    $$("[data-year]").forEach(function (n) { n.textContent = new Date().getFullYear(); });
  });
})();
