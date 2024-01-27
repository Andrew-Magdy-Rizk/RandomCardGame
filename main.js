// Globally Varbles Incloud Value
let tries = 0;

// Manager Tries
document.querySelector(".tries span").innerHTML = tries;

// Manager Game Zone
let getBlockGame = document.querySelector(".game-blocks");

// Manager Timer
timer = 100;
let GetSpanTimer = document.querySelector(`.time-out span`);

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
  TimeOut(timer);
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

// Create Time Out Count Function
function TimeOut(count) {
  // let textNode = document.createTextNode(count);
  GetSpanTimer.innerHTML = count;

  // console.log(count);
  if (count > 0) {
    setTimeout(() => {
      TimeOut(count - 1);
    }, 1000);
  } else {
    GetSpanTimer.innerHTML = "End Time";
    GetSpanTimer.style.color = "#fff";
    GetSpanTimer.style.backgroundColor = "#333";
    getBlockGame.classList.add(`end-game`);

    let divMassage = document.createElement("div");
    let spanMassage = document.createElement("span");
    divMassage.classList.add("control-game");
    spanMassage.innerHTML = "End Game";
    divMassage.append(spanMassage);
    document.body.appendChild(divMassage);
    spanMassage.addEventListener("click", (btnEnd) => location.reload());
  }
}
