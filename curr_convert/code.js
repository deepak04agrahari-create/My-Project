const BASE_URL = "https://open.er-api.com/v6/latest";

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

    if (select === fromCurr && currCode === "USD") newOption.selected = true;
    if (select === toCurr && currCode === "INR") newOption.selected = true;

    select.append(newOption);
  }

  select.addEventListener("change", (evt) => updateFlag(evt.target));
}

// Update exchange rate
const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;

  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  // Correct API URL
  const URL = `${BASE_URL}/${fromCurr.value}`;

  let response = await fetch(URL);
  let data = await response.json();

  // Correct way of extracting rate
  let rate = data.rates[toCurr.value];

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
window.addEventListener("load", updateExchangeRate);
