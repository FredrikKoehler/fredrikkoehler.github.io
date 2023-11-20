"use strict";

const navLinks = document.querySelectorAll(".nav a");

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

// const navLinks = document.querySelectorAll(".nav a");

// console.log(nav.length);

// const activateLink = function () {
//   nav.classList.add("active");
// };

// for (let i = 0; i < nav.length; i++)
//   nav[i].addEventListener("click", activateLink);

// function myFunction(e) {
//   var elems = document.querySelectorAll(".active");
//   [].forEach.call(elems, function (el) {
//     el.classList.remove("active");
//   });
//   e.target.className = "active";
// }

// fetch("cv.md")
//   .then((response) => response.text())
//   .then((markdown) => {
//     // Converting Markdown to HTML using marked.js
//     const cvContent = document.getElementById("cvContent");
//     cvContent.innerHTML = marked(markdown);
//     console.log("test");
//   })
//   .catch((err) => console.error("Error fetching Markdown file:", err));

document.addEventListener("DOMContentLoaded", function () {
  fetch("resources/cv.md")
    .then((response) => response.text())
    .then((markdown) => {
      // Converting Markdown to HTML using marked.js
      const peterIntro = document.getElementById("peterIntro");
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
        const images = exhibition.images; // Access the "images" array

        // Loop through each image object in the JSON data
        images.forEach((image) => {
          const li = document.createElement("li");
          const img = document.createElement("img");
          const overlay = document.createElement("div");
          const span = document.createElement("span");

          img.src = image.path;
          img.alt = image.title;

          span.textContent = image.title;
          overlay.appendChild(span);

          li.appendChild(img);
          li.appendChild(overlay);

          gallery.appendChild(li);
        });
      });
    })
    .catch((error) => console.error("Error fetching gallery data:", error));
});
