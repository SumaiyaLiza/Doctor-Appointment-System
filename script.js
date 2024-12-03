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
  loader.style.display = "block"; // Show the loader

  try {
    await Promise.all([
      loadHTML("nav.html", "header"),
    ]);
    console.log("All HTML files loaded successfully.");

    // Add event listener to the dynamically loaded button
    const loginButton = document.querySelector("#loginBtn");
    if (loginButton) {
      loginButton.addEventListener("click", () => {
        window.location.href = "login.html";
      });
    }
  } catch (error) {
    console.error("Error loading HTML files:", error);
  } finally {
    loader.style.display = "none";
  }
});
