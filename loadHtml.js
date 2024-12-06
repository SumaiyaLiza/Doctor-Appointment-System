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
