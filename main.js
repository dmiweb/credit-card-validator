/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/payment-system-validator.js
function paymentSystemValidator(value) {
  const mastercard = [51, 52, 53, 54, 55].some(bin => value.startsWith(bin));
  const amex = [34, 37].some(bin => value.startsWith(bin));
  const discover = [6011, 644, 645, 646, 647, 648, 649, 65].some(bin => value.startsWith(bin));
  const diners = [36, 54, 300, 301, 302, 303, 304, 305].some(bin => value.startsWith(bin));
  if (value.startsWith(220)) {
    return "mir";
  }
  if (value.startsWith(4)) {
    return "visa";
  }
  if (mastercard || value.slice(0, 6) >= 222100 && value.slice(0, 6) <= 272099) {
    return "mastercard";
  }
  if (amex) {
    return "amex";
  }
  if (discover || value.slice(0, 6) >= 622126 && value.slice(0, 6) <= 622925) {
    return "discover";
  }
  if (value.slice(0, 4) >= 3528 && value.slice(0, 4) <= 3589) {
    return "jsb";
  }
  if (diners) {
    return "diners";
  }
  return null;
}
;// CONCATENATED MODULE: ./src/js/card-number-validator.js
function cardNumberValidator(input) {
  const number = input.toString();
  const digits = number.replace(/\D/g, "").split("").map(Number);
  let sum = 0;
  let isSecond = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = digits[i];
    if (isSecond) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
    isSecond = !isSecond;
  }
  return sum % 10 === 0;
}
;// CONCATENATED MODULE: ./src/js/components/validation-form/validation-form.js



class ValidationForm {
  constructor(parentEl) {
    this.parentEl = parentEl;
    this.onInput = this.onInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  static get markup() {
    return `
        <form class="validation-form">
          <div class="payment-system-images">
            <div class="imgage-container mir"></div>
            <div class="imgage-container visa"></div>
            <div class="imgage-container mastercard"></div>
            <div class="imgage-container amex"></div>
            <div class="imgage-container discover"></div>
            <div class="imgage-container jsb"></div>
            <div class="imgage-container diners"></div>
          </div>

          <div class="control">
            <input class="card-input" type="number" pattern="\\d*" placeholder="Ввведите номер карты" required="required">
            <button class="submit-btn">Проверить</button>
          </div>
        </form>
     `;
  }
  static get selector() {
    return ".validation-form";
  }
  static get imagesAllSelector() {
    return ".imgage-container";
  }
  static get inputSelector() {
    return ".card-input";
  }
  static get submitSelector() {
    return ".submit-btn";
  }
  bindToDOM() {
    this.parentEl.innerHTML = ValidationForm.markup;
    this.element = this.parentEl.querySelector(ValidationForm.selector);
    this.images = this.element.querySelectorAll(ValidationForm.imagesAllSelector);
    this.input = this.element.querySelector(ValidationForm.inputSelector);
    this.submit = this.element.querySelector(ValidationForm.submitSelector);
    this.element.addEventListener("submit", this.onSubmit);
    this.input.addEventListener("input", this.onInput);
  }
  onSubmit(e) {
    e.preventDefault();
    const valueInput = this.input.value;
    const validation = cardNumberValidator(valueInput);
    if (validation && !this.input.classList.contains("card-input-valid")) {
      this.input.classList.add("card-input-valid");
      this.element.insertAdjacentHTML("beforeEnd", '<div class="message-valid">Валидация прошла успешно</div>');
    }
    if (!validation && !this.input.classList.contains("card-input-invalid")) {
      this.input.classList.add("card-input-invalid");
      this.element.insertAdjacentHTML("beforeEnd", '<div class="message-invalid">Валидация не прошла</div>');
    }
  }
  onInput() {
    const valueInput = this.input.value;
    const paymentSystem = paymentSystemValidator(valueInput);
    if (this.input.classList.contains("card-input-valid")) {
      this.input.classList.remove("card-input-valid");
      document.querySelector(".message-valid").remove();
    }
    if (this.input.classList.contains("card-input-invalid")) {
      this.input.classList.remove("card-input-invalid");
      document.querySelector(".message-invalid").remove();
    }
    for (const image of this.images) {
      if (!image.classList.contains(paymentSystem) && valueInput !== "") {
        image.classList.add("disable");
      }
      if (image.classList.contains(paymentSystem) && image.classList.contains("disable")) {
        image.classList.remove("disable");
      }
      if (valueInput === "" || paymentSystem == null) {
        image.classList.remove("disable");
      }
    }
  }
}
;// CONCATENATED MODULE: ./src/js/app.js

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container");
  const form = new ValidationForm(container);
  form.bindToDOM();
});
;// CONCATENATED MODULE: ./src/index.js



// TODO: write your code in app.js
/******/ })()
;