function apply(id) {
  // check events user has applied for
  let currentEvents = localStorage.getItem("events_applied")
    ? JSON.parse(localStorage.getItem("events_applied"))
    : [];

  if (!currentEvents.includes(id)) {
    // add new event ID to array
    currentEvents.push(id);

    // add to localstorage
    localStorage.setItem("events_applied", JSON.stringify(currentEvents));
  }
}
