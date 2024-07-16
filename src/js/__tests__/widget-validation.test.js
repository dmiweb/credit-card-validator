/**
 * @jest-environment jsdom
 */

import ValidationForm from "../components/validation-form/validation-form";

  test.each([
    ["valid", 2204706642093860, true],
    ["invalid", 1000000000000001, false],
  ])(
    "widget should add valid and invalid class with %s status and %i number",
    (_, number, expected) => {
      document.body.innerHTML = '<main class="container"></main>';
  
      const container = document.querySelector('.container');
      const widget = new ValidationForm(container);
      
      widget.bindToDOM();
    
      widget.input.value = number;
      widget.submit.click();

      expect(widget.input.classList.contains('card-input-valid')).toEqual(expected);
    }
  );