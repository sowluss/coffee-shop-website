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
  document.querySelector('.drink-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.querySelector('.input-name').value;
    const surname = document.querySelector('.input-lastname').value;
    const email = document.querySelector('.input-email').value;

    let value = ui.checkEmpty(name, surname, email);

    if (value) {
      let customer = new Customer(name, surname, email);
      ui.addCustomer(customer);
      ui.showFeedback('Your entry submitted successfully', 'success');
      ui.clearFields();
    } else {
      ui.showFeedback('Please, complete all fields', 'error')
    }
  })

  // Display Modal
  const links = document.querySelectorAll('.gallery-item-icon');
  links.forEach(function(item) {
    item.addEventListener('click', function(event){
      ui.showModal(event);
    })
  })
  // hide modal 
document.querySelector('.gallery-modal-close').addEventListener('click', function(){
  ui.closeModal()
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

UI.prototype.checkEmpty = function (name, surname, email) {
  let result;
  if (name === '' || surname === '' || email === '') {

    result = false;
  } else {
    result = true;
  }
  return result;
}

UI.prototype.showFeedback = function (text, type) {
  const feedback = document.querySelector('.drinkForm-feedback');
  if (type === 'success') {
    feedback.classList.add('success');
    feedback.innerText = text;
    this.removeAlert('success');
  } else if (type === 'error') {
    feedback.classList.add('error');
    feedback.innerText = text;
    this.removeAlert('error');
  }
}
// remove alert
UI.prototype.removeAlert = function (type) {
  setTimeout(function () {
    document.querySelector('.drinkForm-feedback').classList.remove(type);
  }, 3000);
}

// Add Customer
UI.prototype.addCustomer = function (customer) {
  const images = [1, 2, 3, 4, 5];
  let random = Math.floor(Math.random() * images.length);
  const div = document.createElement('div');
  div.classList.add('person');
  div.innerHTML = `<img src="offer_img/${random}.jpg" alt="person" class="person-thumbnail">
  <h4 class="person-name">${customer.name}</h4>
  <h4 class="person-lastName">${customer.lastname}</h4>`
  document.querySelector('.drink-card-list').appendChild(div);
}

// clear fields

UI.prototype.clearFields = function () {
  document.querySelector('.input-name').value = '';
  document.querySelector('.input-lastname').value = '';
  document.querySelector('.input-email').value = '';
}

// show modal

UI.prototype.showModal = function(event) {
  event.preventDefault();
  if (event.target.parentElement.classList.contains('gallery-item-icon'));
    let id = event.target.parentElement.dataset.id;

    const modal = document.querySelector('.gallery-modal');
    const modalItem = document.querySelector('.gallery-modal-item');

    modal.classList.add('gallery-modal-show');
    modalItem.style.backgroundImage = `url(gallery/${id}.jpeg)`
}

// hide modal 
UI.prototype.closeModal = function() {
  document.querySelector('.gallery-modal').classList.remove('gallery-modal-show');
}





function Customer(name, lastname, email) {
  this.name = name;
  this.lastname = lastname;
  this.email = email;
}