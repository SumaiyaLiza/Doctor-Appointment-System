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
    const data = await response.json();
    const gridDiv = document.getElementById("gridDiv");

    let cards = "";

    data.forEach((item) => {
      const { img, title, text } = item;

      cards += `
        <div class="card">
          <div class="cardImgDiv">
            <img src="${img}" alt="${title} image" />
          </div>
          <div class="cardTextSide">
            <h2>${title}</h2>
            <p>${text}</p>
          </div>
        </div>`;
    });

    gridDiv.innerHTML = cards;
  } catch (error) {
    console.error("Error fetching or displaying data:", error);
  }
}

getData();
