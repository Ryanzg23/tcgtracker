
import {
  loadCollection,
  addCard,
  removeCard,
  updateQty
} from "./collection.js";

function render() {
  const collection = loadCollection();
  const list = document.getElementById("collection");
  list.innerHTML = "";

  Object.entries(collection).forEach(([cardId, data]) => {
    const div = document.createElement("div");
    div.className = "card-row";
    div.innerHTML = `
      <strong>${cardId}</strong>
      <span>Qty: ${data.qty}</span>
      <button data-id="${cardId}" class="remove">Remove</button>
    `;
    list.appendChild(div);
  });
}

document.getElementById("add-demo").addEventListener("click", () => {
  addCard("OP01-016", 1, "NM", "JP");
  render();
});

document.addEventListener("click", e => {
  if (e.target.classList.contains("remove")) {
    removeCard(e.target.dataset.id);
    render();
  }
});

render();
