import {
  loadCollection,
  addCard,
  removeCard
} from "./collection.js";

import {
  loadCards
} from "./cards.js";

/* ---------- RENDER COLLECTION ---------- */

async function render() {
  const collection = loadCollection();
  const cards = await loadCards();
  const list = document.getElementById("collection");

  list.innerHTML = "";

  const entries = Object.entries(collection);

  if (entries.length === 0) {
    list.innerHTML = `<p style="opacity:.6">No cards added yet.</p>`;
    return;
  }

  entries.forEach(([cardId, data]) => {
    const card = cards[cardId];

    if (!card) return; // safety check

    const row = document.createElement("div");
    row.className = "card-row";

    row.innerHTML = `
      <img src="${card.image}" alt="${card.name_en}" class="card-img">

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

/* ---------- DEMO ADD BUTTON ---------- */

document.getElementById("add-demo").addEventListener("click", () => {
  // demo card – safe to remove later
  addCard("OP01-016", 1, "NM", "JP");
  render();
});

/* ---------- REMOVE HANDLER ---------- */

document.addEventListener("click", e => {
  if (e.target.classList.contains("remove")) {
    removeCard(e.target.dataset.id);
    render();
  }
});

/* ---------- INIT ---------- */

render();
