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
