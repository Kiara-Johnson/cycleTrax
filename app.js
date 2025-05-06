// create constants for the form and form controls
const newCycleFormEl = document.getElementsByTagName("form")[0];
const startDateInputEl = document.getElementById("start-date");
const endDateInputEl = document.getElementById("end-date");
const pastCycleContainer = document.getElementById("past-cycles");
const STORAGE_KEY = "cycle-tracker";

// Form Submission Event Listener
newCycleFormEl.addEventListener("submit", (event) => {
  // prevent form from submitting to server since everything is client-side
  event.preventDefault();
  // get start and end date from form
  const startDate = startDateInputEl.value;
  const endDate = endDateInputEl.value;
  //check validity of dates
  if (checkDatesInvalid(startDate, endDate)) {
    //if dates not valid, exit
    return;
  }
  //store new cycle in client-side storage
  storeNewCycle(startDate, endDate);
  //refresh UI
  renderPastCycles();
  //reset form
  newCycleFormEl.reset();
});

function checkDatesInvalid(startDate, endDate) {
  //check that end date is after start date and neither is null
  if (!startDate || !endDate || startDate > endDate) {
    newCycleFormEl.reset();
    return true;
  }
  return false;
}

function storeNewCycle(startDate, endDate) {
  //get data from storage
  const cycles = getAllStoredCycles();
  //add new cycle to data
  cycles.push({ startDate, endDate });
  //sorts the array by start date from newest to oldest
  cycles.sort((a, b) => {
    return new Date(b.startDate) - new Date(a.startDate);
  });
  //stores the updated array back in local storage
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cycles));
}

function getAllStoredCycles() {
  //gets the string of cycle data from local storage
  const data = window.localStorage.getItem(STORAGE_KEY);
  //defaults to an empty array or returns the parsed JSON
  const cycles = data ? JSON.parse(data) : [];
  console.dir(cycles);
  console.log(cycles);
  return cycles;
}

function renderPastCycles() {
  //get the parsed cycles or the empty array
  const cycles = getAllStoredCycles();
  //exit if there are no cycles
  if (periods.length === 0) {
    return;
  }
  //clear the list of past cycles to re-render it
  pastCycleContainer.textContent = "";
  //create past cycles header
  const pastCycleHeader = document.createElement("h2");
  pastCycleHeader.textContent = "Past Cycles";
  //create past cycles list (ul)
  const pastCycleList = document.createElement("ul");
  //create individual list items (li)
  cycles.forEach((cycle) => {
    const cycleEl = document.createElement("li");
    cycleEl.textContent =
      "From ${formatDate(cycle.startDate,)} to ${formatDate(cycle.endDate)}";
    pastCycleList.appendChild(cycleEl);
  });
  pastCycleContainer.appendChild(pastCycleHeader);
  pastCycleContainer.appendChild(pastCycleList);
}
function formatDate(dateString) {
  //convert date string into date object
  const date = new Date(dateString);
  //format the date to local time
  return date.toLocaleDateString("en-us", { timeZone: "MDT" });
}
renderPastCycles();
