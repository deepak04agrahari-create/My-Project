const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown_id");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from-container select");
const toCurr = document.querySelector(".to-container select");
const msg = document.querySelector(".msg");

// Populate all dropdowns with countryList
for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;

    // Default values
    if (select === fromCurr && currCode === "USD") {
      newOption.selected = true;
    } else if (select === toCurr && currCode === "INR") {
      newOption.selected = true;
    }

    select.append(newOption);
  }

  // Update flag on change
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

// Update exchange rate
const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;

  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  const URL = `${BASE_URL}&base_currency=${fromCurr.value}`;
  let response = await fetch(URL);
  let data = await response.json();

  // Get conversion rate for target currency
  let rate = data.data[toCurr.value].value;
  let finalAmount = (amtVal * rate).toFixed(2);

  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

// Update flag images
const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

// Button click
btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

// On page load
window.addEventListener("load", () => {
  updateExchangeRate();
});
