let currentAppliedEvents = localStorage.getItem("events_applied")
  ? JSON.parse(localStorage.getItem("events_applied"))
  : [];

currentAppliedEvents.map((id) => {
  console.log(id);
  // hide apply button on specific event
  document.querySelector(`#apply-btn-${id}`).style.display = "none";

  // show applied div
  document.querySelector(`#applied-${id}`).style.display = "flex";
});

function apply(id) {
  // check events user has applied for
  let currentAppliedEvents = localStorage.getItem("events_applied")
    ? JSON.parse(localStorage.getItem("events_applied"))
    : [];

  if (!currentAppliedEvents.includes(id)) {
    // add new event ID to array
    currentAppliedEvents.push(id);

    // add to localstorage
    localStorage.setItem(
      "events_applied",
      JSON.stringify(currentAppliedEvents)
    );

    // hide apply button on specific event
    document.querySelector(`#apply-btn-${id}`).style.display = "none";

    // show applied div
    document.querySelector(`#applied-${id}`).style.display = "flex";
  } else if (currentAppliedEvents.includes(id)) {
    // hide apply button on specific event
    document.querySelector(`#apply-btn-${id}`).style.display = "none";

    // show applied div
    document.querySelector(`#applied-${id}`).style.display = "flex";
  }
}
