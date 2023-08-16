const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
let button = document.querySelector(".search");
button.addEventListener("click", async function() {
  let search = document.querySelector(".word");
  let word = search.value;
  let jsonData = await searchword(word);
  showMeaning(jsonData);
});

async function searchword(data) {
  try {
    const res = await fetch(url + data);
    const jsonData = await res.json();
    return jsonData;
  } catch (e) {
    console.log("error-", e);
  }
}
// create card for each figure of speech
function createCard(partOfSpeech, definitions) {
  const card = document.createElement("div");
  card.classList.add("card");

  const partOfSpeechElement = document.createElement("h3");
  partOfSpeechElement.textContent = partOfSpeech.toUpperCase();
  card.appendChild(partOfSpeechElement);

  const list = document.createElement("ul");
  card.appendChild(list);
  
  definitions.forEach(definition => {
    if(definition.example!=undefined)
    {

    
    const li = document.createElement("li");
    li.textContent=`Definition: ${definition.definition}`;
    const exampleElement = document.createElement("p");
    exampleElement.textContent = `Example: ${definition.example}`;
    li.appendChild(exampleElement);
    card.append(li);
    }
  });

  return card;
}
// return card and inject it into the html
function showMeaning(jsonData) {
  const resultsContainer = document.querySelector(".results-container");
  resultsContainer.innerHTML = ""; // Clear previous results

  if (Array.isArray(jsonData)) {
    jsonData.forEach(entry => {
      const partOfSpeech = entry.meanings[0].partOfSpeech; // Assume there's at least one meaning

      const card = createCard(partOfSpeech, entry.meanings[0].definitions);
      resultsContainer.appendChild(card);
    });
  } else {
    console.log("No results found.");
  }
}
