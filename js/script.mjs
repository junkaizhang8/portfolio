const menuIcon = document.querySelector("#menuIcon");
const navbar = document.querySelector(".nav-bar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
  sections.forEach((section) => {
    // Current vertical scroll position of the window
    const top = window.scrollY;
    // Offset for preemptive highlighting of the next section
    const offset = section.offsetTop - 200;
    // Height of the section
    const height = section.offsetHeight;
    const id = section.getAttribute("id");

    // If the section is in view, highlight the corresponding nav link
    if (top >= offset && top < offset + height) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        document
          .querySelector(`header nav a[href="#${id}"]`)
          .classList.add("active");
      });
    }

    menuIcon.classList.remove("bx-x");
    navbar.classList.remove("active");
  });

  const header = document.querySelector("header");
  // Add faint shadow to the header when the user scrolls down
  header.classList.toggle("sticky", window.scrollY > 100);
};

// Wait for ms milliseconds
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Typewriter effect
const createTypewriter = (
  selector,
  messages,
  typeSpeed = 80,
  deleteSpeed = 50,
  delay = 2000,
  loop = true
) => {
  if (!selector || selector === "") {
    throw new Error("Selector is required");
  }

  if (!messages || messages.length === 0) {
    throw new Error("Messages are required");
  }

  const element = document.querySelector(selector);
  if (!element) {
    throw new Error("Element not found");
  }

  let messageIndex = 0;

  const typeMessage = async (message) => {
    for (let i = 0; i < message.length; i++) {
      element.textContent += message[i];
      await wait(typeSpeed);
    }
  };

  const deleteMessage = async () => {
    for (let i = element.textContent.length; i >= 0; i--) {
      element.textContent = element.textContent.slice(0, i);
      await wait(deleteSpeed);
    }
  };

  const typewriterLoop = async () => {
    while (true) {
      const currentMessage = messages[messageIndex];
      await typeMessage(currentMessage);
      element.classList.add("blink");
      await wait(delay);
      element.classList.remove("blink");
      await deleteMessage();
      messageIndex = (messageIndex + 1) % messages.length;

      // Do not loop if the last message is reached and loop is false
      if (!loop && messageIndex === 0) {
        break;
      }
    }
  };

  typewriterLoop();
};

const typewriterMessages = [
  "Software Developer",
  "Full-Stack Developer",
  "Web Developer",
  "Game Developer",
  "CS Student",
  "Tech Enthusiast",
];

createTypewriter(".typewriter", typewriterMessages);

ScrollReveal({
  reset: true,
  distance: "80px",
  duration: 2000,
  delay: 200,
});

ScrollReveal().reveal(".home-content, .heading", { origin: "top" });
ScrollReveal().reveal(
  ".home-img, .skills-list, .projects-grid, .contact form",
  {
    origin: "bottom",
  }
);
ScrollReveal().reveal(".home-content h1", { origin: "left" });
ScrollReveal().reveal(".home-content p, .about-content", { origin: "right" });

// Toast
const toast = (() => {
  const module = {};

  const toastContainer = document.querySelector("#toastContainer");

  const makeToast = (message, duration = 3000) => {
    if (duration <= 0) {
      throw new Error("Duration must be greater than 0");
    }

    const toast = document.createElement("div");
    toast.classList.add("toast");
    toast.innerHTML = `
    <i class="bx bx-x toast-close"></i>
    <p>${message}</p>
    <div class="toast-progress-bar"></div>
   `;

    // Set the animation duration of the progress bar
    const progressBar = toast.querySelector(".toast-progress-bar");
    progressBar.style.animationDuration = `${duration}ms`;

    // Close the toast message
    const toastClose = toast.querySelector(".toast-close");
    toastClose.addEventListener("click", () => {
      toast.remove();
    });

    // Remove the toast message after the duration
    setTimeout(() => {
      toast.remove();
    }, duration);

    toastContainer.prepend(toast);
    return toast;
  };

  module.success = (message, duration = 3000) => {
    const toast = makeToast(message, duration);
    toast.classList.add("toast-success");
  };

  module.error = (message, duration = 3000) => {
    const toast = makeToast(message, duration);
    toast.classList.add("toast-error");
  };

  return module;
})();

// Contact form submission
const form = document.querySelector("#contactForm");
form.addEventListener("submit", async (e) => {
  // Prevent reloading the page
  e.preventDefault();

  // Get the form data
  const formData = new FormData(form);
  const subject = formData.get("subject");
  const email = formData.get("email");
  const message = formData.get("message");

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!subject) {
    toast.error("Email subject is required", 3000);
    return;
  }

  if (!message) {
    toast.error("Email message is required", 3000);
    return;
  }

  if (email && !emailRegex.test(email)) {
    toast.error("Invalid email address", 3000);
    return;
  }

  try {
    form.action = "https://formsubmit.co/junkaizhang8@gmail.com";
    form.submit();
  } catch (error) {
    toast.error("Failed to send email", 3000);
  }
});
