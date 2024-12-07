<<<<<<< HEAD
async function getData() {
  try {
    const response = await fetch("./consultation.json");
    const data = await response.json();

    document.getElementById("gridDiv").innerHTML = data.map(item => `
      <div class="card">
        <div class="cardImgDiv">
          <img src="${item.img}" alt="${item.title} image" />
        </div>
        <div class="cardTextSide">
          <h2>${item.title}</h2>
          <p>${item.text}</p>
        </div>
      </div>
    `).join('');
=======
async function loadHTML(filePath, targetElementId) {
  try {
    const response = await fetch(filePath);
    if (!response.ok)
      throw new Error(`Failed to load ${filePath}: ${response.statusText}`);
    const htmlContent = await response.text();
    document.getElementById(targetElementId).innerHTML = htmlContent;
  } catch (error) {
    console.error(error);
  }
}
document.addEventListener("DOMContentLoaded", async function () {
  const loader = document.getElementById("loader");

  if (loader) {
    loader.style.display = "block";
  } else {
    console.error("Loader element not found!");
  }

  try {
    await Promise.all([loadHTML("../nav/nav.html", "header")]);
    console.log("All HTML files loaded successfully.");

    const loginButton = document.querySelector("#loginBtn");
    if (loginButton) {
      loginButton.addEventListener("click", () => {
        window.location.href = "../login/login.html";
      });
    }
  } catch (error) {
    console.error("Error loading HTML files:", error);
  } finally {
    if (loader) {
      loader.style.display = "none";
    }
  }
});

async function getData() {
  try {
    const response = await fetch("../consultation/consultation.json");

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();

    const gridDiv = document.getElementById("gridDiv");

    let cards = "";

    // Generate cards HTML
    data.forEach((item, index) => {
      const { img, department, text } = item;

      cards += `
        <div id="card-${index}" class="card">
          <div class="cardImgDiv">
            <img src="${img}" alt="${department} image" />
          </div>
          <div class="cardTextSide">
            <h2>${department}</h2>
            <p>${text}</p>
          </div>
        </div>`;
    });

    gridDiv.innerHTML = cards;

    // Add click events
    data.forEach((item, index) => {
      const cardId = `card-${index}`;
      const cardElement = document.getElementById(cardId);

      cardElement.addEventListener("click", () => {
        const queryParams = new URLSearchParams({
          departmentId: item.id,
        }).toString();

        window.location.href = `specialityList.html?${queryParams}`;
      });
    });
>>>>>>> 4013066b6ce0bdfce36e99fa4e74dc8a178264cc
  } catch (error) {
    console.error("Error fetching or displaying data:", error);
  }
}



getData();
