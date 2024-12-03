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
  
  document.addEventListener('DOMContentLoaded', async () => {
    const loader = document.getElementById('loader');
    loader.style.display = 'block';
  
    const files = [
      { filePath: 'nav.html', targetElementId: 'header' },
    ];
  
    try {
      await Promise.all(files.map(file => loadHTML(file.filePath, file.targetElementId)));
      console.log('All HTML files loaded successfully.');
    } catch (error) {
      console.error('Error loading HTML files:', error);
    } finally {
      loader.style.display = 'none';
    }
  });
  