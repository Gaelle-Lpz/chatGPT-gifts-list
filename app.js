// DOM selector

const form = document.querySelector("form");
const ageInput = document.querySelector("#age");
const budgetInput = document.querySelector("#budget");
const themeInput = document.querySelector("#theme");
const submitBtn = document.querySelector(".form-btn");
const footer = document.querySelector("footer");

const generateSentenceByAgeBudgetAndTheme = (age, budget = "", theme = "") => {
  let sentence = `Suggest me 3 gift ideas for a ${age} years old person`;

  if (theme != "") {
    sentence += ` who likes to ${theme}`;
  }
  if (budget != ""){
    sentence += ` with a budget of ${budget} dollars`;
  }

  return sentence;
}

// mode loading on
const setLoadingItems = () => {
  footer.textContent = "Loading ideas in progress..."
}

// mode loading off
