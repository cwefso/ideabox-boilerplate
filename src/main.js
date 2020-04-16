var background = document.querySelector('.background');
var ideaGallery = document.querySelector('.card-grid');
var menuButton = document.querySelector('.hamburger-menu');
var menuCloseButton = document.querySelector('.menu-close');
var mobileMenu = document.querySelector('.menu');
var mobileMenuBody = document.querySelector('.menu-body-text');
var saveIdeaButton = document.querySelector('.form-button');
var starredIdeaButton = document.querySelector('.show-starred-button');
var userForm = document.querySelector('.form');
var userNewBody = document.querySelector('.input-body');
var userNewTitle = document.querySelector('.input-title');

var savedIdeas = [];

ideaGallery.addEventListener('click', deleteIdeaCard);
ideaGallery.addEventListener('click', toggleFavoriting)
menuButton.addEventListener('click', openMobileMenu);
menuCloseButton.addEventListener('click', closeMobileMenu);
saveIdeaButton.addEventListener('click', saveCreatedIdea);
starredIdeaButton.addEventListener('click', toggleIdeaCardView);
userNewTitle.addEventListener('input', verifyForm);
userNewBody.addEventListener('input', verifyForm);
window.onload = retrieveMadeIdeaCardsFromLS;

function clearInputFields() {
  userNewTitle.value = "";
  userNewBody.value = "";
}

function createNewIdea() {
  var currentIdea = new Idea(userNewTitle.value, userNewBody.value);
  if (userNewTitle.value && userNewBody.value) {
    savedIdeas.push(currentIdea);
    saveIdeaToLS();
    saveIdeaButton.disabled = true;
  }
}

function closeMobileMenu() {
  mobileMenu.classList.remove('purple-4');
  mobileMenuBody.classList.remove('menu-body-mobile');
  menuButton.classList.remove('hide');
  menuCloseButton.classList.add('hide');
  background.classList.remove('gray-1');
}

function deleteIdeaCard(event) {
  event.preventDefault();
  if (event.target.className === 'delete') {
    deleteFromDataModel(event);
    deleteFromDOM(event);
  }
}

function deleteFromDataModel(event) {
  var boxToRemove = event.target.closest('.box');
  var boxIndexNumber = parseInt(boxToRemove.id);
  for (var i = 0; i < savedIdeas.length; i++) {
    if (boxIndexNumber === savedIdeas[i].id) {
      savedIdeas.splice(savedIdeas.indexOf(savedIdeas[i]));
    }
  }
  saveIdeaToLS()
}

function deleteFromDOM(event) {
  var boxToRemove = event.target.closest('.box');
  boxToRemove.remove();
}

function displayAllIdeas() {
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

function displayStarredIdeas() {
  ideaGallery.innerHTML = "";
  for (var i = 0; i < savedIdeas.length; i++) {
    if (savedIdeas[i].star === true) {
      var starredIdeaCards =
      `<section class="box" id="${savedIdeas[i].id}">
        <section class="card-top">
          <input type="image" src="assets/star-active.svg" name="star" class="star-active" id="star" />
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
    ideaGallery.insertAdjacentHTML('afterbegin', starredIdeaCards);
    }
  }
}

function openMobileMenu() {
  mobileMenu.classList.add('purple-4');
  mobileMenuBody.classList.add('menu-body-mobile');
  menuButton.classList.add('hide');
  menuCloseButton.classList.remove('hide');
  background.classList.add('gray-1');
}

function retrieveMadeIdeaCardsFromLS() {
  savedIdeas = JSON.parse(localStorage.getItem('ideas')) || [];
  displayAllIdeas();
}

function saveCreatedIdea(event) {
  event.preventDefault();
  createNewIdea();
  clearInputFields();
  displayAllIdeas();
  verifyForm();
}

function saveIdeaToLS() {
  localStorage.setItem('ideas', JSON.stringify(savedIdeas));
}

function toggleFavoriting() {
  event.preventDefault();
  if (event.target.className === 'star-inactive') {
    toggleStarOnDataModel(event);
    toggleStarOnDOM(event);
  } else if (event.target.className === 'star-active') {
    toggleStarOffDataModel(event);
    toggleStarOffDOM(event);
  }
}

function toggleStarOffDataModel() {
  var clickedStar = event.target.closest('.box');
  var starIdNumber = parseInt(clickedStar.id);

  for (var i = 0; i < savedIdeas.length; i++) {
    if (starIdNumber === savedIdeas[i].id) {
      savedIdeas[i].star = false;
    }
  }
  saveIdeaToLS()
}

function toggleStarOffDOM() {
  var starImg = event.target;
  starImg.src = "assets/star.svg";
  starImg.className = "star-inactive";
}

function toggleStarOnDataModel() {
  var clickedStar = event.target.closest('.box');
  var starIdNumber = parseInt(clickedStar.id);

  for (var i = 0; i < savedIdeas.length; i++) {
    if (starIdNumber === savedIdeas[i].id) {
      savedIdeas[i].star = true;
    }
  }
  saveIdeaToLS();
}

function toggleStarOnDOM() {
  var starImg = event.target;
  starImg.src = "assets/star-active.svg";
  starImg.className = "star-active";
}

function toggleIdeaCardView() {
  if(starredIdeaButton.innerText === "Show All Ideas") {
    starredIdeaButton.innerText = "Show Starred Ideas";
    displayAllIdeas();
  } else {
    starredIdeaButton.innerText = "Show All Ideas";
    displayStarredIdeas();
  }
}

function verifyForm(event) {
  if (userNewTitle.value && userNewBody.value) {
    saveIdeaButton.disabled = false;
  } else {
    saveIdeaButton.disabled = true;
  }
}
