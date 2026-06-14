const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("#site-nav");
const copyButton = document.querySelector("[data-copy-consult]");
const consultText = document.querySelector("#consult-text");
const copyStatus = document.querySelector("[data-copy-status]");

function updateHeaderState() {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 12);
}

function setMenuOpen(isOpen) {
  if (!header || !menuToggle) return;
  header.classList.toggle("is-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
}

async function copyConsultText() {
  if (!consultText || !copyStatus) return;

  try {
    await navigator.clipboard.writeText(consultText.value);
    copyStatus.textContent = "已复制。发送前请补齐真实地块信息。";
  } catch (error) {
    consultText.focus();
    consultText.select();
    copyStatus.textContent = "已选中清单，可手动复制。";
  }
}

window.addEventListener("scroll", updateHeaderState, { passive: true });
updateHeaderState();

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  setMenuOpen(!isOpen);
});

nav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    setMenuOpen(false);
  }
});

copyButton?.addEventListener("click", copyConsultText);
