import { loadCollection, addCard, removeCard } from "./collection.js";
import { loadCards } from "./cards.js";

let CARD_DB = {};
let SEARCH_RESULTS = [];

/* ---------- INIT ---------- */

async function init() {
  CARD_DB = await loadCards();
  renderCollection();
}

init();

/* ---------- SEARCH ---------- */

const searchInput = document.getElementById("card-search");
const resultsBox = document.getElementById("search-results");

searchInput.addEventListener("input", () => {
  const q = searchInput.value.trim().toLowerCase();

  if (!q) {
    resultsBox.innerHTML = "";
    return;
  }

  SEARCH_RESULTS = Object.entries(CARD_DB)
    .filter(([id, card]) =>
      id.toLowerCase().includes(q) ||
      card.name_en.toLowerCase().includes(q)
    )
    .slice(0, 10);

  renderSearchResults();
});

function renderSearchResults() {
  resultsBox.innerHTML = "";

  SEARCH_RESULTS.forEach(([id, card]) => {
    const div = document.createElement("div");
    div.className = "search-item";
    div.dataset.id = id;

    div.innerHTML = `
      <img src="${card.image}" />
      <div>
        <strong>${card.name_en}</strong>
        <small>${id} • ${card.rarity}</small>
      </div>
    `;

    resultsBox.appendChild(div);
  });
}

/* ---------- ADD CARD ---------- */

resultsBox.addEventListener("click", e => {
  const item = e.target.closest(".search-item");
  if (!item) return;

  const cardId = item.dataset.id;

  const qty = Number(prompt("Quantity?", "1"));
  if (!qty || qty < 1) return;

  addCard(cardId, qty, "NM", "JP");

  searchInput.value = "";
  resultsBox.innerHTML = "";

  renderCollection();
});

/* ---------- COLLECTION ---------- */

function renderCollection() {
  const collection = loadCollection();
  const list = document.getElementById("collection");

  list.innerHTML = "";

  const entries = Object.entries(collection);

  if (!entries.length) {
    list.innerHTML = `<p style="opacity:.6">No cards added yet.</p>`;
    return;
  }

  entries.forEach(([cardId, data]) => {
    const card = CARD_DB[cardId];
    if (!card) return;

    const row = document.createElement("div");
    row.className = "card-row";

    row.innerHTML = `
      <img src="${card.image}" class="card-img">
      <div class="card-info">
        <strong>${card.name_en}</strong>
        <small>${cardId} • ${card.rarity}</small>
      </div>
      <div class="card-actions">
        <span>x${data.qty}</span>
        <button class="remove" data-id="${cardId}">✖</button>
      </div>
    `;

    list.appendChild(row);
  });
}

/* ---------- REMOVE ---------- */

document.addEventListener("click", e => {
  if (e.target.classList.contains("remove")) {
    removeCard(e.target.dataset.id);
    renderCollection();
  }
});
