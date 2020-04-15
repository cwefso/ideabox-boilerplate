var ideaGallery = document.querySelector('.card-grid');
var menuButton = document.querySelector('.hamburger-menu');
var menuCloseButton = document.querySelector('.menu-close');
var mobileMenu = document.querySelector('.menu');
var mobileMenuBody = document.querySelector('.menu-body-text');
var saveIdeaButton = document.querySelector('.form-button');
var userForm = document.querySelector('.form');
var userNewBody = document.querySelector('.input-body');
var userNewTitle = document.querySelector('.input-title');

var savedIdeas = [];

// window.onload = retrieveMadeIdeaCards;
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

  // if (event.target.className === 'star-active') {
  //   event.target.star = false;
  //   // var starImg = event.target.star;
  //   // starImg.src = starImg.src.match("assets/star.svg") ?
  //   // "assets/star-active.svg" : "assets/star.svg";
  //   showUsersIdeaCard();
  //   // inactiveStarBtn.classList.remove('hide');
  //   // activeStarBtn.classList.add('hide');
  // }

  if (event.target.className === 'star-inactive') {
    var clickedStar = event.target.closest('.box').id;

    for (var i = 0; i < savedIdeas.length; i++) {
      console.log(clickedStar, savedIdeas[i].id);
      if (clickedStar == savedIdeas[i].id) {
        savedIdeas[i].star = true;
      }
    }
    console.log(savedIdeas);
    var starImg = event.target;
    starImg.src = "assets/star-active.svg";
    starImg.className = "star-active";
    showUsersIdeaCard(event);
  }

  if (event.target.className === 'star-active') {
    var clickedStar = event.target.closest('.box').id;

    for (var i = 0; i < savedIdeas.length; i++) {
      console.log(clickedStar, savedIdeas[i].id);
      if (clickedStar == savedIdeas[i].id) {
        savedIdeas[i].star = true;
      }
    }
    console.log(savedIdeas);
    var starImg = event.target;
    starImg.src = "assets/star-inactive.svg";
    starImg.className = "star-inactive";
    showUsersIdeaCard(event);
  }
})


function deleteFromArray(event) {
  var boxToRemove = event.target.closest('.box');
  var boxIndexNumber = parseInt(boxToRemove.id);
  for (var i = 0; i < savedIdeas.length; i++) {
    if (boxIndexNumber === savedIdeas[i].id) {
      savedIdeas.splice(savedIdeas.indexOf(savedIdeas[i]));
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
}

function closeMenu() {
  mobileMenu.classList.remove('purple-4');
  mobileMenuBody.classList.remove('menu-body-mobile');
  menuButton.classList.remove('hide');
  menuCloseButton.classList.add('hide');
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
