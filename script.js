const numberInputs = document.querySelectorAll(".note-numbers input");

const perNotesValues = document.querySelectorAll(".per-note-value");

// const currencydata = {
//   ONE_TO_NINE: [
//     "",
//     "ONE",
//     "TWO",
//     "THREE",
//     "FOUR",
//     "FIVE",
//     "SIX",
//     "SEVEN",
//     "EIGHT",
//     "NINE",
//   ],
//   ELEVEN_TO_NINETEEN: [
//     "",
//     "ELEVEN",
//     "TWELVE",
//     "THIRTEEN",
//     "FOURTEEN",
//     "FIFTEEN",
//     "SIXTEEN",
//     "SEVENTEEN",
//     "EIGHTEEN",
//     "NINETEEN",
//   ],
//   TEN_TO_NINTY: [
//     "",
//     "TEN",
//     "TWENTY",
//     "THIRTY",
//     "FORTY",
//     "FIFTY",
//     "SIXTY",
//     "SEVENTY",
//     "EIGHTY",
//     "NINETY",
//   ],
//   HUNDRED: "HUNDRED",
//   THOUSAND: "THOUSAND",
//   LAKH: "LAKH",
//   CRORE: "CRORE",
// };

numberInputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    const target = e.target;

    const noteValue = target.getAttribute("data-note-value");

    const parentElement = target.closest(".row");
    const nearestPerNoteValue = parentElement.querySelector(".per-note-value");
    nearestPerNoteValue.innerText = "";
    nearestPerNoteValue.innerText = +target.value * +noteValue;

    setTotalValue();
    setTotalNotes();
    setMoneyInText();
  });
});

function setTotalValue() {
  let result = 0;
  perNotesValues.forEach((value) => {
    result += Number(value.innerText);
  });
  document.querySelector(".total-cash").innerText = result;
}

function setTotalNotes() {
  let result = 0;
  numberInputs.forEach((input) => {
    result += Number(input.value);
  });
  document.querySelector(".total-notes").innerText = result;
}

function setMoneyInText() {
  const number = document.querySelector(".total-cash").innerText;
  document.querySelector(".total-txt").innerText = inWords(number)
}

var inWords = function (totalRent) {
  var a = [
    "",
    "one ",
    "two ",
    "three ",
    "four ",
    "five ",
    "six ",
    "seven ",
    "eight ",
    "nine ",
    "ten ",
    "eleven ",
    "twelve ",
    "thirteen ",
    "fourteen ",
    "fifteen ",
    "sixteen ",
    "seventeen ",
    "eighteen ",
    "nineteen ",
  ];
  var b = [
    "",
    "",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];
  var number = parseFloat(totalRent).toFixed(2).split(".");
  var num = parseInt(number[0]);
  var digit = parseInt(number[1]);
  if (num.toString().length > 9) return "overflow";
  var n = ("000000000" + num)
    .substr(-9)
    .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  var d = ("00" + digit).substr(-2).match(/^(\d{2})$/);
  if (!n) return;
  var str = "";
  str +=
    n[1] != 0
      ? (a[Number(n[1])] || b[n[1][0]] + " " + a[n[1][1]]) + "crore "
      : "";
  str +=
    n[2] != 0
      ? (a[Number(n[2])] || b[n[2][0]] + " " + a[n[2][1]]) + "lakh "
      : "";
  str +=
    n[3] != 0
      ? (a[Number(n[3])] || b[n[3][0]] + " " + a[n[3][1]]) + "thousand "
      : "";
  str +=
    n[4] != 0
      ? (a[Number(n[4])] || b[n[4][0]] + " " + a[n[4][1]]) + "hundred "
      : "";
  str +=
    n[5] != 0
      ? (a[Number(n[5])] || b[n[5][0]] + " " + a[n[5][1]]) + "Rupee "
      : "";
  str +=
    d[1] != 0
      ? (str != "" ? "and " : "") +
        (a[Number(d[1])] || b[d[1][0]] + " " + a[d[1][1]]) +
        "Paise "
      : "Only!";
  return str;
};