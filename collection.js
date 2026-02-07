
const STORAGE_KEY = "opc_collection";

export function loadCollection() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

export function saveCollection(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function addCard(cardId, qty = 1, condition = "NM", language = "JP") {
  const collection = loadCollection();

  if (!collection[cardId]) {
    collection[cardId] = { qty: 0, condition, language };
  }

  collection[cardId].qty += qty;
  saveCollection(collection);
}

export function removeCard(cardId) {
  const collection = loadCollection();
  delete collection[cardId];
  saveCollection(collection);
}

export function updateQty(cardId, qty) {
  const collection = loadCollection();
  if (collection[cardId]) {
    collection[cardId].qty = Math.max(0, qty);
    if (collection[cardId].qty === 0) {
      delete collection[cardId];
    }
    saveCollection(collection);
  }
}
