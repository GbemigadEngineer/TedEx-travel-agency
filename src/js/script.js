"use strict";
// Toggle mobile menu
const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu");

hamburger.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
  hamburger.classList.toggle("active");
});

// Form Handling
const formTriggers = document.querySelectorAll(".nav-cta, .open-form");
const formModal = document.querySelector(".form-modal");
const successModal = document.querySelector(".success-modal");
const errorModal = document.querySelector(".error-modal");
const form = document.querySelector(".form-modal form");
const contactForm = document.querySelector("#contact .application-form");
let timeoutId;

// Modal Functions
function closeModal() {
  formModal.classList.remove("visible");
  document.body.style.overflow = "auto";
}

function showModal(modalType) {
  closeModal();
  const modal = modalType === "success" ? successModal : errorModal;
  modal.classList.add("visible");
  document.body.style.overflow = "hidden";

  timeoutId = setTimeout(() => {
    modal.classList.remove("visible");
    document.body.style.overflow = "auto";
  }, 5000);
}

function setupModalClose(modal) {
  modal
    .querySelectorAll(".close-modal, .modal-overlay, .ok-button")
    .forEach((element) => {
      element.addEventListener("click", () => {
        modal.classList.remove("visible");
        document.body.style.overflow = "auto";
        clearTimeout(timeoutId);
      });
    });
}

// Event Listeners
formTriggers.forEach((trigger) => {
  trigger.addEventListener("click", (e) => {
    e.preventDefault();
    formModal.classList.add("visible");
    document.body.style.overflow = "hidden";
  });
});

formModal.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal-overlay")) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    [formModal, successModal, errorModal].forEach((modal) => {
      modal.classList.remove("visible");
    });
    document.body.style.overflow = "auto";
    clearTimeout(timeoutId);
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const submitBtn = form.querySelector(".submit-btn");

  try {
    submitBtn.classList.add("loading");
    // Convert form data to URLSearchParams
    const formData = new FormData(form);
    const encodedData = new URLSearchParams(formData).toString();
    const response = await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encodedData,
    });

    if (response.ok) {
      form.reset();
      showModal("success");
    } else {
      showModal("error");
    }
  } catch (error) {
    console.error("Submission error:", error);
    showModal("error");
  } finally {
    submitBtn.classList.remove("loading");
  }
});

// Initialize modal handlers
setupModalClose(formModal);
setupModalClose(successModal);
setupModalClose(errorModal);

// Smooth scrolling implementation for navigation links
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault();

    // close mobile menu if open
    if (mobileMenu.classList.contains("active")) {
      mobileMenu.classList.remove("active");
      hamburger.classList.remove("active");
    }

    const targetId = this.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      // Calculate position with navbar offset
      const navbarHeight = document.querySelector(".navbar").offsetHeight;
      const targetPosition = targetSection.offsetTop - navbarHeight;

      // Smooth scroll
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });

      // Update URL without jumping
      history.pushState(null, null, `#${targetId}`);
    }
  });
});

// Hanlde contact section form submission
// Contact Form Handling

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector(".submit-btn");
    const formData = new FormData(contactForm);

    try {
      submitBtn.classList.add("loading");
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
      });

      if (response.ok) {
        contactForm.reset();
        showModal("success");
      } else {
        showModal("error");
      }
    } catch (error) {
      console.error("Submission error:", error);
      showModal("error");
    } finally {
      submitBtn.classList.remove("loading");
    }
  });
}
