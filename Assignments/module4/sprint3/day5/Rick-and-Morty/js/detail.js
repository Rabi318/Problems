const params = new URLSearchParams(window.location.search);
const characterId = params.get("id");
const container = document.getElementById("character-details");

async function loadCharacter() {
  try {
    const res = await fetch(
      `https://rickandmortyapi.com/api/character/${characterId}`
    );
    const character = await res.json();

    const episodes = character.episode.length;
    container.innerHTML = `
      <img src="${character.image}" alt="${character.name}" />
    <h2>${character.name}</h2>
    <p><strong>Status:</strong> ${character.status}</p>
    <p><strong>Species:</strong> ${character.species}</p>
    <p><strong>Type:</strong> ${character.type || "N/A"}</p>
    <p><strong>Gender:</strong> ${character.gender}</p>
    <p><strong>Origin:</strong> ${character.origin.name}</p>
    <p><strong>Location:</strong> ${character.location.name}</p>
    <p><strong>Episode Appearances:</strong> ${episodes}</p>
    `;
  } catch (error) {
    console.log(error);
  }
}
loadCharacter();

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
