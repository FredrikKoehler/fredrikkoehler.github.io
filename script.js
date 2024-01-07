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
        overlay.appendChild(year_exhibition);
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

document.addEventListener("DOMContentLoaded", function () {
  fetch("resources/exhibitions.json")
    .then((response) => response.json())
    .then((data) => {
      const urlParams = new URLSearchParams(window.location.search);
      const exhibition_name = urlParams.get("exhibition");
      const selectedExhibition = data.find(
        (exhibit) => exhibit.id === parseInt(exhibition_name)
      );
      const exhibitionGallery = document.querySelector(
        ".exhibition-image-gallery"
      );

      const exhibitionName = document.getElementById("exhibitionName");
      const exhibitionYear = document.getElementById("exhibitionYear");

      exhibitionName.textContent = selectedExhibition.exhibition_name;
      exhibitionYear.textContent = selectedExhibition.exhibition_year;

      // Loop through each exhibition object in the JSON data
      selectedExhibition.images.forEach((image) => {
        const li = document.createElement("li");
        const link = document.createElement("a"); // Create an anchor element
        const img = document.createElement("img");
        const overlay = document.createElement("div");
        const title_image = document.createElement("p");
        const year = document.createElement("p");
        const size = document.createElement("p");

        console.log(exhibitionGallery);

        img.src = image.path;
        img.alt = image.title;

        title_image.textContent = image.title;
        year.textContent = image.year;
        size.textContent = image.size;

        overlay.classList.add("overlay");

        overlay.appendChild(title_image);
        //overlay.appendChild(year);
        //overlay.appendChild(size);

        // overlay.appendChild(description);

        //link.href = `${img.src}`; // Should for now link to the image path
        const exhibitionID = selectedExhibition.id;
        link.href = `image.html?exhibition=${exhibitionID}&image=${image.title}`; // Should for now link to the image path
        link.appendChild(img); // Place the image inside the link
        link.appendChild(overlay); // Place the overlay inside the link

        li.appendChild(link); // Place the link within the list item

        exhibitionGallery.appendChild(li);
      });
    })
    .catch((error) => console.error("Error fetching gallery data:", error));
});

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const imageTitle = urlParams.get("image");

  const imageTitleElement = document.getElementById("imageTitle");
  const imageYearElement = document.getElementById("imageYear");
  const imageSizeElement = document.getElementById("imageSize");
  const imageElement = document.getElementById("displayedImage");

  imageTitleElement.textContent = imageTitle;

  fetch("resources/exhibitions.json")
    .then((response) => response.json())
    .then((data) => {
      // Find the specific exhibition containing the image with the matching title
      const selectedExhibition = data.find((exhibit) =>
        exhibit.images.some((image) => image.title === imageTitle)
      );

      // Find the specific image within the selected exhibition
      const selectedImage = selectedExhibition.images.find(
        (image) => image.title === imageTitle
      );

      // Set the image details in the HTML elements
      imageYearElement.textContent = selectedImage.year;
      imageSizeElement.textContent = selectedImage.size;
      imageElement.src = selectedImage.path;
      imageElement.alt = selectedImage.title;

      // Create the back link
      const backLink = document.createElement("a");
      backLink.textContent = "Back to Exhibition";
      backLink.href = `exhibition.html?exhibition=${selectedExhibition.id}`;

      // Append the back link to a suitable element in your HTML layout
      const backLinkContainer = document.getElementById("backLinkContainer");
      backLinkContainer.appendChild(backLink);
    })
    .catch((error) => console.error("Error fetching image data:", error));
});

// You can fetch data related to this image using its title from the provided JSON or elsewhere.
// For example, populate the image details based on the fetched data:
// ...

// Fetch image details based on the provided title
//   fetch("resources/exhibitions.json")
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//       const selectedImage = data[0].images.find(
//         (image) => image.title === imageTitle
//       );
//       console.log(imageTitle);

//       if (selectedImage) {
//         imageYearElement.textContent = selectedImage.year;
//         imageSizeElement.textContent = selectedImage.size;
//         imageElement.src = selectedImage.path;
//         imageElement.alt = selectedImage.title;
//       } else {
//         console.error("Image not found");
//       }
//       console.log(selectedImage);
//     })
//     .catch((error) => console.error("Error fetching image data:", error));
// });

// document.addEventListener("DOMContentLoaded", function () {
//   fetch("resources/exhibitions.json")
//     .then((response) => response.json())
//     .then((data) => {
//       const imageParams = new URLSearchParams(window.location.search);
//       const exhibition_name = imageParams.get("image");
//       const selectedImage = data.find(
//         (exhibit) => exhibit.id === parseInt(title_image)
//       );
//       const exhibitionGallery = document.querySelector(
//         ".exhibition-image-gallery"
//       );
//       console.log(exhibitionGallery);

//       const exhibitionName = document.getElementById("exhibitionName");
//       const exhibitionYear = document.getElementById("exhibitionYear");

//       exhibitionName.textContent = selectedExhibition.exhibition_name;
//       exhibitionYear.textContent = selectedExhibition.year;

//       // Loop through each exhibition object in the JSON data
//       selectedExhibition.images.forEach((image) => {
//         const li = document.createElement("li");
//         const link = document.createElement("a"); // Create an anchor element
//         const img = document.createElement("img");
//         const overlay = document.createElement("div");
//         const title_image = document.createElement("p");
//         const year = document.createElement("p");
//         const size = document.createElement("p");

//         console.log(exhibitionGallery);

//         img.src = image.path;
//         img.alt = image.title;

//         title_image.textContent = image.title;
//         year.textContent = image.year;
//         size.textContent = image.size;

//         overlay.classList.add("overlay");

//         overlay.appendChild(title_image);
//         //overlay.appendChild(year);
//         //overlay.appendChild(size);

//         // overlay.appendChild(description);

//         link.href = ``; // Should for now link to the image path
//         link.appendChild(img); // Place the image inside the link
//         link.appendChild(overlay); // Place the overlay inside the link

//         li.appendChild(link); // Place the link within the list item

//         exhibitionGallery.appendChild(li);
//       });
//     })
//     .catch((error) => console.error("Error fetching gallery data:", error));
// });

function changeActiveSection() {
  let index = sections.length;

  while (--index && window.scrollY + 50 < sections[index].offsetTop) {}

  navLinks.forEach((link) => link.classList.remove("active"));
  navLinks[index].classList.add("active");
}
// Scroll Event Listener
window.addEventListener("scroll", changeActiveSection);

// // Example: Add an event listener to an exhibition element
// const exhibitionElement = document.getElementById("exhibitionId");
// exhibitionElement.addEventListener("click", () => {
//   showModal();
//   // Add logic to populate modal with selected exhibition's paintings/photos
// });

// function populateModal(exhibition) {
//   const modalContent = document.querySelector(".modal-content");
//   modalContent.innerHTML = ""; // Clear previous content

//   exhibition.images.forEach((image) => {
//     const imgElement = document.createElement("img");
//     imgElement.src = image.path;
//     imgElement.alt = image.title;

//     // Add an event listener to each image for a larger view, navigation, etc.
//     imgElement.addEventListener("click", () => {
//       // Handle the functionality for displaying larger view or navigating images
//     });

//     modalContent.appendChild(imgElement);
//   });
// }

// // Assuming you have a list of exhibitions in the gallery
// const exhibitions = document.querySelectorAll(".exhibition");

// exhibitions.forEach((exhibition) => {
//   exhibition.addEventListener("click", () => {
//     const exhibitionData = /* Fetch exhibition data based on the clicked exhibition */;
//     populateModal(exhibitionData);
//     showModal(); // Show the modal with the populated content
//   });
// });
