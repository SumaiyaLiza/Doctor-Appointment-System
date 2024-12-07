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

async function selectDoctorFilter() {
  //*param come's from consultation.js
  const urlParams = new URLSearchParams(window.location.search);
  const selectedDept = urlParams.get("departmentId");

  try {
    //*DoctorList
    const doctorInfoDatas = await Fetch("./doctor.json");

    let doctorList = [];

    const data = doctorInfoDatas.map((doctorInfo) => {
      doctorInfo.specialties.map((speciality) => {
        // console.log(speciality + " " + doctorInfo.name);

        if (speciality == selectedDept) {
          //*Selected Match Dept. Doctors Push In a Array
          doctorList.push(doctorInfo);
        }
      });
    });

    doctorList.map((doctor) => {
      renderRowCards(doctor);
    });
  } catch (error) {
    console.log(error);
  }
}

function renderRowCards(getdoctor) {
  if (!getdoctor) {
    console.error("Doctor data is missing.");
    return;
  }

  const {
    id,
    name,
    qualifications,
    specialties,
    working_in,
    experience,
    rating,
    fee,
    image,
  } = getdoctor;

  // Get the container to append the card
  const cardContainer = document.querySelector(".cardContainer");
  if (!cardContainer) {
    console.error("Card container not found.");
    return;
  }

  // Create card using template literals
  const cardHTML = `
    <div class="card" id="${id}">
      <div class="leftSide">
        <div class="imgDiv">
          <img src="${image}" alt="${name}" />
        </div>
        <div class="doctorInfo">
          <h2>${name}</h2>
          <p>${qualifications}</p>
          <span style="color: #d1d1d1">Specialities</span>
          <p>${renderSpecialties(specialties)}</p>
        </div>
      </div>
      <div class="middleSide flexCol">
        <div class="working">
          <p style="color: #d1d1d1">Working in</p>
          <p style="font-weight: bold; font-size: 1.1rem">${working_in}</p>
        </div>
        <div class="exprerienceRating">
          <div class="exprerience flexCol">
            <span>Total Experience</span>
            <span style="font-weight: bold">${experience}</span>
          </div>
          <div class="exprerience flexCol">
            <span>Total Rating</span>
            <div class="rating">
              ${renderStars(rating.total_stars, rating.given_stars)}
            </div>
          </div>
        </div>
      </div>
      <div class="fee flexCenter">
        <div class="FeeTexts flexCenter flexCol">
          <p>
            <span
              class="feeTextSize"
              style="font-size: 40px; font-weight: bold"
            >
              &#2547; ${fee.amount}
            </span>
            <sub>(${fee.details})</sub>
          </p>
          <span>${fee.per_consultation ? "Per consultation" : ""}</span>
        </div>
      </div>
    </div>
  `;

  // Append the card to the container
  cardContainer.insertAdjacentHTML("beforeend", cardHTML);
}

// Helper function to render stars
function renderStars(totalStars, givenStars) {
  const fullStars = Math.floor(givenStars);
  const emptyStars = totalStars - fullStars;

  return (
    `${'<span class="fa fa-star checked"></span>'.repeat(fullStars)}` +
    `${'<span class="fa fa-star"></span>'.repeat(emptyStars)}`
  );
}

// Helper function to render specialties
function renderSpecialties(specialties) {
  // Mock specialties mapping
  const specialtiesMap = {
    1: "General Physician",
    2: "Pediatric Hematologist and Oncologist",
  };

  return specialties
    .map((specialtyId) => specialtiesMap[specialtyId])
    .join(", ");
}

function handleCheckboxChange(event,name) {
  console.log("dkfj");
}

selectDoctorFilter();
renderRowCards();

