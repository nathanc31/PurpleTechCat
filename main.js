/* ============================
   THEME TOGGLE
============================ */
const themeToggle = document.getElementById("theme-toggle");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("theme-light");
    document.body.classList.toggle("theme-dark");
  });
}

/* ============================
   ACCESSIBILITY CONTROLS
============================ */
const btnInc = document.getElementById("a11y-font-inc");
const btnDec = document.getElementById("a11y-font-dec");
const btnContrast = document.getElementById("a11y-contrast-toggle");
const btnDys = document.getElementById("a11y-dyslexic-toggle");
const btnReset = document.getElementById("a11y-reset");

if (btnInc) {
  btnInc.addEventListener("click", () => {
    document.body.classList.remove("font-small");
    document.body.classList.add("font-large");
  });
}

if (btnDec) {
  btnDec.addEventListener("click", () => {
    document.body.classList.remove("font-large");
    document.body.classList.add("font-small");
  });
}

if (btnContrast) {
  btnContrast.addEventListener("click", () => {
    document.body.classList.toggle("high-contrast");
  });
}

if (btnDys) {
  btnDys.addEventListener("click", () => {
    document.body.classList.toggle("dyslexic-font");
  });
}

if (btnReset) {
  btnReset.addEventListener("click", () => {
    document.body.classList.remove(
      "font-small",
      "font-large",
      "font-xlarge",
      "high-contrast",
      "dyslexic-font"
    );
  });
}

/* ============================
   ONLINE STATUS (REAL HOURS)
============================ */
function updateStatus() {
  const now = new Date();
  const day = now.getDay(); // 0=Sun, 1=Mon, 2=Tue...
  const hour = now.getHours();
  let online = false;

  // Weekend: Sat (6) & Sun (0) → 7am–10am
  if ((day === 6 || day === 0) && hour >= 7 && hour < 10) {
    online = true;
  }

  // Tuesday & Wednesday → 6pm–10pm
  if ((day === 2 || day === 3) && hour >= 18 && hour < 22) {
    online = true;
  }

  // Thursday → 8pm–10pm
  if (day === 4 && hour >= 20 && hour < 22) {
    online = true;
  }

  const statusText = document.getElementById("statusText");

  if (statusText) {
    statusText.textContent = online
      ? "Online – I’m here to help!"
      : "Offline – I will reply during my support hours.";
  }
}

updateStatus();
setInterval(updateStatus, 60000);

/* ============================
   FAQ MODAL
============================ */
const openFAQ = document.getElementById("open-faq");
const closeFAQ = document.getElementById("close-faq");
const faqModal = document.getElementById("faq-modal");

if (openFAQ && faqModal) {
  openFAQ.addEventListener("click", () => {
    faqModal.classList.add("visible");
  });
}

if (closeFAQ && faqModal) {
  closeFAQ.addEventListener("click", () => {
    faqModal.classList.remove("visible");
  });
}
