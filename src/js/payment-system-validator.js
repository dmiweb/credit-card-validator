export default function paymentSystemValidator(value) {
  const mastercard = [51, 52, 53, 54, 55].some((bin) => value.startsWith(bin));
  const amex = [34, 37].some((bin) => value.startsWith(bin));
  const discover = [6011, 644, 645, 646, 647, 648, 649, 65].some((bin) =>
    value.startsWith(bin)
  );
  const diners = [36, 54, 300, 301, 302, 303, 304, 305].some((bin) =>
    value.startsWith(bin)
  );

  if (value.startsWith(220)) {
    return "mir";
  }
  if (value.startsWith(4)) {
    return "visa";
  }
  if (
    mastercard ||
    (value.slice(0, 6) >= 222100 && value.slice(0, 6) <= 272099)
  ) {
    return "mastercard";
  }
  if (amex) {
    return "amex";
  }
  if (
    discover ||
    (value.slice(0, 6) >= 622126 && value.slice(0, 6) <= 622925)
  ) {
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
