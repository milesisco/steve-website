const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("#site-nav");
const letterModal = document.querySelector("#letter-modal");
const letterModalImage = document.querySelector("#letter-modal-image");
const letterModalTitle = document.querySelector("#letter-modal-title");
const letterClose = document.querySelector(".letter-close");
let lastFocusedElement = null;

function closeLetterModal() {
  if (!(letterModal instanceof HTMLElement)) {
    return;
  }

  letterModal.classList.remove("is-open");
  letterModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");

  if (lastFocusedElement instanceof HTMLElement) {
    lastFocusedElement.focus();
  }
}

toggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", String(isOpen));
});

nav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    nav.classList.remove("is-open");
    toggle?.setAttribute("aria-expanded", "false");
  }
});

document.querySelectorAll(".letter-button").forEach((button) => {
  button.addEventListener("click", () => {
    if (!(button instanceof HTMLButtonElement) || !(letterModal instanceof HTMLElement)) {
      return;
    }

    const image = button.querySelector("img");
    const src = button.dataset.letterSrc;
    const title = button.dataset.letterTitle || "Recommendation letter";

    if (!src || !(letterModalImage instanceof HTMLImageElement) || !letterModalTitle) {
      return;
    }

    letterModalImage.src = src;
    letterModalImage.alt = image?.alt || title;
    letterModalTitle.textContent = title;
    lastFocusedElement = button;
    letterModal.classList.add("is-open");
    letterModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    letterClose?.focus();
  });
});

letterClose?.addEventListener("click", () => {
  closeLetterModal();
});

letterModal?.addEventListener("click", (event) => {
  if (event.target === letterModal) {
    closeLetterModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    letterModal instanceof HTMLElement &&
    letterModal.classList.contains("is-open")
  ) {
    closeLetterModal();
  }
});
