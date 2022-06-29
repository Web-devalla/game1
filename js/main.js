import Card from "./card.js"
const audioCorrectAnswer = document.querySelector("#correct");
newGame(document.getElementById('game'), 6);

    let buttons = document.querySelectorAll('.btn');
    let cont = document.querySelector('.game');

    buttons.forEach((btn) => {
        btn.addEventListener('click', function (e) {
            
            if(e.target.innerHTML == 8) {
                cont.innerHTML = '';
                newGame(document.getElementById('game'), 8);
            } else if (e.target.innerHTML == 10){
                cont.innerHTML = '';
                newGame(document.getElementById('game'), 10);
            } else if (e.target.innerHTML == 12){
                cont.innerHTML = '';
                newGame(document.getElementById('game'), 12);
            } else if (e.target.innerHTML == 20){
                cont.innerHTML = '';
                newGame(document.getElementById('game'), 20);
            }
        });
    });
    
function newGame(container, cardsCount){
    // создать поле
    let cardsNumberArr = [];
    let cardsArr = [];
    let firstCard = null,
        secondCard = null
    for(let i = 1; i <= cardsCount / 2; i++) {
        cardsNumberArr.push(i);
        cardsNumberArr.push(i);
    }
    cardsNumberArr = cardsNumberArr.sort(() => Math.random() - 0.5);

    for (const cardNumber of cardsNumberArr) {
        cardsArr.push(new Card(container, cardNumber, flip)) 
    }
    

    // логика
    function flip(card) {
        if(firstCard !== null && secondCard!== null) {
            if(firstCard.number != secondCard.number) {
                firstCard.open = false;
                secondCard.open = false;
                firstCard = null;
                secondCard = null;
            }
        }
        if (firstCard == null) {
            firstCard = card;
        } else {
            if(secondCard == null) {
                secondCard = card;
            }
        }
        if(firstCard !== null && secondCard!== null) {
            if(firstCard.number == secondCard.number) {
                audioCorrectAnswer.play();
                firstCard.success = true;
                secondCard.success = true;
                firstCard = null;
                secondCard = null;
            }
        }
        if (document.querySelectorAll('.card.success').length == cardsNumberArr.length) {
            // сброс игры
            modalOver();
            container.innerHTML = '';
            cardsNumberArr = [];
            cardsArr = [];
            firstCard = null;
            secondCard = null;
            newGame(container, cardsCount);
        }
    }
}



const modalOver= () => {
    document.querySelector('.over-modal').classList.add('active');
};

const tryAgain = () => {
    window.location.reload();
};
let btnTryAgain = document.getElementById('btn-try-again');
btnTryAgain.addEventListener('click', tryAgain);
