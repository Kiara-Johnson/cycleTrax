// create constants for the form and form controls
const newPeriodFormEl = document.getElementsByTagName("form") [0];
const startDateInputEl = document.getElementById("start-date");
const endDateInputEl = document.getElementById("end-date");

// Form Submission Event Listener
newPeriodFormEl.addEventListener("submit", (event) => {
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
    //store new period in client-side storage 
    storeNewPeriod(startDate, endDate);
    //refresh UI
    renderPastPeriods();
    //reset form
    newPeriodFormEl.reset();
});

function checkDatesInvalid(startDate, endDate) {
    //check that end date is after start date and neither is null
    if (!startDate || !endDate || startDate>endDate) {
        newPeriodFormEl.reset();
        return true;
    } 
    //else
    return false;
}