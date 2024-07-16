import "./validation-form.css";
import paymentSystemValidator from "../../payment-system-validator";
import cardNumberValidator from "../../card-number-validator";

export default class ValidationForm {
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
    this.images = this.element.querySelectorAll(
      ValidationForm.imagesAllSelector
    );
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
      this.element.insertAdjacentHTML(
        "beforeEnd",
        '<div class="message-valid">Валидация прошла успешно</div>'
      );
    }

    if (!validation && !this.input.classList.contains("card-input-invalid")) {
      this.input.classList.add("card-input-invalid");
      this.element.insertAdjacentHTML(
        "beforeEnd",
        '<div class="message-invalid">Валидация не прошла</div>'
      );
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

      if (
        image.classList.contains(paymentSystem) &&
        image.classList.contains("disable")
      ) {
        image.classList.remove("disable");
      }

      if (valueInput === "" || paymentSystem == null) {
        image.classList.remove("disable");
      }
    }
  }
}
