async function loadHTML(filePath, targetElementId) {
    try {
      const response = await fetch(filePath);
      if (!response.ok) throw new Error(`Failed to load ${filePath}: ${response.statusText}`);
      const htmlContent = await response.text();
      document.getElementById(targetElementId).innerHTML = htmlContent;
    } catch (error) {
      console.error(error);
    }
  }
  
  // Load the HTML files when the page loads
  document.addEventListener('DOMContentLoaded', async function () {
    const loader = document.getElementById('loader');
    loader.style.display = 'block'; // Show the loader
  
    try {
      // Load the content into the respective containers
      await Promise.all([
        loadHTML('nav.html', 'header'),
      ]);
      console.log('All HTML files loaded successfully.');
    } catch (error) {
      console.error('Error loading HTML files:', error);
    } finally {
      loader.style.display = 'none'; // Hide the loader after all content is loaded
    }
  });
  