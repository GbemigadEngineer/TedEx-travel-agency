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
