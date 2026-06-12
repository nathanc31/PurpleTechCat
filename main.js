// =========================================================
// UTILITY HELPERS
// =========================================================
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// =========================================================
// THEME SYSTEM (persistent)
// =========================================================
(() => {
  const themeToggle = $("#theme-toggle");
  const saved = localStorage.getItem("theme");
  const isLight = saved === "light";

  document.body.classList.add(isLight ? "theme-light" : "theme-dark");
  if (themeToggle) themeToggle.textContent = isLight ? "☀️" : "🌙";

  themeToggle?.addEventListener("click", () => {
    const light = document.body.classList.toggle("theme-light");
    document.body.classList.toggle("theme-dark", !light);
    themeToggle.textContent = light ? "☀️" : "🌙";
    localStorage.setItem("theme", light ? "light" : "dark");
  });
})();

// =========================================================
// LIVE STATUS SYSTEM
// =========================================================
(() => {
  const statusText = $("#statusText");
  if (!statusText) return;

  const schedule = {
    1: [],
    2: [[18, 0, 22, 0]],
    3: [[18, 0, 22, 0]],
    4: [[20, 30, 22, 0]],
    5: [],
    6: [[7, 0, 10, 0]],
    0: [[7, 0, 10, 0]]
  };

  function updateStatus() {
    const now = new Date();
    const day = now.getDay();
    const mins = now.getHours() * 60 + now.getMinutes();
    const slots = schedule[day] || [];

    const open = slots.some(([sh, sm, eh, em]) => {
      const start = sh * 60 + sm;
      const end = eh * 60 + em;
      return mins >= start && mins < end;
    });

    if (open) {
      statusText.textContent = "Online – I am available now.";
      statusText.classList.add("status-open");
      statusText.classList.remove("status-closed");
    } else {
      statusText.textContent =
        "Offline – I will reply during my support hours (Tue–Thu 6pm–10pm, Sat–Sun 7am–10am).";
      statusText.classList.add("status-closed");
      statusText.classList.remove("status-open");
    }
  }

  updateStatus();
  setInterval(updateStatus, 60000);
})();

// =========================================================
// ACCESSIBILITY TOOLS
// =========================================================
(() => {
  const html = document.documentElement;
  const body = document.body;

  const btnFontInc = $("#a11y-font-inc");
  const btnFontDec = $("#a11y-font-dec");
  const btnContrast = $("#a11y-contrast-toggle");
  const btnDyslexic = $("#a11y-dyslexic-toggle");
  const btnReset = $("#a11y-reset");

  // Restore saved settings
  const savedFont = localStorage.getItem("a11y-font");
  const savedContrast = localStorage.getItem("a11y-contrast") === "true";
  const savedDys = localStorage.getItem("a11y-dyslexic") === "true";

  if (savedFont) html.classList.add(savedFont);
  if (savedContrast) body.classList.add("high-contrast");
  if (savedDys) body.classList.add("dyslexic-font");

  const setFont = (level) => {
    html.classList.remove("font-small", "font-large", "font-xlarge");
    if (level) html.classList.add(level);
    localStorage.setItem("a11y-font", level || "");
  };

  btnFontInc?.addEventListener("click", () => {
    if (html.classList.contains("font-large")) setFont("font-xlarge");
    else setFont("font-large");
  });

  btnFontDec?.addEventListener("click", () => {
    if (html.classList.contains("font-xlarge")) setFont("font-large");
    else setFont("font-small");
  });

  btnContrast?.addEventListener("click", () => {
    const enabled = body.classList.toggle("high-contrast");
    localStorage.setItem("a11y-contrast", enabled);
  });

  btnDyslexic?.addEventListener("click", () => {
    const enabled = body.classList.toggle("dyslexic-font");
    localStorage.setItem("a11y-dyslexic", enabled);
  });

  btnReset?.addEventListener("click", () => {
    setFont("");
    body.classList.remove("high-contrast", "dyslexic-font");
    localStorage.removeItem("a11y-contrast");
    localStorage.removeItem("a11y-dyslexic");
  });
})();

// =========================================================
// AUTO-HIGHLIGHT ACTIVE NAV LINK
// =========================================================
(() => {
  const current = window.location.pathname.split("/").pop();
  $$("nav a").forEach((link) => {
    if (link.getAttribute("href") === current) {
      link.classList.add("active");
    }
  });
})();

// =========================================================
// FAQ MODAL
// =========================================================
(() => {
  const modal = $("#faqModal");
  const openBtn = $("#faqBtn");
  const closeBtn = $("#faqClose");

  if (!modal) return;

  const open = () => {
    modal.classList.add("visible");
    modal.setAttribute("aria-hidden", "false");
  };

  const close = () => {
    modal.classList.remove("visible");
    modal.setAttribute("aria-hidden", "true");
  };

  openBtn?.addEventListener("click", open);
  closeBtn?.addEventListener("click", close);

  window.addEventListener("click", (e) => {
    if (e.target === modal) close();
  });
})();
