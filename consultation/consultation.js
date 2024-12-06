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
  } catch (error) {
    console.error("Error fetching or displaying data:", error);
  }
}

getData();
