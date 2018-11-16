evenListeners();

function evenListeners() {
  const ui = new UI()

  // Preloader 
  window.addEventListener('load', function () {
    ui.hidePreloader();
  })

  // Toggle button
  document.querySelector('.toggle-btn').addEventListener('click', function () {
    ui.showNav();
  })

  // Video control
  document.querySelector('.video-switch').addEventListener('click', function () {
    ui.videoControls();
  })

  // Submit form
  document.querySelector('.drink-form').addEventListener('submit', function(e){
    e.preventDefault();
    const name = document.querySelector('.input-name').value;
    const surname = document.querySelector('.input-lastname').value;
    const email = document.querySelector('.input-email').value;

    let value = ui.checkEmpty(name, surname, email);
    
    if(value) {
      ui.showFeedback('Your entry submitted successfully', 'success');
    }
    else {
      ui.showFeedback('Please, complete all fields', 'error')
    }
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

// check for empty form inputs

UI.prototype.checkEmpty = function(name, surname, email) {
  let result;
  if(name === '' || surname === '' || email === '') {

    result = false;
  }
  else {
    result = true;
  }
  return result;
}

UI.prototype.showFeedback = function(text, type) {
  if(type === 'success') {
    let feedback = document.querySelector('.drinkForm-feedback');
    feedback.classList.add('success');
    feedback.innerText = text;
    this.removeAlert('success');
  }
  else if(type === 'error') {
    let feedback = document.querySelector('.drinkForm-feedback');
    feedback.classList.add('error');
    feedback.innerText = text;
    this.removeAlert('error');
  }
}
// remove alert
UI.prototype.removeAlert = function(type) {
  setTimeout(function(){
    document.querySelector('.drinkForm-feedback').classList.remove(type);
  }, 3000);
}

