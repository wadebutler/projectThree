const cards = document.querySelectorAll(".card");
let flippedCard = false;
let boardLock = false;
let score = 0;
let firstCard;
let secondCard;

// adds flip class to html which flips the cards
function flipCard() {
    debug()
    this.classList.add("flip");

    if (flippedCard === false) {
        flippedCard = true;
        firstCard = this;
    } else {
        flippedCard = false;
        secondCard = this;

        if (firstCard.dataset.number === secondCard.dataset.number) {
            firstCard.removeEventListener("click", flipCard);
            secondCard.removeEventListener("click", flipCard);
            scoreControl()
            resetCards();

        } else {
            missMatchReset();
        }
    }
}

function debug() {
    if (boardLock === true) { return }
    if (this === firstCard) { return }
}

function missMatchReset() {
    boardLock = true;

    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");

        resetCards();
    }, 1500);
}

function scoreControl() {
    score++;

    document.querySelector(".score").textContent = score;

    if (score === 4) {
        console.log("you win!");
    }
}

function resetCards() {
    flippedCard = false;
    boardLock = false;
    firstCard = null
    secondCard = null;
}

function shuffle() {
    cards.forEach(card => {
        let randomSpot = Math.floor(Math.random() * 8);
        card.style.order = randomSpot;
    })
}

cards.forEach(card => card.addEventListener("click", flipCard))

$(document).ready(function () {
    shuffle();

    // RESET BUTTON
    $(".reset").click(() => {
        $(".card").removeClass("flip");
        shuffle();
    })
});