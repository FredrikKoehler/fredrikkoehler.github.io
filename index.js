"use strict";

const navLinks = document.querySelectorAll(".nav a");
const sections = document.querySelectorAll(".section");

const activateLink = function (event) {
  // Remove the "active" class from all links
  navLinks.forEach((link) => {
    link.classList.remove("active");
  });

  // Add the "active" class to the clicked link
  event.target.classList.add("active");
};

// Attach the activateLink function to each link
navLinks.forEach((link) => {
  link.addEventListener("click", activateLink);
});

document.addEventListener("DOMContentLoaded", function () {
  fetch("resources/cv.md")
    .then((response) => response.text())
    .then((markdown) => {
      // Converting Markdown to HTML using marked.js
      const peterIntro = document.getElementById("peterCV");
      peterIntro.innerHTML = marked.parse(markdown);
    })
    .catch((err) => console.error("Error fetching Markdown file:", err));
});

document.addEventListener("DOMContentLoaded", function () {
  fetch("resources/exhibitions.json")
    .then((response) => response.json())
    .then((data) => {
      const gallery = document.querySelector(".image-gallery");

      // Loop through each exhibition object in the JSON data
      data.forEach((exhibition) => {
        const li = document.createElement("li");
        const link = document.createElement("a"); // Create an anchor element
        const img = document.createElement("img");
        const overlay = document.createElement("div");
        const name_exhibition = document.createElement("p");
        const year_exhibition = document.createElement("p");
        // const description = document.createElement("p");

        img.src = exhibition.exhibition_image;
        img.alt = exhibition.exhibition_name;

        name_exhibition.textContent = exhibition.exhibition_name;
        year_exhibition.textContent = exhibition.exhibition_year;
        // description.textContent = exhibition.exhibition_description;

        overlay.classList.add("overlay");

        overlay.appendChild(name_exhibition);
        //overlay.appendChild(year_exhibition);
        // overlay.appendChild(description);

        link.href = `exhibition.html?exhibition=${exhibition.id}`; // Set the href attribute
        link.appendChild(img); // Place the image inside the link
        link.appendChild(overlay); // Place the overlay inside the link

        li.appendChild(link); // Place the link within the list item

        gallery.appendChild(li);
      });
    })
    .catch((error) => console.error("Error fetching gallery data:", error));
});

function changeActiveSection() {
  let index = sections.length;

  while (--index && window.scrollY + 50 < sections[index].offsetTop) {}

  navLinks.forEach((link) => link.classList.remove("active"));
  navLinks[index].classList.add("active");
}
// Scroll Event Listener
window.addEventListener("scroll", changeActiveSection);
