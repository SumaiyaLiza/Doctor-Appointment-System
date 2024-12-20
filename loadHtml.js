function loadHtml(filePath, targetElementId) {
  fetch(filePath)
      .then(response => {
          if (!response.ok) {
              throw new Error(`Failed to load ${filePath}, Status: ${response.status}`);
          }
          return response.text();
      })
      .then(html => {
          const targetElement = document.getElementById(targetElementId);
          if (targetElement) {
              targetElement.innerHTML = html;
          } else {
              console.error(`Element with ID "${targetElementId}" not found.`);
          }
      })
      .catch(error => console.error('Error loading HTML:', error));
}


document.addEventListener("DOMContentLoaded", () => {
    const icons = document.querySelectorAll(".step-icon img"); // Select all icons
    const previewImage = document.getElementById("preview-image"); // Mobile preview image element
  
    icons.forEach((icon) => {
      icon.addEventListener("click", () => {
        // Remove the active class from all icons
        icons.forEach((item) => item.classList.remove("active"));
  
        // Add the active class to the clicked icon
        icon.classList.add("active");
  
        // Update the mobile preview image
        const newImage = icon.getAttribute("data-image");
        previewImage.src = newImage;
      });
    });
  });
  
  
// modal
function showModal() {
  document.getElementById('modal').style.display = 'block';
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
}

// Close modal when clicking outside the modal content
window.onclick = function(event) {
  if (event.target == document.getElementById('modal')) {
    closeModal();
  }
}

