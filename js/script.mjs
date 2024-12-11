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
