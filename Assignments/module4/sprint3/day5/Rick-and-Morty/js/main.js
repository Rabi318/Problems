const gallery = document.getElementById("gallery");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let apiPage = 1;
let chunkPage = 0;
let characters = [];

const CHUNK_SIZE = 6;

async function fetchCharactersFromApi(page) {
  const res = await fetch(
    `https://rickandmortyapi.com/api/character?page=${page}`
  );
  const data = await res.json();
  characters = data.results;
  chunkPage = 0;
  renderCharacters();
  updateButtons(data.info);
}

function renderCharacters() {
  gallery.innerHTML = "";
  const start = chunkPage * CHUNK_SIZE;
  const end = start + CHUNK_SIZE;
  const currentChunk = characters.slice(start, end);

  currentChunk.forEach((character) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${character.image}" alt="${character.name}" />
      <h3>${character.name}</h3>
      <p>${character.species} - ${character.status}</p>
      <a href="character.html?id=${character.id}" target="_blank">View Details</a>
    `;
    gallery.appendChild(card);
  });
}

function updateButtons(apiInfo) {
  // Enable/disable next/prev buttons based on chunkPage and API info
  const maxChunk = Math.ceil(characters.length / CHUNK_SIZE);

  prevBtn.disabled = apiPage === 1 && chunkPage === 0;
  nextBtn.disabled = chunkPage + 1 >= maxChunk && !apiInfo.next;
}

prevBtn.addEventListener("click", async () => {
  if (chunkPage > 0) {
    chunkPage--;
    renderCharacters();
  } else if (apiPage > 1) {
    apiPage--;
    await fetchCharactersFromApi(apiPage);
    chunkPage = Math.floor(characters.length / CHUNK_SIZE) - 1;
    renderCharacters();
  }
});

nextBtn.addEventListener("click", async () => {
  const maxChunk = Math.ceil(characters.length / CHUNK_SIZE);
  if (chunkPage + 1 < maxChunk) {
    chunkPage++;
    renderCharacters();
  } else {
    apiPage++;
    await fetchCharactersFromApi(apiPage);
  }
});

fetchCharactersFromApi(apiPage);

// Live Clock
function updateClock() {
  const now = new Date();
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  const time = now.toLocaleTimeString("en-GB");
  const date = now.toLocaleDateString("en-US", options);
  document.getElementById("clock").textContent = `${time} ${date}`;
}
setInterval(updateClock, 1000);
updateClock();
