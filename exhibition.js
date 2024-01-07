"use strict";

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
