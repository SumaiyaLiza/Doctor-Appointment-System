async function getData() {
  try {
    // Show loading spinner
    const gridDiv = document.getElementById("gridDiv");
    gridDiv.innerHTML = `<div class="loading-spinner">Loading...</div>`;

    const response = await fetch('consultation.json');

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();

    // Generate cards HTML and add click events
    gridDiv.innerHTML = data
      .map(
        (item, index) => `
        <div id="card-${index}" class="card" data-id="${item.id}">
          <div class="cardImgDiv">
            <img src="${item.img}" alt="${item.department} image" />
          </div>
          <div class="cardTextSide">
            <h2>${item.department}</h2>
            <p>${item.text}</p>
          </div>
        </div>`
      )
      .join("");

    // Add a single event listener to the grid container (Event Delegation)
    gridDiv.addEventListener("click", (event) => {
      const card = event.target.closest(".card");
      if (!card) return; // Ignore clicks outside of cards

      const departmentId = card.getAttribute("data-id");
      window.location.href = `specialityList.html?departmentId=${departmentId}`;
    });
  } catch (error) {
    console.error("Error fetching or displaying data:", error);
    // Display an error message
    const gridDiv = document.getElementById("gridDiv");
    gridDiv.innerHTML = `<div class="error-message">Failed to load data. Please try again later.</div>`;
  }
}

// Call the function
getData();