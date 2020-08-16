// Открытие/закрытие меню на мобильном/планшете //
var header = document.querySelector(".page-header");
var nav = document.querySelector(".main-nav");
var navToggle = document.querySelector(".burger");

header.classList.add("page-header--closed");
nav.classList.remove("main-nav--nojs");
nav.classList.add("main-nav--closed");

navToggle.addEventListener("click", function() {
  if (nav.classList.contains("main-nav--closed")) {
    header.classList.remove("page-header--closed");
    header.classList.add("page-header--opened");
    nav.classList.remove("main-nav--closed");
    nav.classList.add("main-nav--opened");
  } else {
    header.classList.remove("page-header--opened");
    header.classList.add("page-header--closed");
    nav.classList.remove("main-nav--opened");
    nav.classList.add("main-nav--closed");

  }
});

// Проверка формы и выдача попапов //
var form = document.querySelector("form");
var popup = document.querySelector(".modal");
var error = document.querySelector(".modal--error");
var sent = document.querySelector(".modal--sent");
var close = document.querySelector(".modal__button");
var closeSent = document.querySelector(".modal__button--sent");
var secondName = document.querySelector("[name=secondName]");
var firstName = document.querySelector("[name=firstName]");
var usersEmail = document.querySelector("[name=usersEmail]");

form.addEventListener("submit", function (evt) {
  if (!secondName.validity.valid || !firstName.validity.valid || !usersEmail.validity.valid) {
    evt.preventDefault();
    error.classList.add("modal--show");
  } else {
    evt.preventDefault();
    sent.classList.add("modal--show");
  }
});

close.addEventListener("click", function (evt) {
  evt.preventDefault();
  eror.classList.remove("modal--show");
});

closeSent.addEventListener("click", function (evt) {
  evt.preventDefault();
  sent.classList.remove("modal--show");
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (error.classList.contains("modal--show")) {
      error.classList.remove("modal--show");
    } else {
      sent.classList.remove("modal--show");
    }
  }
});
