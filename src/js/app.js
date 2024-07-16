import ValidationForm from "./components/validation-form/validation-form";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container");
  const form = new ValidationForm(container);

  form.bindToDOM();
});
