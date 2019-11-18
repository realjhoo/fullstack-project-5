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
        // let employee_image = employee_data.results[i].picture.large;
        // let employee_firstName = employee_data.results[i].name.first;
        let employee_lastName = employee_data.results[i].name.last;
        let employee_email = employee_data.results[i].email;
        let employee_city = employee_data.results[i].location.city;
        // data for modal card
        let employee_cell = employee_data.results[i].cell;
        let employee_street_number =
          employee_data.results[i].location.street.number;
        let employee_street = employee_data.results[i].location.street.name;

        let employee_state = employee_data.results[i].location.state;
        let employee_postalcode = employee_data.results[i].location.postcode;
        // birthday delivers yyyy-mm-ddThh:mm:ss.xxxZ
        let employee_birthday = employee_data.results[i].dob.date;
        let employee_index = i;
        /*
        employee_birthday = parseBirthday(employee_birthday);
          */
        //log stuff

        // create employee data object to pass data
        let employeeData = [
          {
            // image: employee_image,
            image: employee_data.results[i].picture.large,
            // name: employee_firstName + " " + employee_lastName,
            name: employee_data.results[i].name.first,

            email: employee_email,
            city: employee_city,
            // address: employee_city + ", " + employee_state,
            cell: employee_cell,
            fullAddress:
              employee_street_number +
              " " +
              employee_street +
              " " +
              employee_city +
              ", " +
              employee_state +
              " " +
              employee_postalcode,
            birthday: employee_birthday,
            index: employee_index
          }
        ];
        showCard(employeeData);
      }
    });
}

// ========================================================
function showCard(employeeData) {
  const cardContainer = document.getElementById("gallery");

  // card data
  let employee_image = employeeData[0].image;
  let employee_name = employeeData[0].name;
  let employee_email = employeeData[0].email;
  let employee_city = employeeData[0].city;
  // let employee_address = employeeData[0].address;
  // modal card data
  let employee_cell = employeeData[0].cell;
  let employee_full_address = employeeData[0].fullAddress;
  let employee_birthday = employeeData[0].birthday;
  let employee_index = employeeData[0].index;

  // create the markup and drop in the variables
  let cardMarkup = `<div class="card">
                      <div class="card-img-container">
                        <img class="card-img" src=${employee_image} alt="profile picture">
                      </div>
                      <div class="card-info-container">
                        <h3 id="name" class="card-name cap">${employee_name}</h3>
                        <p class="card-text card-email">${employee_email}</p>
                        <p class="card-text card-city cap">${employee_city}</p>
                      </div>
                      <div class="card-data-container">
                        <span class="card-cell">${employee_cell}</span>
                        <span class="card-address">${employee_full_address}</span>
                        <span class="card-birthday">${employee_birthday}</span>
                        <span class="card-index">${employee_index}</span>
                      </div>
                  </div>`;

  // insert in DOM
  cardContainer.insertAdjacentHTML("beforeend", cardMarkup);
}

// ========================================================
function showSearchBox() {
  // create the search box
  const searchMarkup = ` <form action="#" method="get">
                            <input type="search" id="search-input" class="search-input" placeholder="Search...">
                            <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
                        </form>`;

  const searchContainer = document.getElementsByClassName("search-container");

  searchContainer[0].innerHTML = searchMarkup;
}

// ************** MODAL ***********************************
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
             </div>
         </div>
         <div class="modal-btn-container">
             <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
             <button type="button" id="modal-next" class="modal-next btn">Next</button>
         </div>`;

  // place markup in DOM
  modalContainer.insertAdjacentHTML("beforeend", modalMarkup);

  // activate close button listener
  modalCloseListener();

  // show modal
  document.querySelector(".modal-container").style.display = "block";
}

// ************* EVENT LISTENERS **************************
// ========================================================
function activateCardListener() {
  document.addEventListener("click", event => {
    if (event.target.className === "card") {
      createModalCard(event);
    }

    if (
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
  const modalContainer = document.querySelector(".modal-container");
  document.querySelector(".modal-close-btn").addEventListener("click", () => {
    document.querySelector(".modal-container").style.display = "none";
    modalContainer.innerHTML = "";
  });
}

// ========================================================
function main() {
  showSearchBox();
  getAPIdata();
  createModalContainer();
  activateCardListener();
}

// --------------------------------------------------------
main();
