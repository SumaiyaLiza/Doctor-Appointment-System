
async function loadHTML(filePath, targetElementId) {
  try {
    const response = await fetch(filePath);
    const htmlContent = await response.text();
    document.getElementById(targetElementId).innerHTML = htmlContent;
  } catch (e) {
    console.error("Error fetching data:", e);
  }
}

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

loadHTML("../nav/nav.html", "header");
getData();
