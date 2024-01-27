// Globally Varbles Incloud Value
let tries = 0;

// Manager Tries
document.querySelector(".tries span").innerHTML = tries;

// Manager Game Zone
let getBlockGame = document.querySelector(".game-blocks");

// Manager Start Game
document.querySelector(".control-game span").onclick = function () {
  let getName = prompt("Whats Your Name ?");

  let myName = document.querySelector(".name span");

  if (getName == null || getName == "") {
    myName.innerHTML = `Unknown`;
  } else {
    myName.innerHTML = getName;
  }

  document.querySelector(".control-game").remove();
};

// Array From Cards
let cards = Array.from(getBlockGame.children);

// Array from Index Cards
let indexsCards = [...Array(cards.length).keys()];

cards.forEach((card) => {
  // Get Random Value From Array Index Cards
  let randomIndex = indexsCards[Math.floor(Math.random() * indexsCards.length)];

  // Add The Order Of RandomIndex
  card.style.order = randomIndex;

  // Remove The Randon Index From Indexs Cards
  indexsCards = indexsCards.filter((e) => e !== randomIndex);

  // Flipped Card
  card.addEventListener("click", () => {
    card.classList.add("is-flipped");
    flippedCard();
  });
});

// Function Filpped Card
function flippedCard() {
  let allFlippedCard = cards.filter((flippedCard) =>
    flippedCard.classList.contains("is-flipped")
  );
  if (allFlippedCard.length === 2) {
    // Stop Clicking Function
    getBlockGame.classList.add(`no-clicking`);

    // Remove Class No Clicking
    setTimeout(() => {
      allFlippedCard.forEach((card) => card.classList.remove("is-flipped"));
      getBlockGame.classList.remove(`no-clicking`);

      if (
        allFlippedCard[0].dataset.tecnology ===
        allFlippedCard[1].dataset.tecnology
      ) {
        allFlippedCard.forEach((card) => card.classList.add("is-matched"));
        document.getElementById("success").play();
      } else {
        tries++;
        document.querySelector(".tries span").innerHTML = tries;
        document.getElementById("field").play();
      }
    }, 1000);
  }
}
