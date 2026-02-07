
import fs from "fs";

const API_URL = "https://onepiece-cardgame.dev/api/cards";

async function run() {
  const res = await fetch(API_URL);
  const json = await res.json();

  const cards = {};

  json.data.forEach(card => {
    if (!card.card_code) return;

    cards[card.card_code] = {
      name_en: card.name,
      name_jp: card.name_jp,
      set: card.card_code.split("-")[0],
      rarity: card.rarity,
      color: card.color,
      image: card.image_url
    };
  });

  fs.writeFileSync(
    "data/cards.json",
    JSON.stringify(cards, null, 2)
  );

  console.log("cards.json generated:", Object.keys(cards).length);
}

run();
