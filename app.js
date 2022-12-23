KEY_API = "";

// DOM selector

const form = document.querySelector("form");
const ageInput = document.querySelector("#age");
const budgetInput = document.querySelector("#budget");
const themeInput = document.querySelector("#theme");
const submitBtn = document.querySelector(".form-btn");
const footer = document.querySelector("footer");
const ringLoading = document.querySelector(".ring");

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
  ringLoading.className = "lds-ring";
  submitBtn.classList.remove("hover-blc");
  submitBtn.disabled = true;
}

// mode loading off
const removeLoadingItems = () => {
  submitBtn.className = "hover-blc";
  ringLoading.classList.remove("lds-ring");
  submitBtn.disabled = false;
}

const translateTextToHtml = (text) => {
text = text.split("\n")
console.log(text);
let textHtml = [];
text.forEach(function(str) {
  textHtml.push(`<p>${str}</p>`);
})
return textHtml.join("");

}


// form
form.addEventListener("submit", (event) => {
  event.preventDefault();
  setLoadingItems();
  // API
  fetch(`https://api.openai.com/v1/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${KEY_API}`,
    },
    body: JSON.stringify({
      prompt: generateSentenceByAgeBudgetAndTheme(
        ageInput.value,
        budgetInput.value,
        themeInput.value
        ),
      max_tokens: 2000,
      model: "text-davinci-003",
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.choices[0].text);
      footer.innerHTML = translateTextToHtml(data.choices[0].text);
    })
    .finally(() =>{
      removeLoadingItems();
    })
  })
