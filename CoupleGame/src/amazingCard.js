import { Card } from "./card.js";

export class AmazingCard extends Card {

  set cardNumber(value) {
    const cardsImgArray = [
      'https://ltdfoto.ru/images/2023/06/30/BEZ-NAZVANIY-1.jpg',
      'https://ltdfoto.ru/images/2023/06/30/188d63914b79608db.jpg',
      'https://ltdfoto.ru/images/2023/06/30/BEZ-NAZVANIY.jpg',

    ];
    const defaultcardsImgArray = [
      './img/1.webp',
      './img/2.webp',
      './img/3.webp',
    ]
    //создаем картинку
    const $img = document.createElement('img');
    $img.classList.add('img')
    $img.src = cardsImgArray[value - 1];
    //в случае ошибки загружаем картинку по умолчанию
    $img.onerror = () => {
      $img.src = defaultcardsImgArray[value - 1];
      console.log('Ошибка загрузки изображения');
    }
    //добавляем картинку на карточку
    this.$card.append($img)

    this.$img = $img;
    this._cardNumber = value
  }

  get cardNumber() {
    return this._cardNumber
  }
  //добавляем классы открытия картинки
  set open(value) {
    super.open = value;
    this._open = value;
    value ? this.$img.classList.add('open') : this.$img.classList.remove('open');
  }

  get open() {
    return this._open;
  }
}




