// Agentic Obes — small interactions, no framework.

document.getElementById("year").textContent = new Date().getFullYear();

// Live call timer on the hero call card — purely illustrative.
(function () {
  var el = document.getElementById("callTimer");
  if (!el) return;
  var s = 0;
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  setInterval(function () {
    s = (s + 1) % 600;
    el.textContent = pad(Math.floor(s / 60)) + ":" + pad(s % 60);
  }, 1000);
})();

// Reveal sections gently as they enter the viewport.
(function () {
  var targets = document.querySelectorAll(
    ".section-head, .problem-grid, .steps, .handles, .sample-grid > div, .audit-grid > div, .faq-list, .call-card"
  );
  if (!("IntersectionObserver" in window)) return;
  targets.forEach(function (t) { t.classList.add("reveal"); });
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  targets.forEach(function (t) { io.observe(t); });
})();

// Audit form — front-end acknowledgement.
// NOTE: wire `action` to the real inbox/CRM endpoint before launch.
(function () {
  var form = document.getElementById("auditForm");
  if (!form) return;
  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    form.innerHTML =
      '<div class="form-success">' +
      "<h3>Request received.</h3>" +
      "<p>Thanks — a real person will reply within one business day " +
      "to arrange your test calls.</p>" +
      "</div>";
  });
})();
