const cards = document.querySelectorAll(".card");

let flippedCard = false;
let boardLock = false;
let firstCard;
let secondCard;

// adds flip class to html which flips the cards
function flipCard() {
    if (boardLock === true) {return} 
    if (this === firstCard) {return}

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

            resetBoard();
        } else {
            boardLock = true;

            setTimeout(() => {
                firstCard.classList.remove("flip");
                secondCard.classList.remove("flip");

                resetBoard();
            }, 1500);
        }
    }
}

function resetBoard() {
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