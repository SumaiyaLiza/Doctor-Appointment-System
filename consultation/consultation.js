import { Fetch } from "./Fetch.js";
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

document.addEventListener("DOMContentLoaded", function () {
  const loader = document.getElementById("loader");
  loader.style.display = "block"; // Show the loader

  Promise.all([loadHTML("nav.html", "header")])
    .then(() => {
      loader.style.display = "none";
      console.log("All HTML files loaded successfully.");
    })
    .catch((error) => {
      loader.style.display = "none"; 
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
