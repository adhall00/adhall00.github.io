function showTab(tabId) {
  const contents = document.querySelectorAll(".tab-content");
  const buttons = document.querySelectorAll(".tab-button");

  contents.forEach(content => content.classList.remove("active"));
  buttons.forEach(button => button.classList.remove("active"));

  document.getElementById(tabId).classList.add("active");

  const clickedButton = [...buttons].find(btn => btn.textContent.replace(/\s+/g, " ").includes(
    document.getElementById(tabId).querySelector("h2").textContent.split("/")[0].trim()
  ));

  if (clickedButton) {
    clickedButton.classList.add("active");
  }
}

// Better button activation
document.querySelectorAll(".tab-button").forEach(button => {
  button.addEventListener("click", function () {
    document.querySelectorAll(".tab-button").forEach(btn => btn.classList.remove("active"));
    this.classList.add("active");
  });
});

// Cloud bouncing animation
const clouds = document.querySelectorAll(".cloud");

clouds.forEach((cloud) => {
  let x = cloud.offsetLeft;
  let y = cloud.offsetTop;
  let dx = (Math.random() * 1.2 + 0.4) * (Math.random() < 0.5 ? 1 : -1);
  let dy = (Math.random() * 1.2 + 0.4) * (Math.random() < 0.5 ? 1 : -1);

  function animate() {
    const rect = cloud.getBoundingClientRect();
    const maxX = window.innerWidth - rect.width;
    const maxY = window.innerHeight - rect.height;

    x += dx;
    y += dy;

    if (x <= 0 || x >= maxX) dx *= -1;
    if (y <= 0 || y >= maxY) dy *= -1;

    cloud.style.left = `${x}px`;
    cloud.style.top = `${y}px`;

    requestAnimationFrame(animate);
  }

  animate();
});
// Race countdown and automatic current-month calendar
const raceDate = new Date(2026, 6, 19); 
// Month is zero-indexed in JavaScript, so 6 = July

function updateRaceCountdown() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const race = new Date(raceDate);
  race.setHours(0, 0, 0, 0);

  const diffTime = race - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const countdownText = document.getElementById("countdown-text");

  if (!countdownText) return;

  if (diffDays > 1) {
    countdownText.textContent = `${diffDays} days until race day!`;
  } else if (diffDays === 1) {
    countdownText.textContent = "1 day until race day!";
  } else if (diffDays === 0) {
    countdownText.textContent = "Race day is today!";
  } else {
    countdownText.textContent = "Race day has passed — you did it!";
  }
}

function buildCalendar() {
  const calendar = document.getElementById("calendar");
  const calendarMonth = document.getElementById("calendar-month");

  if (!calendar || !calendarMonth) return;

  calendar.innerHTML = "";

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  calendarMonth.textContent = `${monthNames[currentMonth]} ${currentYear}`;

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    const emptyCell = document.createElement("div");
    emptyCell.classList.add("calendar-day", "empty");
    calendar.appendChild(emptyCell);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dayCell = document.createElement("div");
    dayCell.classList.add("calendar-day");
    dayCell.textContent = day;

    const isToday =
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear();

    const isRaceDay =
      day === raceDate.getDate() &&
      currentMonth === raceDate.getMonth() &&
      currentYear === raceDate.getFullYear();

    if (isToday) {
      dayCell.classList.add("today");
    }

    if (isRaceDay) {
      dayCell.classList.add("race-day");
    }

    calendar.appendChild(dayCell);
  }
}

updateRaceCountdown();
buildCalendar();
