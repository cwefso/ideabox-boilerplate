var ideaGallery = document.querySelector('.card-grid');
var menuButton = document.querySelector('.hamburger-menu');
var menuCloseButton = document.querySelector('.menu-close');
var mobileMenu = document.querySelector('.menu');
var mobileMenuBody = document.querySelector('.menu-body-text');
var saveIdeaButton = document.querySelector('.form-button');
var userForm = document.querySelector('.form');
var userNewBody = document.querySelector('.input-body');
var userNewTitle = document.querySelector('.input-title');
var background = document.querySelector('.background');

var savedIdeas = [];

// window.onload = retrieveMadeIdeaCards;
menuButton.addEventListener('click', showMobileMenu);
menuCloseButton.addEventListener('click', closeMenu);
saveIdeaButton.addEventListener('click', saveIdea);
userNewTitle.addEventListener('input', verifyForm);
userNewBody.addEventListener('input', verifyForm);

ideaGallery.addEventListener('click', function(event) {
  event.preventDefault();
  var activeStarBtn = document.querySelector('.star-active');
  var inactiveStarBtn = document.querySelector('.star-inactive');

  if (event.target.className === 'delete') {
    deleteFromArray(event);
    deleteFromDOM(event);
  }

  if (event.target.className === 'star-active') {
    inactiveStarBtn.classList.remove('hide');
    activeStarBtn.classList.add('hide');
  }

  if (event.target.className === 'star-inactive') {
    inactiveStarBtn.classList.add('hide');
    activeStarBtn.classList.remove('hide');
  }
})

function deleteFromArray(event) {
  var boxToRemove = event.target.closest('.box');
  var boxNumber = parseInt(boxToRemove.id);
  for (var i = 0; i < savedIdeas.length; i++) {
    if (boxNumber === savedIdeas[i].id) {
      savedIdeas.splice(savedIdeas.indexOf(boxNumber));
    }
  }
}

function deleteFromDOM(event) {
  var boxToRemove = event.target.closest('.box');
  boxToRemove.remove();
}

function showMobileMenu() {
  mobileMenu.classList.add('purple-4');
  mobileMenuBody.classList.add('menu-body-mobile');
  menuButton.classList.add('hide');
  menuCloseButton.classList.remove('hide');
  background.classList.add('gray-1');
}

function closeMenu() {
  mobileMenu.classList.remove('purple-4');
  mobileMenuBody.classList.remove('menu-body-mobile');
  menuButton.classList.remove('hide');
  menuCloseButton.classList.add('hide');
  background.classList.remove('gray-1');
}

function saveIdea(event) {
  event.preventDefault();
  createNewIdea();
  clearFields();
  showUsersIdeaCard();
  verifyForm();
}

function verifyForm(event) {
  if (userNewTitle.value && userNewBody.value) {
    saveIdeaButton.disabled = false;
  } else {
    saveIdeaButton.disabled = true;
  }
}

function createNewIdea() {
  var currentIdea = new Idea(userNewTitle.value, userNewBody.value);
  if (userNewTitle.value && userNewBody.value) {
  savedIdeas.push(currentIdea);
  saveIdeaButton.disabled = true;
  // saveIdeaToStorage();
  }
}

// function saveIdeaToStorage() {
//   localStorage.setItem('ideas', JSON.stringify(savedIdeas));
// }
//
// function retrieveMadeIdeaCards() {
//   savedIdeas = JSON.parse(localStorage.getItem('ideas')) || [];
//
//   showUsersIdeaCard();
// }

function clearFields() {
  userNewTitle.value = "";
  userNewBody.value = "";
}

function showUsersIdeaCard() {
  if (savedIdeas.length) {
    ideaGallery.innerHTML = "";
    for (var i = 0; i < savedIdeas.length; i++) {
      var ideaCardTemplate =
      `<section class="box" id="${savedIdeas[i].id}">
        <section class="card-top">
          <input type="image" src="assets/star.svg" name="star-inactive" class="star-inactive" id="star-inactive" />
          <input type="image" src="assets/star-active.svg" name="star-active" class="star-active hide" id="star-active" />
          <input type="image" src="assets/delete.svg" name="delete" class="delete" id="delete" align="right"/>
        </section>
        <section class="card-body">
          <p class= "card-header">${savedIdeas[i].title}</p>
          <p class= "card-text">${savedIdeas[i].body}</p>
          </section>
          <section class="card-bottom">
            <input type="image" src="assets/comment.svg" name="comment" class="comment" id="comment" align="left"/>
            <p class= "comment-text">Comment</p>
          </section>
      </section>`;
      ideaGallery.insertAdjacentHTML('afterbegin', ideaCardTemplate);

      // deleteIdeaCard();
      // toggleFavoriteStar();
    }
  }
}


