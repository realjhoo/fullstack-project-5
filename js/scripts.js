// Global Variables
const numberOfEmployees = 12;

// ========================================================
function getAPIdata() {
  const api =
    "https://randomuser.me/api/?results=12&nat=au,br,ca,ch,de,dk,es,fi,fr,gb,ie,no,nl,nz,us";

  fetch(api)
    .then(employee_data => {
      return employee_data.json();
    })
    .then(employee_data => {
      for (let i = 0; i < numberOfEmployees; i++) {
        // create employee data object to pass data
        let employeeData = [
          {
            image: employee_data.results[i].picture.large,
            name:
              employee_data.results[i].name.first +
              " " +
              employee_data.results[i].name.last,
            email: employee_data.results[i].email,
            city: employee_data.results[i].location.city,
            // data for modal card
            cell: employee_data.results[i].cell,
            address:
              employee_data.results[i].location.street.number +
              " " +
              employee_data.results[i].location.street.name +
              " " +
              employee_data.results[i].location.city +
              ", " +
              employee_data.results[i].location.state +
              " " +
              employee_data.results[i].location.postcode,
            birthday: formatBirthday(employee_data.results[i].dob.date),
            index: i
          }
        ];
        showCard(employeeData);
      }
    });
}

// ========================================================
function showSearchBox() {
  // create the search box
  const searchMarkup = ` <form action="#" method="get">
                            <input type="search" id="search-input" class="search-input" placeholder="Search...">
                            <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
                        </form>`;

  const searchContainer = document.querySelector(".search-container");
  searchContainer.innerHTML = searchMarkup;
}

// ========================================================
function showCard(employee) {
  const gallery = document.getElementById("gallery");

  // create the markup and drop in the variables
  let cardMarkup = `<div class="card">
                      <div class="card-img-container">
                        <img class="card-img" src=${employee[0].image} alt="profile picture">
                      </div>
                      <div class="card-info-container">
                        <h3 id="name" class="card-name cap">${employee[0].name}</h3>
                        <p class="card-text card-email">${employee[0].email}</p>
                        <p class="card-text card-city cap">${employee[0].city}</p>
                      </div>
                      <div class="card-data-container">
                        <span class="card-cell">${employee[0].cell}</span>
                        <span class="card-address">${employee[0].address}</span>
                        <span class="card-birthday">${employee[0].birthday}</span>
                        <span class="card-index">${employee[0].index}</span>
                      </div>
                  </div>`;

  // insert in DOM
  gallery.insertAdjacentHTML("beforeend", cardMarkup);
}

// ************** MODAL STUFF *****************************
// ========================================================
function createModalContainer() {
  const gallery = document.getElementById("gallery");

  let containerMarkup = `<div class="modal-container"></div>`;

  gallery.innerHTML = containerMarkup;
}

// ========================================================
function createModalCard(event) {
  const modalContainer = document.querySelector(".modal-container");

  // retrieve data
  let image = event.target.querySelector(".card-img").src,
    name = event.target.querySelector(".card-name").textContent,
    email = event.target.querySelector(".card-email").textContent,
    city = event.target.querySelector(".card-city").textContent,
    cell = event.target.querySelector(".card-cell").textContent,
    address = event.target.querySelector(".card-address").textContent,
    birthday = event.target.querySelector(".card-birthday").textContent,
    index = event.target.querySelector(".card-index").textContent;

  // create markup
  let modalMarkup = `
     
         <div class="modal">
             <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>+</strong></button>
             <div class="modal-info-container">
                 <img class="modal-img" src="${image}" alt="profile picture">
                 <h3 id="name" class="modal-name cap">${name}</h3>
                 <p class="modal-text">${email}</p>
                 <p class="modal-text cap">${city}</p>
                 <hr>
                 <p class="modal-text">${cell}</p>
                 <p class="modal-text">${address}</p>
                 <p class="modal-text">Birthday: ${birthday}</p>
                 <p class="modal-index">${index}</p>
             </div>
         </div>
         <div class="modal-btn-container">
             <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
             <button type="button" id="modal-next" class="modal-next btn">Next</button>
         </div>`;

  // place markup in DOM
  modalContainer.insertAdjacentHTML("beforeend", modalMarkup);

  // activate modal listeners
  modalPrevListener();
  modalNextListener();
  modalCloseListener();

  // show modal box
  document.querySelector(".modal-container").style.display = "block";
}

// ************* EVENT LISTENERS **************************
// ========================================================
function cardListener() {
  document.addEventListener("click", event => {
    if (event.target.className === "card") {
      createModalCard(event);
    } else if (
      event.target.className === "card-name cap" ||
      event.target.className === "card-img" ||
      event.target.className === "card-text card-email" ||
      event.target.className === "card-text card-city cap"
    ) {
      event.target.parentNode.parentNode.click();
    }
  });
}

// ========================================================
function modalCloseListener() {
  // event handler for modal clase
  const modalContainer = document.querySelector(".modal-container");
  document.querySelector(".modal-close-btn").addEventListener("click", () => {
    document.querySelector(".modal-container").style.display = "none";
    // destroys modal card to prevent multiple modals in markup
    modalContainer.innerHTML = "";
  });
}

// ========================================================
function modalPrevListener() {
  // decrements to the previous card
  const modalContainer = document.querySelector(".modal-container");

  document.getElementById("modal-prev").addEventListener("click", () => {
    let index = parseInt(document.querySelector(".modal-index").innerText);

    if (index === 0) {
      index = 11;
    } else {
      index--;
    }

    const cards = document.querySelectorAll(".card");
    let card = cards[index];
    modalContainer.innerHTML = "";
    card.click();
  });
}

// ========================================================
function modalNextListener() {
  // increments to the previous card
  const modalContainer = document.querySelector(".modal-container");

  document.getElementById("modal-next").addEventListener("click", () => {
    let index = parseInt(document.querySelector(".modal-index").innerText);

    if (index === 11) {
      index = 0;
    } else {
      index++;
    }

    const cards = document.querySelectorAll(".card");
    let card = cards[index];
    modalContainer.innerHTML = "";
    card.click();
  });
}

// ========================================================
function liveSearchListener() {
  document.getElementById("search-input").addEventListener("keyup", () => {
    const card = document.querySelectorAll(".card");
    let searchString = document
      .getElementById("search-input")
      .value.toLowerCase();

    for (let i = 0; i < card.length; i++) {
      let name = card[
        i
      ].firstChild.nextSibling.nextSibling.nextSibling.firstChild.nextSibling.innerText.toLowerCase();

      let isin = name.includes(searchString);
      console.log(isin);

      if (isin) {
        card[i].style.display = "flex";
        // card[i].style.backgroundColor = "red";
      } else {
        card[i].style.display = "none";
        // card[i].style.backgroundColor = "blue";
      }
    }
  });
}

// ********************* HELPER FUNCTIONS ******************
// ========================================================
function formatBirthday(birthday) {
  // api delivers birthday in format yyyy-mm-ddThh:mm:ss.xxxZ
  // reformat birthday
  let fix = new Date(birthday),
    month = fix.getMonth(),
    date = fix.getDate(),
    year = fix.getYear();

  if (month === 0) {
    month++;
  }

  let fixedBirthday = month + "/" + date + "/" + year;
  return fixedBirthday;
}

// ********************** MAIN ****************************
// ========================================================
function main() {
  getAPIdata();
  showSearchBox();
  createModalContainer();
  cardListener();
  liveSearchListener();
}

// --------------------------------------------------------
main();
