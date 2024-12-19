import { Fetch } from "./FetchData.js";

// Function to clear the card container
function clearCards() {
  const cardContainer = document.querySelector(".cardContainer");
  if (cardContainer) {
    cardContainer.innerHTML = ""; // Clear all child elements
  }
}

// Main function to fetch and filter doctors
async function selectDoctorFilter() {
  const urlParams = new URLSearchParams(window.location.search);
  const selectedDept = urlParams.get("departmentId");

  try {
    // Fetch doctor data
    const doctorInfoDatas = await Fetch("./doctor.json");
    let doctorList = [];

    // Filter based on selected department
    doctorInfoDatas.forEach((doctorInfo) => {
      doctorInfo.specialties.forEach((speciality) => {
        if (speciality == selectedDept) {
          doctorList.push(doctorInfo);
        }
      });
    });

    // Render doctors and apply filters/sorting
    renderDoctors(doctorList);
    checkboxFilter(doctorList);
    radioSortFilter(doctorList); // Add sorting radio event listener
  } catch (error) {
    console.log(error);
  }
}

// Function to apply sorting filter using radio buttons
function radioSortFilter(doctorList) {
  const sortOptions = document.querySelectorAll("input[name='sort']");
  sortOptions.forEach((radio) => {
    radio.addEventListener("change", (e) => {
      const sortType = e.target.getAttribute("data-sort");
      let sortedList;

      // Perform sorting based on the selected sort type
      switch (sortType) {
        case "fees-low-to-high":
          sortedList = sortFees(doctorList, "LowToHigh");
          break;
        case "fees-high-to-low":
          sortedList = sortFees(doctorList, "HighToLow");
          break;
        case "rating":
          sortedList = sortRating(doctorList);
          break;
        case "experience":
          sortedList = sortExperience(doctorList);
          break;
        default:
          sortedList = doctorList; // Default to original list
          break;
      }

      clearCards();
      renderDoctors(sortedList); // Re-render sorted doctors
    });
  });
}

// Function to filter data using checkboxes
function checkboxFilter(getData) {
  document.querySelectorAll("input[type='checkbox']").forEach((checkbox) => {
    checkbox.addEventListener("change", (e) => {
      const type = e.target.name;
      const isChecked = e.target.checked;

      console.log(`Checkbox changed: ${type}, Checked: ${isChecked}`);

      // Clear previous results
      clearCards();

      let filteredList = [];

      if (isChecked) {
        // Apply filtering based on checkbox selection
        switch (type) {
          case "online":
            filteredList = getData.filter((doctor) => doctor.online);
            break;
          case "nexthoursAvailable":
            filteredList = getData.filter((doctor) => doctor.available_in_next_2_hours);
            break;
          case "todayAvailable":
            filteredList = getData.filter((doctor) => doctor.available_today);
            break;
          case "female":
            filteredList = getData.filter((doctor) => doctor.gender.toLowerCase() == "female");
            break;
          case "male":
            filteredList = getData.filter((doctor) => doctor.gender.toLowerCase() == "male");
            break;
          default:
            filteredList = getData; // Default to original data if no checkbox is selected
            break;
        }
      } else {
        // If no checkbox is selected, render all doctors
        filteredList = getData;
      }

      // Log the filtered list to check if the filter works
      console.log(filteredList);

      // Render filtered data
      renderDoctors(filteredList);
    });
  });
}

// Sorting functions for different criteria
function sortFees(data, type) {
  if (type === "HighToLow") {
    return [...data].sort((a, b) => b.fee.amount - a.fee.amount);
  } else if (type === "LowToHigh") {
    return [...data].sort((a, b) => a.fee.amount - b.fee.amount);
  }
  return data;
}

function sortRating(data) {
  return [...data].sort((a, b) => {
    return b.rating.given_stars - a.rating.given_stars; // Ensure it's numerical comparison
  });
}

function sortExperience(data) {
  return [...data].sort((a, b) => {
    return b.experience - a.experience; // Ensure it's numerical comparison
  });
}

// Function to render doctors list
function renderDoctors(doctorList) {
  clearCards();
  doctorList.forEach((doctor) => renderRowCards(doctor));
}

// Helper function to render individual doctor card
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
          <img class="img" src="${image}" alt="${name}" />
        </div>
        <div class="doctorInfo">
          <h2>${name} <span class="status">●</span></h2>
          <p class="qualification">${qualifications}</p>
          <p class="specialties">Specialties: ${renderSpecialties(specialties)}</p>
        </div>
      </div>
      <div class="middleSide">
        <div class="working">
          <p class="sectionLabel">Working in</p>
          <p class="boldText">${working_in}</p>
        </div>
        <div class="experienceRating">
          <div class="experience">
            <span>Total Experience</span>
            <span class="boldText">${experience}+ years</span>
          </div>
          <div class="rating">
            <span>Total Rating</span>
            ${renderStars(rating.total_stars, rating.given_stars)}
          </div>
        </div>
      </div>
      <div class="rightSide">
        <div class="fee">
          <p class="feeAmount">&#2547; ${fee.amount} <sub>(incl. VAT)</sub></p>
          <p class="perConsultation">Per consultation</p>
        </div>
      </div>
    </div>
  `;

  // Append the card to the container
  cardContainer.insertAdjacentHTML("beforeend", cardHTML);
}

// Helper function to render stars
function renderStars(totalStars, givenStars) {
  // Ensure givenStars is within a valid range (0 - totalStars)
  givenStars = Math.min(Math.max(givenStars, 0), totalStars);
  const fullStars = Math.floor(givenStars); // Number of filled stars
  const emptyStars = totalStars - fullStars; // Number of empty stars

  return (
    `${'<span class="fa fa-star checked"></span>'.repeat(fullStars)}` +
    `${'<span class="fa fa-star"></span>'.repeat(emptyStars)}`
  );
}

// Helper function to render specialties
function renderSpecialties(specialties) {
  const specialtiesMap = {
    1: "General Physician",
    2: "Pediatric Hematologist and Oncologist",
    // Add more specialty mappings as needed
  };

  return specialties
    .map((specialtyId) => specialtiesMap[specialtyId] || "Unknown Specialty")
    .join(", ");
}

// Invoke the main filtering function
selectDoctorFilter();
