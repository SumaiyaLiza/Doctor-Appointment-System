import { Fetch } from "./Fetch.js";

// Function to load HTML content from a given file URL and insert it into a container
async function loadHTML(filePath, targetElementId) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Failed to load ${filePath}: ${response.statusText}`);
    }
    const htmlContent = await response.text();
    const targetElement = document.getElementById(targetElementId);
    targetElement.innerHTML = htmlContent; // Insert the loaded content
  } catch (error) {
    console.error(error);
  }
}

// Load the HTML files when the page loads
document.addEventListener("DOMContentLoaded", function () {
  const loader = document.getElementById("loader");
  loader.style.display = "block"; // Show the loader

  // Load the content into the respective containers
  Promise.all([loadHTML("nav.html", "header")])
    .then(() => {
      loader.style.display = "none"; // Hide the loader after all content is loaded
      console.log("All HTML files loaded successfully.");
    })
    .catch((error) => {
      loader.style.display = "none"; // Hide the loader even if there's an error
      console.error("Error loading HTML files:", error);
    });
});
async function getData() {
  const data = await Fetch("./consultation.json");

  const gridDiv = document.getElementById("gridDiv");

  let cards = "";

  data.forEach((item) => {
    const { img, title, text } = item;
    
    cards += ` 
      <div class="card">
        <div class="cardImgDiv">
          <img src="${img}" alt="" />
        </div>

        <div class="cardTextSide">
          <h2>${title}</h2>
          <p>${text}</p>
        </div>
      </div>`;

    
  });

  gridDiv.innerHTML = cards;
}

getData();
