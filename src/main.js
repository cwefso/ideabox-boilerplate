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

window.onload = retrieveMadeIdeaCards;

menuButton.addEventListener('click', showMobileMenu);
menuCloseButton.addEventListener('click', closeMenu);
saveIdeaButton.addEventListener('click', saveIdea);
userNewTitle.addEventListener('input', verifyForm);
userNewBody.addEventListener('input', verifyForm);

ideaGallery.addEventListener('click', function(event) {
  event.preventDefault();

  if (event.target.className === 'delete') {
    deleteFromArray(event);
    deleteFromDOM(event);
  }

  if (event.target.className === 'star-inactive') {
    toggleStarOnData(event);
    toggleStarOnDOM(event);
    console.log(savedIdeas);
  } else if (event.target.className === 'star-active') {
    toggleStarOffData(event);
    toggleStarOffDOM(event);
    console.log(savedIdeas);
  }
})

function toggleStarOnData() {
  var clickedStar = event.target.closest('.box');
  var starIdNumber = parseInt(clickedStar.id);

  for (var i = 0; i < savedIdeas.length; i++) {
    if (starIdNumber === savedIdeas[i].id) {
      savedIdeas[i].star = true;
    }
  }
  saveIdeaToStorage()
}

function toggleStarOnDOM() {
  var starImg = event.target;
  starImg.src = "assets/star-active.svg";
  starImg.className = "star-active";
}

function toggleStarOffData() {
  var clickedStar = event.target.closest('.box');
  var starIdNumber = parseInt(clickedStar.id);

  for (var i = 0; i < savedIdeas.length; i++) {
    if (starIdNumber === savedIdeas[i].id) {
      savedIdeas[i].star = false;
    }
  }
  saveIdeaToStorage()
}

function toggleStarOffDOM() {
  var starImg = event.target;
  starImg.src = "assets/star.svg";
  starImg.className = "star-inactive";
}

function deleteFromArray(event) {
  var boxToRemove = event.target.closest('.box');
  var boxIndexNumber = parseInt(boxToRemove.id);
  for (var i = 0; i < savedIdeas.length; i++) {
    if (boxIndexNumber === savedIdeas[i].id) {
      savedIdeas.splice(savedIdeas.indexOf(savedIdeas[i]));
    }
  }
  saveIdeaToStorage()
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
  saveIdeaToStorage();
  saveIdeaButton.disabled = true;
  }
}

function saveIdeaToStorage() {
  localStorage.setItem('ideas', JSON.stringify(savedIdeas));
}

function retrieveMadeIdeaCards() {
  savedIdeas = JSON.parse(localStorage.getItem('ideas')) || [];
  showUsersIdeaCard();
}

function clearFields() {
  userNewTitle.value = "";
  userNewBody.value = "";
}

function showUsersIdeaCard() {
  if (savedIdeas.length) {
    ideaGallery.innerHTML = "";
    for (var i = 0; i < savedIdeas.length; i++) {

      if (savedIdeas[i].star === false) {
        var visibleStar = "assets/star.svg";
        var starClassName = "star-inactive";
      } else if (savedIdeas[i].star === true){
        visibleStar = "assets/star-active.svg";
        starClassName = "star-active";
      }

      var ideaCardTemplate =
      `<section class="box" id="${savedIdeas[i].id}">
        <section class="card-top">
          <input type="image" src=${visibleStar} name="star" class=${starClassName} id="star" />
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
    }
  }
}
