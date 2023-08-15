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

function createCard(partOfSpeech, definitions) {
  const card = document.createElement("div");
  card.classList.add("card");

  const partOfSpeechElement = document.createElement("h3");
  partOfSpeechElement.textContent = partOfSpeech;
  card.appendChild(partOfSpeechElement);
  
  definitions.forEach(definition => {
    const definitionElement = document.createElement("p");
    definitionElement.textContent = `Definition: ${definition.definition},   Example: ${definition.example}`;
    card.appendChild(definitionElement);
  });

  return card;
}

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





// const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
// let button = document.querySelector(".search");
// button.addEventListener("click", async function() {
//   let search = document.querySelector(".word");
//   let word = search.value;
//   let apiAns = await searchword(word);
//   showMeaning(apiAns);
// });

// async function searchword(data) {
//   try {
//     const res = await fetch(url + data);
//     const ans = await res.json();
//     return ans;
//   } catch (e) {
//     console.log("error-", e);
//     //return -1;
//   }
// }

// function showMeaning(jsonData) {
//   console.log(jsonData);
//   console.log("this is json data");
  
//   if (Array.isArray(jsonData)) {
//     const word = jsonData[0].word;
//     const phonetic = jsonData[0].phonetic;
//     const origin = jsonData[0].origin;
//     const meanings = jsonData[0].meanings;

//     console.log("Word:", word);
//     console.log("Phonetic:", phonetic);
//     console.log("Origin:", origin);

//     meanings.forEach(meaning => {
//       console.log("Part of speech:", meaning.partOfSpeech);
//       meaning.definitions.forEach(definition => {
//         console.log("Definition:", definition.definition);
//         console.log("Example:", definition.example);
//       });
//     });
//   } else {
//     console.log("No results found.");
//   }
// }

