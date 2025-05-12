"use strict";
// Toggle mobile menu
const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu");

hamburger.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
  hamburger.classList.toggle("active");
});

// Carousel Logic
let currentSlide = 0;
const slides = document.querySelectorAll(".carousel-item");

function nextSlide() {
  slides[currentSlide].classList.remove("active");
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add("active");
}

// Change slide every 5 seconds
setInterval(nextSlide, 5000);

// Modal Logic
const openFormBtn = document.getElementById("open-form");
const formModal = document.getElementById("form-modal");
const closeModal = document.querySelector(".close-modal");

openFormBtn.addEventListener("click", () => {
  formModal.style.display = "block";
});

closeModal.addEventListener("click", () => {
  formModal.style.display = "none";
});

// Close modal when clicking outside
window.addEventListener("click", (e) => {
  if (e.target === formModal) {
    formModal.style.display = "none";
  }
});

// FORM SUBMITION SUCCESS HANDLER
const form = document.querySelector('form[name="contact"]');
const successModal = document.getElementById("success-modal");
const closeSuccess = document.querySelector(".close-success");

// Modified form submission handler
async function handleSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  try {
    await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    });
    // Close form modal
    formModal.style.display = "none";

    // Show success modal
    successModal.style.display = "block";

    //  Auto-close after 3 seconds
    setTimeout(() => {
      successModal.style.display = "none";
    }, 3000);

    // Reset form
    event.target.reset();
  } catch (error) {
    alert("Error submiting form. Please ty again!");
  }
}

// Event Listeners
form.addEventListener("submit", handleSubmit);
closeSuccess.addEventListener("click", () => {
  successModal.style.display = "none";
});

// Close success modal when clicking outside
window.addEventListener("click", (event) => {
  if (event.target === successModal) {
    successModal.style.display = "none";
  }
});
