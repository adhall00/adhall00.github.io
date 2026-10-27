// Preserve links to the original single-page tabs, including browser history.
function followLegacyTabLink() {
  const routes = {
    about: 'index.html', baking: 'baking.html', triathlon: 'triathlon.html',
    publications: 'publications.html', resume: 'resume.html', gallery: 'gallery.html',
    'fu-liou': 'learn/fu-liou.html', learn: 'learn.html'
  };
  const filename = window.location.pathname.split('/').pop();
  if (filename && filename !== 'index.html') return;
  const destination = routes[window.location.hash.slice(1)];
  if (destination) window.location.replace(new URL(destination, window.location.href));
}
followLegacyTabLink();
window.addEventListener('hashchange', followLegacyTabLink);

// ============================================================
// CLOUD BOUNCING ANIMATION
// ============================================================

const clouds =
  document.querySelectorAll(".cloud");


clouds.forEach((cloud) => {

  let x =
    cloud.offsetLeft;

  let y =
    cloud.offsetTop;


  let dx =
    (Math.random() * 1.2 + 0.4) *
    (
      Math.random() < 0.5
        ? 1
        : -1
    );


  let dy =
    (Math.random() * 1.2 + 0.4) *
    (
      Math.random() < 0.5
        ? 1
        : -1
    );


  function animate() {

    const rect =
      cloud.getBoundingClientRect();


    const maxX =
      window.innerWidth -
      rect.width;


    const maxY =
      window.innerHeight -
      rect.height;


    x += dx;
    y += dy;


    if (
      x <= 0 ||
      x >= maxX
    ) {

      dx *= -1;

    }


    if (
      y <= 0 ||
      y >= maxY
    ) {

      dy *= -1;

    }


    cloud.style.left =
      `${x}px`;


    cloud.style.top =
      `${y}px`;


    requestAnimationFrame(
      animate
    );

  }


  animate();

});


// ============================================================
// RACE COUNTDOWN
// ============================================================

// JavaScript months start at zero:
// 6 = July
const raceDate =
  new Date(
    2026,
    6,
    19
  );


function updateRaceCountdown() {

  const today =
    new Date();


  today.setHours(
    0,
    0,
    0,
    0
  );


  const race =
    new Date(
      raceDate
    );


  race.setHours(
    0,
    0,
    0,
    0
  );


  const diffTime =
    race -
    today;


  const diffDays =
    Math.ceil(
      diffTime /
      (
        1000 *
        60 *
        60 *
        24
      )
    );


  const countdownText =
    document.getElementById(
      "countdown-text"
    );


  if (!countdownText) {
    return;
  }


  if (diffDays > 1) {

    countdownText.textContent =
      `${diffDays} days until race day!`;

  }

  else if (diffDays === 1) {

    countdownText.textContent =
      "1 day until race day!";

  }

  else if (diffDays === 0) {

    countdownText.textContent =
      "Race day is today!";

  }

  else {

    countdownText.textContent =
      "Race day has passed — you did it!";

  }

}


// ============================================================
// AUTOMATIC CURRENT-MONTH CALENDAR
// ============================================================

function buildCalendar() {

  const calendar =
    document.getElementById(
      "calendar"
    );


  const calendarMonth =
    document.getElementById(
      "calendar-month"
    );


  if (
    !calendar ||
    !calendarMonth
  ) {

    return;

  }


  calendar.innerHTML = "";


  const today =
    new Date();


  const currentYear =
    today.getFullYear();


  const currentMonth =
    today.getMonth();


  const monthNames = [

    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"

  ];


  calendarMonth.textContent =
    `${monthNames[currentMonth]} ${currentYear}`;


  const firstDay =
    new Date(
      currentYear,
      currentMonth,
      1
    ).getDay();


  const daysInMonth =
    new Date(
      currentYear,
      currentMonth + 1,
      0
    ).getDate();


  // ----------------------------------------------------------
  // Blank cells before first day of month
  // ----------------------------------------------------------

  for (
    let i = 0;
    i < firstDay;
    i++
  ) {

    const emptyCell =
      document.createElement(
        "div"
      );


    emptyCell.classList.add(
      "calendar-day",
      "empty"
    );


    calendar.appendChild(
      emptyCell
    );

  }


  // ----------------------------------------------------------
  // Actual calendar days
  // ----------------------------------------------------------

  for (
    let day = 1;
    day <= daysInMonth;
    day++
  ) {

    const dayCell =
      document.createElement(
        "div"
      );


    dayCell.classList.add(
      "calendar-day"
    );


    dayCell.textContent =
      day;


    const isToday =

      day === today.getDate() &&

      currentMonth ===
        today.getMonth() &&

      currentYear ===
        today.getFullYear();


    const isRaceDay =

      day ===
        raceDate.getDate() &&

      currentMonth ===
        raceDate.getMonth() &&

      currentYear ===
        raceDate.getFullYear();


    if (isToday) {

      dayCell.classList.add(
        "today"
      );

    }


    if (isRaceDay) {

      dayCell.classList.add(
        "race-day"
      );

    }


    calendar.appendChild(
      dayCell
    );

  }

}


// ============================================================
// BAKING FLIP CARDS
// ============================================================

document
  .querySelectorAll(
    ".flip-card"
  )
  .forEach((card) => {

    card.addEventListener(
      "click",
      () => {

        const isFlipped =
          card.classList.toggle(
            "is-flipped"
          );


        card.setAttribute(
          "aria-pressed",
          String(
            isFlipped
          )
        );

      }
    );

  });


// ============================================================
// INITIALIZE PAGE FEATURES
// ============================================================

updateRaceCountdown();

buildCalendar();

