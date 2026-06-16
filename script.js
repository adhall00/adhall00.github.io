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
