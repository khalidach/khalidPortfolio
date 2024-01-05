const skillSection = document.querySelector(".skills");
const progressBars = document.querySelectorAll(".progress-bar");
function showProgress() {
  progressBars.forEach((bar) => {
    const value = bar.dataset.progress;
    bar.style.opacity = 1;
    bar.style.width = `${value}%`;
  });
}
window.addEventListener("scroll", () => {
  const sectionPos = skillSection.getBoundingClientRect().top;
  const screenPos = window.innerHeight;
  if (sectionPos < screenPos) {
    showProgress();
  }
});

// form validation

let fullNameInput = document.getElementById("name");
let emailInput = document.getElementById("email");
let messageInput = document.getElementById("message");
let errMsg = document.querySelectorAll(".errMsg");
let form = document.querySelector("form");
let emailPattern = /^[a-zA-Z0-9.]+@gmail\.com$/;
let fullNamePattern = /^[a-zA-Z]+ [a-zA-Z]+$/;

function emailValidate() {
  if (!emailPattern.test(emailInput.value.trim())) {
    emailInput.style.borderColor = "red";
    errMsg[1].textContent = "please entre valid email : example@gmail.com";
    errMsg[1].style.transform = "translateX(0)";
    errMsg[1].style.visibility = "visible";
    errMsg[1].style.height = "fit-content";
  } else {
    emailInput.style.borderColor = "green";
    errMsg[1].style.transform = "translateX(-50px)";
    errMsg[1].style.visibility = "hidden";
    errMsg[1].style.height = "0";
  }
}
function messageValidate() {
  if (messageInput.value === "") {
    messageInput.style.borderColor = "red";
    errMsg[2].textContent = "please entre your message 😊";
    errMsg[2].style.transform = "translateX(0)";
    errMsg[2].style.visibility = "visible";
    errMsg[2].style.height = "fit-content";
  } else {
    messageInput.style.borderColor = "green";
    errMsg[2].style.transform = "translateX(-50px)";
    errMsg[2].style.visibility = "hidden";
    errMsg[2].style.height = "0";
  }
}

function validateFullName() {
  if (!fullNamePattern.test(fullNameInput.value.trim())) {
    fullNameInput.style.borderColor = "red";
    errMsg[0].textContent = "please entre your full name ex: john doe";
    errMsg[0].style.transform = "translateX(0)";
    errMsg[0].style.visibility = "visible";
    errMsg[0].style.height = "fit-content";
  } else {
    fullNameInput.style.borderColor = "green";
    errMsg[0].style.transform = "translateX(-50px)";
    errMsg[0].style.visibility = "hidden";
    errMsg[0].style.height = "0";
  }
}

function submitForm(event) {
  event.preventDefault();
  const isFullNameValid = fullNamePattern.test(fullNameInput.value.trim());
  const isEmailValid = emailPattern.test(emailInput.value.trim());
  const isMessageValid = messageInput.value !== "";

  let toaster = document.querySelector(".toasterMessage");
  let succMsg = '<i class="fa-solid fa-circle-check"></i> message Success';
  let errMsg =
    '<i class="fa-solid fa-circle-exclamation"></i> Please fill with valid data';

  if (isFullNameValid && isEmailValid && isMessageValid) {
    toaster.innerHTML = succMsg;
    toaster.classList.add("success");
    toaster.style.visibility = "visible";
    toaster.style.top = "83px";
    toaster.classList.add("visible");
    setTimeout(() => {
      toaster.style.visibility = "hidden";
      toaster.style.top = "0px";
      toaster.classList.remove("visible");
      emailInput.value = "";
      fullNameInput.value = "";
      messageInput.value = "";
      fullNameInput.style.borderColor = "black";
      emailInput.style.borderColor = "black";
      messageInput.style.borderColor = "black";
    }, 3000);
  } else {
    toaster.innerHTML = errMsg;
    toaster.classList.add("error");
    toaster.style.visibility = "visible";
    toaster.style.top = "83px";
    toaster.classList.add("visible");
    setTimeout(() => {
      toaster.style.visibility = "hidden";
      toaster.style.top = "0px";
      toaster.classList.remove("visible");
    }, 3000);
  }
}
fullNameInput.addEventListener("blur", validateFullName);
emailInput.addEventListener("blur", emailValidate);
messageInput.addEventListener("blur", messageValidate);

// hamburger-menu
let hamburger = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-nav");
const mobileNav = document.querySelectorAll(".mobile-nav li a");
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("is-active");
  mobileMenu.classList.toggle("is-active");
  if (mobileMenu.classList.contains("is-active")) {
    document.body.style.overflowY = "hidden";
  } else {
    // Adding a small delay before removing the class
    document.body.style.overflowY = "scroll";
  }
});

// thi
mobileNav.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("is-active");
    mobileMenu.classList.remove("is-active");
  });
});

// scroll to section
const navigationBar = document.querySelector(".nav-bar");
const navHeight = navigationBar.offsetHeight;
const navs = document.querySelectorAll("a");
const homeNav = navs[0];
navs.forEach((nav) => {
  nav.addEventListener("click", (e) => {
    const targetId = nav.getAttribute("href").substring(1);
    const targetEle = document.getElementById(targetId);

    if (targetEle) {
      // Check if it's the "Home" link
      e.preventDefault();
      const scrollPosition = targetEle.offsetTop - navHeight;

      // Scroll to the target element
      window.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });

      if (homeNav) {
        return;
      }
    }
  });
});

// scroll to top progress

function updateScrollStyles() {
  let pos = document.documentElement.scrollTop;
  let scrollProgress = document.getElementById("progress-circle");

  // Check if the scroll position is greater or equal to 10
  if (pos >= 10) {
    // Apply styles if true
    scrollProgress.style.opacity = "1";
    scrollProgress.style.right = "10px";
  } else {
    // Apply styles if false
    scrollProgress.style.opacity = "0";
    scrollProgress.style.right = "0px";
  }

  // Calculate scroll percentage and update the gradient
  let calcHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  let scrollValue = Math.round((pos * 100) / calcHeight);
  scrollProgress.style.background = `conic-gradient(#020887 ${scrollValue}%  , #868ae7 ${scrollValue}%)`;
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function initScrollEvents() {
  // Add scroll event listener
  window.addEventListener("scroll", updateScrollStyles);

  // Add click event listener to progressValue
  let progressValue = document.getElementById("progress-value");
  progressValue.addEventListener("click", scrollToTop);
}

// Initialize scroll events
initScrollEvents();
