import cardNumberValidator from "../card-number-validator";

test.each([
  ["valid", 371449635398431, true],
  ["invalid", 3714496353984, false],
])(
  "testing function cardNumberValidator with %s status and %i number",
  (_, number, expected) => {
    const result = cardNumberValidator(number);
    expect(result).toEqual(expected);
  }
);
