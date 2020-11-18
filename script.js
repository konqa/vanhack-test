const events = [
  {
    id: 435,
    title: "MeetUp",
    date: "26 November 2020",
    description: "text text",
    image: "https://code-trials.s3.us-east-2.amazonaws.com/vh/meetup.jpg",
    status: "free",
  },
  {
    id: 420,
    title: "Leap Recruiting Mission",
    date: "29 November 2020",
    description: "text text",
    image: "https://code-trials.s3.us-east-2.amazonaws.com/vh/meetup.jpg",
    status: "free",
  },
  {
    id: 103,
    title: "VanHackathon",
    date: "2 December 2020",
    description: "text text",
    image: "https://code-trials.s3.us-east-2.amazonaws.com/vh/meetup.jpg",
    status: "free",
  },
  {
    id: 201,
    title: "Premium-only Webinar",
    date: "6 December 2020",
    description: "text text",
    image: "https://code-trials.s3.us-east-2.amazonaws.com/vh/meetup.jpg",
    status: "premium",
  },
  {
    id: 88,
    title: "Open Webinar",
    date: "15 December 2020",
    description: "text text",
    image: "https://code-trials.s3.us-east-2.amazonaws.com/vh/meetup.jpg",
    status: "free",
  },
];

async function eventsData() {
  // load events to page

  let html = "";

  if (events.length) {
    await events.map((event, index) => {
      html = `${html} 
      <div class="event-card" style="background-image: url(${event.image}); background-size: cover">
        <div class="event-section-head">
        <div class="event-title">${event.title}</div>
<div class="event-status">
      <button class="vh-btn" onclick="apply(${event.id})" id="apply-btn-${event.id}">
          Apply to attend
      </button>
      <div class="vh-applied" id="applied-${event.id}" style="display:none">Application sent</div>

      </div>
      </div>

      <div class="event-section-footer"></div>
        <div>
          <div class="event-section-main">
              
              <div class="event-date">Date ${event.date}</div>
              <div class="event-more">${event.description}</div>
          </div>

        </div>
      </div>`;
    });
  } else {
    html = "<div>:) No VanHack events found</div>";
  }

  // add html to events-block page section
  document.querySelector(`#events-block`).innerHTML = html;
  checkAppliedEvents();
}

eventsData();

function checkAppliedEvents() {
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
}

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
  }
}
