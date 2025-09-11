const API_SUGGEST = "https://api.datamuse.com/sug?s=";
const API_DICT = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const searchInput = document.getElementById("searchInput");
const suggestionsList = document.getElementById("suggestionsList");
const resultsBox = document.getElementById("resultsBox");
const historyBox = document.getElementById("historyBox");
const modeToggle = document.getElementById("modeToggle");

let history = [];
let debounceTimer;

// 🔍 Debounced Suggestions
searchInput.addEventListener("input", () => {
  clearTimeout(debounceTimer);
  const query = searchInput.value.trim();
  if (!query) {
    suggestionsList.innerHTML = "";
    return;
  }

  debounceTimer = setTimeout(() => {
    fetch(API_SUGGEST + query)
      .then((res) => res.json())
      .then((data) => {
        suggestionsList.innerHTML = data
          .map(
            (s) =>
              `<li><button class="word-btn" onclick="searchWord('${s.word}')">${s.word}</button></li>`
          )
          .join("");
      })
      .catch(() => (suggestionsList.innerHTML = ""));
  }, 400);
});

// 🔍 Search on Enter
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchWord(searchInput.value.trim());
    suggestionsList.innerHTML = "";
  }
});

// 📖 Fetch Word Details
async function searchWord(word) {
  if (!word) return;

  try {
    const res = await fetch(API_DICT + word);
    if (!res.ok) throw new Error("Word not found");
    const data = await res.json();
    const entry = data[0];

    resultsBox.innerHTML = `
      <h3>${entry.word}</h3>
      ${
        entry.phonetics[0]?.text
          ? `<p><i>${entry.phonetics[0].text}</i></p>`
          : ""
      }
      ${entry.meanings
        .map(
          (m) => `
        <div>
          <strong>${m.partOfSpeech}</strong>
          <ul>
            ${m.definitions
              .map(
                (d) => `
              <li>
                ${d.definition}
                ${d.example ? `<br><em>Example: ${d.example}</em>` : ""}
                ${
                  d.synonyms?.length
                    ? `<br>Synonyms: ${d.synonyms
                        .map(
                          (s) =>
                            `<button class="word-btn" onclick="searchWord('${s}')">${s}</button>`
                        )
                        .join(", ")}`
                    : ""
                }
              </li>
            `
              )
              .join("")}
          </ul>
        </div>
      `
        )
        .join("")}
    `;

    // Update history
    history = [word, ...history.filter((w) => w !== word)].slice(0, 5);
    renderHistory();
  } catch (err) {
    resultsBox.innerHTML = `<p style="color:red;">❌ Word not found</p>`;
  }
}

// 📜 Render History
function renderHistory() {
  historyBox.innerHTML = history
    .map((w) => `<button onclick="searchWord('${w}')">${w}</button>`)
    .join(" ");
}

// 🌙 Dark/Light Mode Toggle
modeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  modeToggle.textContent = document.body.classList.contains("dark")
    ? "☀️"
    : "🌙";
});
