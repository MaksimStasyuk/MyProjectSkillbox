export class Card {
  _open = false;
  _success = false;
  _cardNumber;

  constructor(container, cardNumber, flip) {
    this.container = container;
    this.createElement(flip);
    this.cardNumber = cardNumber;
  }
  //Создание карточки
  createElement(flip) {
    const $card = document.createElement('div');
    $card.classList.add('card');
    this.container.append($card);

    $card.addEventListener('click', () => {
      if (this.open === false && this.success === false) {
        this.open = true;
        flip(this)
      }
    })
    this.$card = $card

    return $card;
  }
  // Добавление номени карточки
  set cardNumber(value) {
    this._cardNumber = value;
    if (this.$card) {
      this.$card.textContent = value;
    }
  }

  get cardNumber() {
    return this._cardNumber;
  }
  //Добавление класса открытой карточки
  set open(value) {
    this._open = value;
    value ? this.$card.classList.add('open') : this.$card.classList.remove('open');
  }

  get open() {
    return this._open;
  }
  // Добавление класса угаданной карты
  set success(value) {
    this._success = value;
    value ? this.$card.classList.add('success') : this.$card.classList.remove('success');
  }
  get success() {
    return this._success;
  }
}
