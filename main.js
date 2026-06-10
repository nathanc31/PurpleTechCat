// ---------------------------------------------
// ACCESSIBILITY PANEL TOGGLE
// ---------------------------------------------
const accBtn = document.getElementById('accessibility-btn');
const accPanel = document.getElementById('accessibility-panel');

if (accBtn && accPanel) {
  accBtn.addEventListener('click', () => {
    accPanel.classList.toggle('hidden');
  });
}

// ---------------------------------------------
// ACCESSIBILITY MODES
// ---------------------------------------------
function toggleMode(mode) {
  const body = document.body;
  const modes = ['high-contrast', 'dyslexia-font', 'easy-read', 'reduce-motion'];

  if (modes.includes(mode)) {
    body.classList.toggle(mode);
  }
}

// ---------------------------------------------
// COOKIE POPUP
// ---------------------------------------------
const cookiePopup = document.getElementById('cookie-popup');
const cookieAccept = document.getElementById('cookie-accept');
const cookieReject = document.getElementById('cookie-reject');

if (cookiePopup && cookieAccept && cookieReject) {
  const consent = localStorage.getItem('ptc-cookie-consent');

  if (!consent) {
    cookiePopup.classList.remove('hidden');
  }

  cookieAccept.addEventListener('click', () => {
    localStorage.setItem('ptc-cookie-consent', 'accepted');
    cookiePopup.classList.add('hidden');
  });

  cookieReject.addEventListener('click', () => {
    localStorage.setItem('ptc-cookie-consent', 'rejected');
    cookiePopup.classList.add('hidden');
  });
}

// ---------------------------------------------
// THEME SYSTEM (persistent across pages)
// ---------------------------------------------
const body = document.body;
const themeToggle = document.getElementById("theme-toggle");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
  body.classList.add("theme-light");
  themeToggle.textContent = "☀️";
} else {
  body.classList.add("theme-dark");
  themeToggle.textContent = "🌙";
}

themeToggle.addEventListener("click", () => {
  const isLight = body.classList.contains("theme-light");

  if (isLight) {
    body.classList.remove("theme-light");
    body.classList.add("theme-dark");
    themeToggle.textContent = "🌙";
    localStorage.setItem("theme", "dark");
  } else {
    body.classList.remove("theme-dark");
    body.classList.add("theme-light");
    themeToggle.textContent = "☀️";
    localStorage.setItem("theme", "light");
  }
});

// ---------------------------------------------
// LIVE STATUS SYSTEM
// ---------------------------------------------
function updateStatus() {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  const minute = now.getMinutes();

  const statusText = document.getElementById("statusText");

  const schedule = {
    1: [],
    2: [[18, 0, 22, 0]],
    3: [[18, 0, 22, 0]],
    4: [[20, 30, 22, 0]],
    5: [],
    6: [[7, 0, 10, 0]],
    0: [[7, 0, 10, 0]]
  };

  const todaySlots = schedule[day];
  let isOpen = false;

  for (const slot of todaySlots) {
    const [startH, startM, endH, endM] = slot;
    const start = startH * 60 + startM;
    const end = endH * 60 + endM;
    const nowMinutes = hour * 60 + minute;

    if (nowMinutes >= start && nowMinutes < end) {
      isOpen = true;
      break;
    }
  }

  if (isOpen) {
    statusText.textContent = "Online – I am available now.";
    statusText.classList.remove("status-closed");
    statusText.classList.add("status-open");
  } else {
    statusText.textContent = "Offline – I will reply during my support hours (Tue–Thu 6pm–10pm, Sat–Sun 7am–10am).";
    statusText.classList.remove("status-open");
    statusText.classList.add("status-closed");
  }
}

updateStatus();
setInterval(updateStatus, 60000);

// ---------------------------------------------
// ACCESSIBILITY TOOLS
// ---------------------------------------------
(function () {
  const html = document.documentElement;

  const btnFontInc = document.getElementById('a11y-font-inc');
  const btnFontDec = document.getElementById('a11y-font-dec');
  const btnContrast = document.getElementById('a11y-contrast-toggle');
  const btnDyslexic = document.getElementById('a11y-dyslexic-toggle');
  const btnReset = document.getElementById('a11y-reset');

  const savedFont = localStorage.getItem('a11y-font');
  const savedContrast = localStorage.getItem('a11y-contrast') === 'true';
  const savedDyslexic = localStorage.getItem('a11y-dyslexic') === 'true';

  if (savedFont) html.classList.add(savedFont);
  if (savedContrast) body.classList.add('high-contrast');
  if (savedDyslexic) body.classList.add('dyslexic-font');

  function setFontSize(level) {
    html.classList.remove('font-small', 'font-large', 'font-xlarge');
    if (level) html.classList.add(level);
    localStorage.setItem('a11y-font', level || '');
  }

  btnFontInc?.addEventListener('click', () => {
    if (html.classList.contains('font-large')) setFontSize('font-xlarge');
    else if (html.classList.contains('font-xlarge')) setFontSize('font-xlarge');
    else setFontSize('font-large');
  });

  btnFontDec?.addEventListener('click', () => {
    if (html.classList.contains('font-xlarge')) setFontSize('font-large');
    else if (html.classList.contains('font-large')) setFontSize('font-small');
    else setFontSize('font-small');
  });

  btnContrast?.addEventListener('click', () => {
    const enabled = body.classList.toggle('high-contrast');
    localStorage.setItem('a11y-contrast', enabled);
  });

  btnDyslexic?.addEventListener('click', () => {
    const enabled = body.classList.toggle('dyslexic-font');
    localStorage.setItem('a11y-dyslexic', enabled);
  });

  btnReset?.addEventListener('click', () => {
    setFontSize('');
    body.classList.remove('high-contrast', 'dyslexic-font');
    localStorage.removeItem('a11y-contrast');
    localStorage.removeItem('a11y-dyslexic');
  });
})();

// ---------------------------------------------
// AUTO‑HIGHLIGHT ACTIVE NAV LINK
// ---------------------------------------------
const currentPage = window.location.pathname.split("/").pop();

document.querySelectorAll("nav a").forEach(link => {
  const linkPage = link.getAttribute("href");
  if (linkPage === currentPage) link.classList.add("active");
});

// ---------------------------------------------
// FAQ MODAL
// ---------------------------------------------
const faqBtn = document.getElementById("faqBtn");
const faqModal = document.getElementById("faqModal");
const faqClose = document.getElementById("faqClose");

faqBtn?.addEventListener("click", () => {
  faqModal.style.display = "block";
  faqModal.setAttribute("aria-hidden", "false");
});

faqClose?.addEventListener("click", () => {
  faqModal.style.display = "none";
  faqModal.setAttribute("aria-hidden", "true");
});

window.addEventListener("click", (e) => {
  if (e.target === faqModal) {
    faqModal.style.display = "none";
    faqModal.setAttribute("aria-hidden", "true");
  }
});