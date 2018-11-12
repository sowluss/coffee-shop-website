evenListeners();

function evenListeners() {
  const ui = new UI()

  // Hide preloader after all the content finished loading
  window.addEventListener('load', function () {
    ui.hidePreloader();
  })

  // Navigation toggle button
  document.querySelector('.toggle-btn').addEventListener('click', function () {
    ui.showNav();
  })

  // video switch on/off button
  document.querySelector('.video-switch').addEventListener('click', function () {
    ui.videoControls();
  })
}

// Construction function
function UI() {}

// hide preloader
UI.prototype.hidePreloader = function () {
  document.querySelector('.preloader').style.display = 'none';
}
// show nav
UI.prototype.showNav = function () {
  document.querySelector('nav').classList.toggle('nav-show')
}
// play/pause the video
UI.prototype.videoControls = function () {
  let btn = document.querySelector('.videoSwitch-btn');
  if (!btn.classList.contains('btnSlide')) {
    btn.classList.add('btnSlide');
    document.querySelector('.video-item').pause();
    
  } else {
    btn.classList.remove('btnSlide');
    document.querySelector('.video-item').play();
  }
}