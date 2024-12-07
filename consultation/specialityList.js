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
  } catch (error) {
    console.error("Error loading HTML files:", error);
  }
});

function doubleInputField() {
  let sliderOne = document.getElementById("slider-1");
  let sliderTwo = document.getElementById("slider-2");
  let displayValOne = document.getElementById("range1");
  let displayValTwo = document.getElementById("range2");
  let minGap = 0;
  let sliderTrack = document.querySelector(".slider-track");
  let sliderMaxValue = document.getElementById("slider-1").max;

  function slideOne() {
    if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
      sliderOne.value = parseInt(sliderTwo.value) - minGap;
    }
    displayValOne.textContent = sliderOne.value;
    fillColor();
  }
  function slideTwo() {
    if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
      sliderTwo.value = parseInt(sliderOne.value) + minGap;
    }
    displayValTwo.textContent = sliderTwo.value;
    fillColor();
  }
  function fillColor() {
    percent1 = (sliderOne.value / sliderMaxValue) * 100;
    percent2 = (sliderTwo.value / sliderMaxValue) * 100;
    sliderTrack.style.background = `linear-gradient(to right, #dadae5 ${percent1}% , #3264fe ${percent1}% , #3264fe ${percent2}%, #dadae5 ${percent2}%)`;
  }
  window.onload = function () {
    slideOne();
    slideTwo();
  };
}

async function selectDoctorFilter() {
  const urlParams = new URLSearchParams(window.location.search);
  const selectedDept = urlParams.get("departmentId");

  try {
    const doctorInfoDatas = await Fetch("./doctor.json");

    let doctorList = [];

    const data = doctorInfoDatas.map((doctorInfo) => {
      doctorInfo.specialties.map((speciality) => {
        // console.log(speciality + " " + doctorInfo.name);

        if (speciality == selectedDept) {
          doctorList.push(doctorInfo);
        }
      });
    });

    console.log(doctorList);
  } catch (error) {
    console.log(error);
  }
}

window.onload = () => {
  selectDoctorFilter();
  doubleInputField();
};
