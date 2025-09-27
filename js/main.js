let selectTag = document.querySelectorAll("select"),
  formText = document.querySelector(".from-text"),
  toText = document.querySelector(".to-text"),
  exchengeBtn = document.querySelector(".exchenge"),
  translateBtn = document.querySelector("button");
iconsBtn = document.querySelectorAll(".row i");
selectTag.forEach((tag, id) => {
  for (const countries_code in countries) {
    let selected;
    if (id == 0 && countries_code == "en-GB") {
      selected = "selected";
    } else if (id == 1 && countries_code == "hi-IN") {
      selected = "selected";
    }

    let option = `<option  ${selected}  value='${countries_code}'>${countries[countries_code]}</option>`;
    tag.insertAdjacentHTML("beforeend", option);
  }
});

exchengeBtn.addEventListener("click", () => {
  // text change
  let tempText = formText.value;
  formText.value = toText.value;
  toText.value = tempText;
  // countries code change
  let tempCode = selectTag[0].value;
  selectTag[0].value = selectTag[1].value;
  selectTag[1].value = tempCode;
});

translateBtn.addEventListener("click", () => {
  let text = formText.value;
  let from = selectTag[0].value;
  let to = selectTag[1].value;
  let url = `https://api.mymemory.translated.net/get?q=${text}&langpair=${from}|${to}`;

  if (!text) return;
  toText.setAttribute("placeholder", "Translating...");
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      toText.setAttribute("placeholder", "Translation");
      toText.value = data.responseData.translatedText;
    });
});

iconsBtn.forEach((icon) => {
  icon.addEventListener("click", ({ target }) => {
    if (target.classList.contains("fa-copy")) {
      if (target.id == "from") {
        navigator.clipboard.writeText(formText.value);
      } else {
        navigator.clipboard.writeText(toText.value);
      }
    } else {
      let utterance;
      if (target.id == "from") {
        utterance = new SpeechSynthesisUtterance(formText.value);
        utterance.lang = selectTag[0].value;
      } else {
        utterance = new SpeechSynthesisUtterance(toText.value);
        utterance.lang = selectTag[1].value;
      }
      speechSynthesis.speak(utterance);
    }
  });
});
