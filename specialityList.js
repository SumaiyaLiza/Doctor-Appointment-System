import { Fetch } from "./FetchData.js";

    // Assuming this script is in the main file where you want to load the footer
function clearCards() {
  const cardContainer = document.querySelector(".cardContainer");
  if (cardContainer) {
    cardContainer.innerHTML = ""; // Clear all child elements
  }
}

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

    checkboxFilter(doctorList);
  } catch (error) {
    console.log(error);
  }
}

function checkboxFilter(getData) {
  if (getData) {
    document.querySelectorAll("input[type='checkbox']").forEach((checkbox) => {
      checkbox.addEventListener("change", (e) => {
        const type = e.target.name;
        if (e.target.checked) {
          //*clear default load on page
          clearCards();

          switch (type) {
            case "onlinenow":
              getData.map((doctor) => {
                if (doctor.online) {
                  renderRowCards(doctor);
                }
              });
              break;
            case "nexthoursAvailable":
              getData.map((doctor) => {
                if (doctor.available_in_next_2_hours) {
                  renderRowCards(doctor);
                }
              });
              break;
            case "todayAvailable":
              getData.map((doctor) => {
                if (doctor.available_today) {
                  renderRowCards(doctor);
                }
              });
              break;
            case "female":
              getData.map((doctor) => {
                if (doctor.gender.toLowerCase() == "female") {
                  renderRowCards(doctor);
                }
              });
              break;

            case "male":
              getData.map((doctor) => {
                if (doctor.gender.toLowerCase() == "male") {
                  renderRowCards(doctor);
                }
              });
              break;

            case "default":
              getData.map((doctor) => {
                renderRowCards(doctor);
              });
              break;

            case "fees-high-to-low":
              const highTolow = sortFees(getData, "HighToLow");
              highTolow.map((doctor) => {
                renderRowCards(doctor);
              });
              break;

            case "fees-low-to-high":
              const lowToHigh = sortFees(getData, "LowToHigh");
              lowToHigh.map((doctor) => {
                renderRowCards(doctor);
              });

            default:
              break;
          }
        } else {
          clearCards();
          getData.map((doctor) => {
            renderRowCards(doctor);
          });
        }
      });
    });
  }
}

function sortFees(data, type) {
  if (type === "HighToLow") {
    return [...data].sort((a, b) => b.fee.amount - a.fee.amount);
  } else if (type === "LowToHigh") {
    return [...data].sort((a, b) => a.fee.amount - b.fee.amount);
  }
  return data;
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
   <div class="cardContainer">
  <div class="card" id="${id}">
    <div class="leftSide">
      <div class="imgDiv">
        <img class="img" src="${image}" alt="${name}" />
      </div>
      <div class="doctorInfo">
        <h2>${name} <span class="status">●</span></h2>
        <p class="qualification">${qualifications}</p>
        <p class="specialties">Specialities: ${renderSpecialties(specialties)}</p>
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
          <span class="boldText">${experience}</span>
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

selectDoctorFilter();
renderRowCards();
checkboxFilter();


// Reset button functionality

