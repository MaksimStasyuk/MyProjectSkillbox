import { AmazingCard } from "./amazingCard.js";

function newGame(container, cardCount) {
    let cardsNumberArray = [],
        cardsArray = [],
        firstCard = null,
        secondCard = null;

    //Наполнение масссива номеров карточек
    for (let i = 1; i <= cardCount / 2; i++) {
        cardsNumberArray.push(i);
        cardsNumberArray.push(i);
    }
    cardsNumberArray.sort(() => Math.random() - 0.5);

    // создание массива карт и вызов класса карточек
    for (const number of cardsNumberArray) {
        cardsArray.push = new AmazingCard(container, number, flip);
    }

    // логика игры
    function flip(card) {
        if (firstCard !== null && secondCard !== null) {
            if (firstCard.cardNumber !== secondCard.cardNumber) {
                firstCard.open = false;
                secondCard.open = false;
                firstCard = null;
                secondCard = null;
            }
        }

        if (firstCard === null) {
            firstCard = card;
        } else if (secondCard === null) {
            secondCard = card;
        }

        if (firstCard !== null && secondCard !== null) {
            if (firstCard.cardNumber === secondCard.cardNumber) {
                firstCard.success = true;
                secondCard.success = true;
                firstCard = null;
                secondCard = null;
            }
        }

        //окончание игры срос до начальных значений

        if (document.querySelectorAll('.card.success').length === cardCount) {
            setTimeout(() => {
                const $titleVictory = document.createElement('h2'),
                    $btnNewGame = document.createElement('button');

                $titleVictory.classList.add('titleVictory');
                $btnNewGame.classList.add('btnNewGame');

                $titleVictory.textContent = 'Вы победили!'
                $btnNewGame.textContent = 'Играть ещё';
                container.after($titleVictory, $btnNewGame);

                $btnNewGame.addEventListener('click', () => {
                    container.innerHTML = '';
                    cardsNumberArray = [],
                        cardsArray = [],
                        firstCard = null,
                        secondCard = null;
                    newGame(container, cardCount);
                    $titleVictory.remove();
                    $btnNewGame.remove();
                })
            }, 500);
        }
    }
}

newGame(document.getElementById('game'), 6)
