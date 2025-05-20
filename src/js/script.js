"use strict";
// Toggle mobile menu
const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu");

hamburger.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
  hamburger.classList.toggle("active");
});

// Update existing JS to handle all form triggers
const formTriggers = document.querySelectorAll(".nav-cta, .open-form");
const formModal = document.querySelector(".form-modal");
const closeModalBtn = document.querySelector(".close-modal");

// Open modal
formTriggers.forEach((trigger) => {
  trigger.addEventListener("click", (e) => {
    e.preventDefault();
    formModal.classList.add("visible");
    document.body.style.overflow = "hidden";
  });
});

// Close modal
function closeModal() {
  formModal.classList.remove("visible");
  document.body.style.overflow = "auto";
  document.documentElement.style.paddingRight = "0";
}

// Update close button event listener
closeModalBtn.addEventListener("click", (event) => {
  event.preventDefault();
  closeModal();
});

// Add click outside handler
formModal.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal-overlay")) {
    closeModal();
  }
});

// Rest of the close handlers remain the same...

// Form Submission Handling
const form = document.querySelector(".application-form");
const successModal = document.querySelector(".success-modal");
let timeoutId;

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData(form);

    // Submit to Netlify
    await fetch("/", {
      method: "POST",
      body: new URLSearchParams(formData).toString(),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    // Close form modal
    closeModal();

    // Show success modal
    successModal.classList.add("visible");
    document.body.style.overflow = "hidden";

    // Set timeout to close
    timeoutId = setTimeout(() => {
      closeSuccessModal();
    }, 5000);
  } catch (error) {
    console.error("Submission error:", error);
  }
});

// Success Modal Handling
function closeSuccessModal() {
  successModal.classList.remove("visible");
  document.body.style.overflow = "auto";
  clearTimeout(timeoutId);
}

// Close handlers for success modal
document
  .querySelectorAll(
    ".success-modal .close-modal, .success-modal .modal-overlay"
  )
  .forEach((element) => {
    element.addEventListener("click", closeSuccessModal);
  });

// ESC key handler for both modals
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
    closeSuccessModal();
  }
});

// Add loading state during submission
form.addEventListener("submit", async (e) => {
  const submitBtn = form.querySelector(".submit-btn");

  try {
    submitBtn.classList.add("loading");
    // ... rest of submission code
  } finally {
    submitBtn.classList.remove("loading");
  }
});
