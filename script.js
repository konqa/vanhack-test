const events = [
  {
    id: 435,
    title: "MeetUp",
    date: "26 November 2020",
    description:
      "Since we have a limited seat number, we need to make a selection of people who apply. To know more about the people attending to match the vacancies better to the Recruiting Fair, you’ll need to create and fill out your VanHack Profile. You’ll receive further instructions on your email. So, Recife, let’s rock this Meetup?",
    image: "https://code-trials.s3.us-east-2.amazonaws.com/vh/1.jpg",
    status: "free",
  },
  {
    id: 420,
    title: "Leap Recruiting Mission",
    date: "29 November 2020",
    description:
      "Select from 100+ Senior Developers to help fuel your growth. VanHack is bringing some of the best developers Africa who want to relocate for a weekend-long recruiting fair in Johannesburg.",
    image: "https://code-trials.s3.us-east-2.amazonaws.com/vh/2.jpg",
    status: "free",
  },
  {
    id: 103,
    title: "VanHackathon",
    date: "2 December 2020",
    description:
      "The goal of the event is to connect you with Canadian companies that are open to hiring from abroad. We’re creating a virtual environment for you to connect with companies and impress them with your work ethic. Companies will share challenges that test the skills they are looking to hire for. There will be many skills companies are hiring for such as Frontend (React, Node, Angular), Backend and QA.",
    image: "https://code-trials.s3.us-east-2.amazonaws.com/vh/3.jpg",
    status: "free",
  },
  {
    id: 201,
    title: "Premium&#45;only Webinar",
    date: "6 December 2020",
    description:
      "Karan Dhani and Melissa Arrambide, immigration consultants at VanHack, will demystify the Canadian Work Visa Process. Do not miss it",
    image: "https://code-trials.s3.us-east-2.amazonaws.com/vh/4.jpg",
    status: "premium",
  },
  {
    id: 88,
    title: "Open Webinar",
    date: "15 December 2020",
    description:
      "Webinar: How to get a Remote Job in Canada! Learn how you can start working in Canada before arriving in the maple country.",
    image: "https://code-trials.s3.us-east-2.amazonaws.com/vh/5.jpg",
    status: "free",
  },
];

async function eventsData() {
  // load events to page

  let html = "";

  if (events.length) {
    await events.map((event, index) => {
      html = `${html} 
      <div class="event-card" style="background-image: url(${
        event.image
      }); background-size: cover">
        <div class="event-section-head">
          <div class="event-title">${event.title}</div>
          <div class="event-status">
            <button class="event-btn" onclick="apply('${event.id}','${
        event.status
      }')" id="apply-btn-${event.id}" style="border:${
        event.status === "premium" ? "2px solid #FF9F00" : "1px solid #211C3F"
      }">
      ${event.status === "premium" ? "APPLY AS MEMBER" : "Apply to attend"}
            </button>
            <div id="applied-${event.id}" style="display: none">
              Application sent
            </div>
          </div>
        </div>

        <div class="event-section-main">
          <div class="event-date">${event.date}</div>
          <div style="cursor: pointer" onclick="shareLink('${event.title}','${
        event.id
      }',)
          "><img src="https://code-trials.s3.us-east-2.amazonaws.com/vh/twitter.svg" alt="Tweet" width="20" /></div>
          <button class="event-btn read-more" onclick="read(${
            event.id
          })" id="read-more-btn-${event.id}">
            More info
          </button>
        </div>
          
        <div class="event-section-footer" id="footer-${event.id}">
          <div class="event-more" id="read-more-${
            event.id
          }" style="display: none">${event.description}
        </div>

          <div class="event-more" id="read-more-premium-${
            event.id
          }" style="display: none">
          <button onclick=openUrl('https://vanhack.com/premium') class='premium-btn'>Buy a Membership Plan Now</button>
          <p>Get exciting information that's not publicly available and access specific channels.</p>
          </div>

        </div>  
      </div>
    </div>`;
    });
  } else {
    html = "<div>:( No VanHack events found</div>";
  }

  // add html to events-block page section
  document.querySelector(`#events-block`).innerHTML = html;
  checkAppliedEvents();
}

eventsData();

function read(id, status) {
  let element = document.querySelector(`#read-more-${id}`).style;
  let elementPremium = document.querySelector(`#read-more-premium-${id}`).style;
  let btn = document.querySelector(`#read-more-btn-${id}`);
  let footer = document.querySelector(`#footer-${id}`).style;

  if (element.display === "none") {
    if (elementPremium.display === "flex") {
      elementPremium.display = "none";
      footer.backgroundColor = "transparent";
    } else if (status === "premium") {
      footer.backgroundColor = "#ff9f00";
      // show specific event read more text
      elementPremium.display = "flex";
      element.display = "none";
    } else {
      // show specific event read more text
      element.display = "flex";
      elementPremium.display = "none";
      // change text on button
      btn.innerText = "Less info";
      // make text background dark blue
      footer.backgroundColor = "#211c3f";
    }
  } else if (element.display === "flex") {
    if (status === "premium") {
      footer.backgroundColor = "#ff9f00";
      // show specific event read more text
      elementPremium.display = "flex";
      element.display = "none";
    } else {
      elementPremium.display = "none";
      element.display = "none";
      footer.backgroundColor = "transparent";
      btn.innerText = "More info";
    }
  }
}

function openUrl(url) {
  window.open(url);
}

function shareLink(title, id) {
  // send fake url to twitter with event title and event id
  openUrl(
    `https://twitter.com/intent/tweet?url=https://vanhack.com/${id}&text=${title}`
  );
}

function checkAppliedEvents() {
  let currentAppliedEvents = localStorage.getItem("events_applied")
    ? JSON.parse(localStorage.getItem("events_applied"))
    : [];

  currentAppliedEvents.map((id) => {
    // hide apply button on specific event
    document.querySelector(`#apply-btn-${id}`).style.display = "none";

    // show applied div
    document.querySelector(`#applied-${id}`).style.display = "flex";
  });
}

function apply(id, status) {
  if (status === "premium") {
    read(id, status);
    return;
  }

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
