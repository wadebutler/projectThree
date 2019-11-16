const cards = document.querySelectorAll(".card");
const gameScreen = document.querySelector(".game");
const homeScreen = document.querySelector(".homeScreen");
const winScreen = document.querySelector(".winScreen");
const instructionScreen = document.querySelector(".instructionScreen");
let flippedCard = false;
let boardLock = false;
let score = 0;
let firstCard;
let secondCard;

// GAME FUNCTIONALITY START
cards.forEach(card => card.addEventListener("click", flipCard))

function flipCard() {
    if (boardLock === true) { return }
    if (this === firstCard) { return }

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

    if (score === 8) {
        gameWin();
    }
}

function resetCards() {
    flippedCard = false;
    boardLock = false;
    firstCard = null
    secondCard = null;
}

function shuffle() {
    $(function () {
        var parent = $(".gameBoard");
        var divs = parent.children();
        while (divs.length) {
            parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
        }
    });
}

function playAgain() {
    if (winScreen.style.display = "block") {
        winScreen.style.display = "none"
        gameScreen.style.display = "block"
        cards.forEach(card => card.classList.remove("flip"));
        resetCards();
        shuffle();
        score = 0;
        document.querySelector(".score").textContent = score;
        cards.forEach(card => card.addEventListener("click", flipCard))
    }
}
// GAME FUNCTIONALITY END

// GAME SCREEN SWITCH START
function gameSwitch() {
    if (gameScreen.style.display = "none") {
        gameScreen.style.display = "block";
        homeScreen.style.display = "none";
        instructionScreen.style.display = "none";
        winScreen.style.display = "none";
    }
}

function instructionSwitch() {
    if (instructionScreen.style.display = "none") {
        instructionScreen.style.display = "flex";
        homeScreen.style.display = "none";

    }
}

function goHome() {
    if (gameScreen.style.display = "block") {
        gameScreen.style.display = "none";
        homeScreen.style.display = "flex";
    }
}

function gameWin() {
    gameScreen.style.display = "none";
    winScreen.style.display = "flex";
}
// GAME SCREEN SWITCH END

// ON LOAD
$(document).ready(function () {
    shuffle();

    // RESET BUTTON
    $(".reset").click(() => {
        $(".card").removeClass("flip");
        shuffle();
        cards.forEach(card => card.addEventListener("click", flipCard))
    })
});