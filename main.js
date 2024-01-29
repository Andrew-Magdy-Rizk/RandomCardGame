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
  GetSpanTimer.innerHTML = count;

  let getAllMatch = document.querySelectorAll(".is-matched");

  // If You Win
  if (getAllMatch.length === cards.length) {
    return EndGameMassage("You Win");
  }

  if (count > 0) {
    setTimeout(() => {
      TimeOut(count - 1);
    }, 1000);
  } else {
    GetSpanTimer.innerHTML = "End Time";
    GetSpanTimer.style.color = "#fff";
    GetSpanTimer.style.backgroundColor = "#333";

    EndGameMassage("End Game");
  }
}

// Function Massage
function EndGameMassage(massage) {
  // Block All Cards
  getBlockGame.classList.add(`end-game`);

  // Creata Massage
  let divMassage = document.createElement("div");
  let spanMassage = document.createElement("span");
  let SpanScore = document.createElement("span");
  let topScore = document.createElement("span");
  divMassage.classList.add("control-game");
  SpanScore.classList.add("score");
  topScore.classList.add("top-score");
  spanMassage.innerHTML = massage;
  divMassage.append(topScore);
  divMassage.append(spanMassage);
  divMassage.append(SpanScore);
  document.body.appendChild(divMassage);

  Score();
  // Start New Game
  spanMassage.addEventListener("click", () => location.reload());
}

// Create Score Function
function Score() {
  getAllMatch = document.querySelectorAll(".is-matched");
  score = getAllMatch.length / 2;
  let topScore = +localStorage.getItem("score") + score;
  massageScore = `The Score is: ${getAllMatch.length / 2}`;
  massageTopScore = `The Top Score is: ${topScore}`;
  // console.log(score);
  document.querySelector(".score").innerHTML = massageScore;
  document.querySelector(".top-score").innerHTML = massageTopScore;
  localStorage.setItem("score", topScore);
}
