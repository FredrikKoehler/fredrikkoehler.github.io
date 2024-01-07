"use strict";

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
