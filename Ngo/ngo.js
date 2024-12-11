import { Fetch } from "../FetchData.js";

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
  try {
    await Promise.all([loadHTML("../nav/nav.html", "header")]);
    console.log("All HTML files loaded successfully.");

    const loginButton = document.querySelector("#loginBtn");
    if (loginButton) {
      loginButton.addEventListener("click", () => {
        window.location.href = "../login/login.html";
      });
    }

    // Assuming this script is in the main file where you want to load the footer
    fetch("../Footer/footer.html")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch footer");
        return response.text();
      })
      .then((data) => {
        document.querySelector(".footer").innerHTML = data;
      })
      .catch((error) => console.error("Error loading footer:", error));
  } catch (error) {
    console.error("Error loading HTML files:", error);
  }
});
