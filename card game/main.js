function cardGame(game = document.getElementById('game'), cardPairs = 4) {
  let firstCard = null;
  let secondCard = null;
  const cardNumberArray = [];
  // cсоздаем массив чисел
  for (let i = 1; i <= cardPairs; i++) {
    cardNumberArray.push(i, i)
  }
  // перемешиваем массив
  for (let i = 0; i < cardNumberArray.length; i++) {
    let indexRandom = Math.floor(Math.random() * cardNumberArray.length);
    let temp = cardNumberArray[i];
    cardNumberArray[i] = cardNumberArray[indexRandom]
    cardNumberArray[indexRandom] = temp
  }

  // создаем карточки
  for (const cardNumber of cardNumberArray) {
    let card = document.createElement('div');
    card.classList.add('card')
    card.textContent = cardNumber;
    game.append(card)

    card.addEventListener('click', function () {

      if (card.classList.contains("card__open") || card.classList.contains("card__loyal")) {
        return
      }

      if (firstCard !== null && secondCard !== null) {
        firstCard.classList.remove("card__open");
        secondCard.classList.remove("card__open");
        firstCard = null;
        secondCard = null
      }
      card.classList.add('card__open')

      if (firstCard === null) {
        firstCard = card;
      } else {
        secondCard = card
      }

      if (firstCard !== null && secondCard !== null) {
        if (firstCard.textContent === secondCard.textContent) {
          firstCard.classList.add("card__loyal");
          secondCard.classList.add("card__loyal");
        }
      }

      if (cardNumberArray.length === document.querySelectorAll(".card__loyal").length) {
        setTimeout(function () {
          let button = document.createElement('button');
          button.classList.add('game__btn');
          button.textContent = 'Сыграть еще раз';
          game.append(button)
          button.addEventListener('click',function(){
            game.innerHTML = '';
            cardGame();
          })
        }, 300)
      }
    })
  }
}

cardGame();

























// // Этап 1. Создайте функцию, генерирующую массив парных чисел. Пример массива, который должна возвратить функция: [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8].count - количество пар.

// function createNumbersArray(count) {

// }

// // Этап 2. Создайте функцию перемешивания массива.Функция принимает в аргументе исходный массив и возвращает перемешанный массив. arr - массив чисел

// function shuffle(arr) {

// }

// // Этап 3. Используйте две созданные функции для создания массива перемешанными номерами. На основе этого массива вы можете создать DOM-элементы карточек. У каждой карточки будет свой номер из массива произвольных чисел. Вы также можете создать для этого специальную функцию. count - количество пар.

// function startGame(count) {

// }
