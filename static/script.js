// ----- Mobile Navbar Toggle -----

document.getElementById('mobileToggle').addEventListener('click', function () {

  // Target the RIGHT side of the navbar (links + sign-in)
  const nav = document.querySelector('.navbar-right');

  // Toggle visibility
  if (nav.style.display === 'flex') {
    nav.style.display = 'none';
  } else {
    nav.style.display = 'flex';
    nav.style.flexDirection = 'column';  // for mobile dropdown
    nav.style.background = '#0f3b76';
    nav.style.padding = '20px';
    nav.style.borderRadius = '0 0 10px 10px';
    nav.style.gap = '14px';
  }
});


// ----- Smooth Scroll for Internal Links -----

document.querySelectorAll('a[href^="#"]').forEach(function (a) {
  a.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});
function updateProgressCircle() {
    const progressValue = Number(localStorage.getItem("prepProgress") || 0);
    const progressCircle = document.querySelector(".progress-circle .progress");
    const progressText = document.getElementById("profileProgressText");

    const radius = 50;
    const circumference = 2 * Math.PI * radius;

    const offset = circumference - (progressValue / 100) * circumference;

    progressCircle.style.strokeDasharray = circumference;
    progressCircle.style.strokeDashoffset = offset;

    progressText.textContent = progressValue + "%";
}
updateProgressCircle();