
let CARD_DB = null;

export async function loadCards() {
  if (CARD_DB) return CARD_DB;

  const res = await fetch("/data/cards.json");
  CARD_DB = await res.json();
  return CARD_DB;
}

export function getCard(cardId) {
  return CARD_DB?.[cardId] || null;
}
