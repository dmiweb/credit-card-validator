import paymentSystemValidator from "../payment-system-validator";

test.each([
  ["mir", "220", "mir"],
  ["visa", "4", "visa"],
  ["mastercard", "222333", "mastercard"],
  ["amex", "34", "amex"],
  ["discover", "622126", "discover"],
  ["jsb", "3528", "jsb"],
  ["diners", "36", "diners"],
  ["noPaymentSystem", "000", null],
])(
  "testing function paymentSystemValidator with %s paymentSystem and %i bin",
  (_, bin, expected) => {
    const result = paymentSystemValidator(bin);
    expect(result).toEqual(expected);
  }
);
