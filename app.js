new Typed(".auto-input", {
  strings: ["keyboard", "mouse", "skills"],
  loop: true,
  typeSpeed: 140,
  backSpeed: 140,
});

// SCROLL
function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const sliderImages1 = document.querySelectorAll(".scroll-image-1");
const sliderImages2 = document.querySelectorAll(".scroll-image-2");
const sliderImages3 = document.querySelectorAll(".scroll-image-3");
const sliderImages4 = document.querySelectorAll(".scroll-image-4");

const scrollIcon1 = document.querySelector(".scroll-text-1");
const scrollIcon2 = document.querySelector(".scroll-text-2");
const scrollIcon3 = document.querySelector(".scroll-text-3");
const scrollIcon4 = document.querySelector(".scroll-text-4");

//     function checkSlide(e) {
//       // half way through the image
//       sliderImages.forEach(sliderImage => {
//         const slideInAt = (window.scrollY + window.innerHeight) - sliderImage.height;
//         // bottom of the image
//         const imageBottom = sliderImage.offsetTop + sliderImage.height;

//         const isHalfShown = slideInAt > sliderImage.offsetTop;
//         const isNotScrolledPast = window.scrollY < imageBottom;

//         if (isHalfShown && isNotScrolledPast) {
//           scrollIcon.classList.add('active');
//         } else {
//           scrollIcon.classList.remove('active');
//         }
//       })
//     }

//     window.addEventListener('scroll', debounce(checkSlide));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      scrollIcon1.classList.add("active");
    } else {
      scrollIcon1.classList.remove("active");
    }
  });
});

const observer2 = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      scrollIcon2.classList.add("active");
    } else {
      scrollIcon2.classList.remove("active");
    }
  });
});

const observer3 = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      scrollIcon3.classList.add("active");
    } else {
      scrollIcon3.classList.remove("active");
    }
  });
});

const observer4 = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      scrollIcon4.classList.add("active");
    } else {
      scrollIcon4.classList.remove("active");
    }
  });
});

const observe1 = document.querySelectorAll(".observe");
observe1.forEach((el) => observer.observe(el));

const observe2 = document.querySelectorAll(".observe2");
observe2.forEach((el) => observer2.observe(el));

const observe3 = document.querySelectorAll(".observe3");
observe3.forEach((el) => observer3.observe(el));

const observe4 = document.querySelectorAll(".observe4");
observe4.forEach((el) => observer4.observe(el));

// HORIZONTAL SLIDER

const slider = document.querySelector(".slide-wrapper");
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener("mousedown", (e) => {
  isDown = true;
  slider.classList.add("mousedown");
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
  cancelMomentumTracking(); // Stop the drag momentum loop
  console.log(e);
});

// Listen for mouse wheel events
slider.addEventListener("wheel", (e) => {
  cancelMomentumTracking(); // Stop the drag momentum loop
});

slider.addEventListener("mouseleave", () => {
  isDown = false;
  slider.classList.remove("mousedown");
});

slider.addEventListener("mouseup", () => {
  isDown = false;
  slider.classList.remove("mousedown");
  beginMomentumTracking(); // Start a frame loop to continue drag momentum
});

// Momentum

var momentumID;

function beginMomentumTracking() {
  cancelMomentumTracking();
  momentumID = requestAnimationFrame(momentumLoop);
}

function cancelMomentumTracking() {
  cancelAnimationFrame(momentumID);
}

function momentumLoop() {
  slider.scrollLeft += velX; // Apply the velocity to the scroll position
  velX *= 0.95; // Slow the velocity slightly
  if (Math.abs(velX) > 0.5) {
    // Still moving?
    momentumID = requestAnimationFrame(momentumLoop); // Keep looping
  }
}

var velX;
slider.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 3;
  // Store the previous scroll position
  var prevScrollLeft = slider.scrollLeft;
  slider.scrollLeft = scrollLeft - walk;
  // Compare change in position to work out drag speed
  velX = slider.scrollLeft - prevScrollLeft;
  console.log(e);
});

// ITEMS SELECT
// const rightArrow = document.querySelector('.right-arrow');
// const leftArrow = document.querySelector('.left-arrow');

// const mainImg = document.querySelector('.main-bg-img');
// const leftImg = document.querySelector('.bg-img-left');
// const rightImg = document.querySelector('.bg-img-right');

// rightArrow.addEventListener('click', function() {
//   // 1. i want the main img to turn into the right bg img
//   // 2. i want the left img to turn into the main img
//   mainImg.classList.remove('main-bg-img');
//   mainImg.classList.add('bg-img-right');

//   rightImg.classList.remove('bg-img-right');
//   rightImg.classList.add('bg-img-left');

//   leftImg.classList.remove('bg-img-left');
//   leftImg.classList.add('main-bg-img');

//   console.log('hqweorpu')
// })

let currentImage = 1;

const rightArrow = document.querySelector(".right-arrow");
const leftArrow = document.querySelector(".left-arrow");

const mainImg = document.querySelector(".main-bg-img");
const leftImg = document.querySelector(".bg-img-left");
const rightImg = document.querySelector(".bg-img-right");

rightArrow.addEventListener("click", function () {
  if (mainImg.classList.contains("main-bg-img")) {
    mainImg.classList.add("transition-out");
    rightImg.classList.add("transition-in");
    setTimeout(() => {
      mainImg.classList.remove("main-bg-img");
      mainImg.classList.add("bg-img-right");
      rightImg.classList.remove("bg-img-right");
      rightImg.classList.add("bg-img-left");
      leftImg.classList.remove("bg-img-left");
      leftImg.classList.add("main-bg-img");
      mainImg.classList.remove("transition-out");
      rightImg.classList.remove("transition-in");
    }, 300);
  } else if (mainImg.classList.contains("bg-img-left")) {
    mainImg.classList.add("transition-out");
    leftImg.classList.add("transition-in");
    setTimeout(() => {
      mainImg.classList.remove("bg-img-left");
      mainImg.classList.add("main-bg-img");
      leftImg.classList.remove("bg-img-right");
      leftImg.classList.add("bg-img-left");
      rightImg.classList.remove("main-bg-img");
      rightImg.classList.add("bg-img-right");
      mainImg.classList.remove("transition-out");
      leftImg.classList.remove("transition-in");
    }, 300);
  } else {
    mainImg.classList.add("transition-out");
    leftImg.classList.add("transition-in");
    setTimeout(() => {
      mainImg.classList.remove("bg-img-right");
      mainImg.classList.add("bg-img-left");
      leftImg.classList.remove("main-bg-img");
      leftImg.classList.add("bg-img-right");
      rightImg.classList.remove("bg-img-left");
      rightImg.classList.add("main-bg-img");
      mainImg.classList.remove("transition-out");
      leftImg.classList.remove("transition-in");
    }, 300);
  }
});

leftArrow.addEventListener("click", function () {
  if (mainImg.classList.contains("main-bg-img")) {
    mainImg.classList.add("transition-out");
    rightImg.classList.add("transition-in");
    setTimeout(() => {
      mainImg.classList.remove("main-bg-img");
      mainImg.classList.add("bg-img-left");
      rightImg.classList.remove("bg-img-right");
      rightImg.classList.add("main-bg-img");
      leftImg.classList.remove("bg-img-left");
      leftImg.classList.add("bg-img-right");
      mainImg.classList.remove("transition-out");
      rightImg.classList.remove("transition-in");
    }, 300);
  } else if (mainImg.classList.contains("bg-img-left")) {
    mainImg.classList.add("transition-out");
    leftImg.classList.add("transition-in");
    setTimeout(() => {
      mainImg.classList.remove("bg-img-left");
      mainImg.classList.add("bg-img-right");
      leftImg.classList.remove("bg-img-right");
      leftImg.classList.add("main-bg-img");
      rightImg.classList.remove("main-bg-img");
      rightImg.classList.add("bg-img-left");
      mainImg.classList.remove("transition-out");
      leftImg.classList.remove("transition-in");
    }, 300);
  } else {
    mainImg.classList.add("transition-out");
    leftImg.classList.add("transition-in");
    setTimeout(() => {
      mainImg.classList.remove("bg-img-right");
      mainImg.classList.add("main-bg-img");
      leftImg.classList.remove("main-bg-img");
      leftImg.classList.add("bg-img-left");
      rightImg.classList.remove("bg-img-left");
      rightImg.classList.add("bg-img-right");
      mainImg.classList.remove("transition-out");
      leftImg.classList.remove("transition-in");
    }, 300);
  }
});

// HAMBURGER
const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector("nav");
const logo = document.querySelector(".logo");

hamburger.addEventListener("click", function () {
  hamburger.classList.toggle("active");
  nav.classList.toggle("active");
  logo.classList.toggle("active");
});

document.querySelectorAll(".nav-a").forEach((n) =>
  n.addEventListener("click", function () {
    hamburger.classList.remove("active");
    nav.classList.toggle("active");
    logo.classList.toggle("active");
  })
);

// MEDIA QUERY

const scrollContainer = document.querySelector(".scroll .container");
const customContainer = document.querySelector(".custom-container");
const fullContainer = document.querySelector(".full-container");

function screenChange(e) {
  if (e.matches) {
    // below 750px
    scrollContainer.style.width = "100%";
  } else {
  }
}

const mediaQuery = window.matchMedia("(max-width: 750px)");

mediaQuery.addListener(screenChange);

screenChange(mediaQuery);

// ANIMATION

const observerAni = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
});

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observerAni.observe(el));

const hiddenBlur = document.querySelectorAll(".hiddenb");
hiddenBlur.forEach((el) => observerAni.observe(el));

const slideRight = document.querySelectorAll(".slide-right");
slideRight.forEach((el) => observerAni.observe(el));

const slideLeft = document.querySelectorAll(".slide-left");
slideLeft.forEach((el) => observerAni.observe(el));

// COMMENT SYSTEM

const commentBtn = document.querySelector(".comment-btn");
const commentInput = document.querySelector(".comment-input");
const reviewCommentWrap = document.querySelector(".review-comment-wrap");

commentBtn.addEventListener("click", function (e) {
  if (commentInput.value !== "") {
    e.preventDefault();
    addComment();
  } else {
    alert("Please type something in.");
  }
});

commentInput.addEventListener("keydown", function (e) {
  if (e.keyCode === 13 && commentInput.value !== "") {
    e.preventDefault();
    addComment();
  } else if (e.keyCode === 13 && commentInput.value === "") {
    alert("Please input your comment before submitting.");
  }
});

function addComment() {
  // create new comment element
  const newComment = document.createElement("div");
  newComment.classList.add("review-comment");
  newComment.innerHTML = `
        <img src="images/saul goodman 2.webp" class="comment-img">
        <div class="comment-text">
            <div class="name-date">
                <h4 class="comment-name">Saul Goodman</h4>
                <p class="comment-date">September 11th, 2064</p>
            </div>
            <h3 class="comment-body">${commentInput.value}</h3>
        </div>
    `;

  // append new comment to the DOM
  reviewCommentWrap.appendChild(newComment);
  reviewCommentWrap.scrollTop = reviewCommentWrap.scrollHeight;

  // clear the comment input
  commentInput.value = "";
}

// 1. Get the value of what im typing in
// 2. When i click on the commentBtn, i want my text value to be inserted into the DOM

// FOOTER DATE
var year = new Date().getFullYear();

document.querySelector(".date").innerHTML = year;
