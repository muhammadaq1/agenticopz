// AgenticOpz — small interactions, no framework.
// Motion uses spring-style easing curves (the same feel as
// Framer Motion's spring presets) in dependency-free vanilla JS,
// so the page stays instant on GitHub Pages.

document.getElementById("year").textContent = new Date().getFullYear();

/* ---------- Sample-call player ----------
   States: idle -> connecting (dialing, ringing) -> live -> ended.
   Transcript lines reveal one by one with a spring ease,
   outcome chips pop in, then the call wraps up. */
(function () {
  var card = document.getElementById("demo");
  if (!card) return;

  var REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var stage = document.getElementById("callStage");
  var playBtn = document.getElementById("playBtn");
  var connecting = document.getElementById("stageConnecting");
  var live = document.getElementById("callLive");
  var statusText = document.getElementById("callStatusText");
  var timerEl = document.getElementById("callTimer");
  var lines = Array.prototype.slice.call(
    document.querySelectorAll("#transcript .line")
  );
  var outcome = document.getElementById("callOutcome");
  var endBtn = document.getElementById("endBtn");
  var replayBtn = document.getElementById("replayBtn");

  var state = "idle";
  var timeouts = [];
  var timerInt = null;
  var seconds = 0;

  // Timing (ms). Line delays approximate natural speech pacing.
  var DIAL_MS = REDUCED ? 150 : 950;
  var RING_MS = REDUCED ? 150 : 1050;
  var LINE_DELAYS = REDUCED
    ? [100, 250, 400, 550, 700]
    : [350, 2650, 5750, 8650, 11950];
  var OUTCOME_AFTER_LAST = REDUCED ? 200 : 1500;
  var END_AFTER_OUTCOME = REDUCED ? 300 : 2200;

  function later(fn, ms) {
    timeouts.push(setTimeout(fn, ms));
  }
  function clearAll() {
    timeouts.forEach(clearTimeout);
    timeouts = [];
    if (timerInt) { clearInterval(timerInt); timerInt = null; }
  }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function startTimer() {
    seconds = 0;
    timerEl.textContent = "00:00";
    timerInt = setInterval(function () {
      seconds++;
      timerEl.textContent = pad(Math.floor(seconds / 60)) + ":" + pad(seconds % 60);
    }, 1000);
  }
  function setStatus(text) { statusText.textContent = text; }

  function reset() {
    clearAll();
    lines.forEach(function (l) { l.classList.remove("in"); });
    outcome.classList.remove("in");
    endBtn.hidden = false;
    replayBtn.hidden = true;
    timerEl.textContent = "00:00";
  }

  function startCall() {
    if (state === "connecting" || state === "live") return;
    reset();
    state = "connecting";
    card.setAttribute("data-state", "connecting");
    live.hidden = true;
    stage.hidden = false;
    playBtn.setAttribute("aria-label", "Connecting");
    connecting.hidden = false;
    connecting.firstChild.textContent = "Dialing";
    setStatus("CONNECTING");

    later(function () { connecting.firstChild.textContent = "Ringing"; }, DIAL_MS);
    later(goLive, DIAL_MS + RING_MS);
  }

  function goLive() {
    state = "live";
    card.setAttribute("data-state", "live");
    setStatus("LIVE CALL");
    stage.hidden = true;
    connecting.hidden = true;
    live.hidden = false;
    startTimer();

    var last = 0;
    LINE_DELAYS.forEach(function (d, i) {
      last = d;
      later(function () { lines[i].classList.add("in"); }, d);
    });
    later(function () { outcome.classList.add("in"); }, last + OUTCOME_AFTER_LAST);
    later(function () { endCall(); }, last + OUTCOME_AFTER_LAST + END_AFTER_OUTCOME);
  }

  function endCall() {
    if (state === "ended") return;
    clearAll();
    state = "ended";
    card.setAttribute("data-state", "ended");
    setStatus("CALL ENDED");
    endBtn.hidden = true;
    replayBtn.hidden = false;
  }

  playBtn.addEventListener("click", startCall);
  endBtn.addEventListener("click", endCall);
  replayBtn.addEventListener("click", function () {
    state = "idle";
    startCall();
  });

  // Hero "Hear a sample call" button scrolls here and plays.
  var demoLink = document.querySelector("[data-play-demo]");
  if (demoLink) {
    demoLink.addEventListener("click", function () {
      later(startCall, 450);
    });
  }
})();

/* ---------- Reveal on scroll ---------- */
(function () {
  var targets = document.querySelectorAll(
    ".section-head, .problem-grid, .steps, .handles, .sample-grid > div, .audit-grid > div, .faq-list"
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

/* ---------- Audit form ----------
   Front-end acknowledgement only for now.
   NOTE: wire `action` to the real inbox/CRM endpoint before launch. */
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
