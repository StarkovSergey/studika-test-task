import { pets } from '../data/pets.js';
import { renderModalElement } from './modal.js';
import { makeRandomInteger } from './util.js';

const BUTTON_LEFT = document.querySelector('.slider__button--prev');
const BUTTON_RIGHT = document.querySelector('.slider__button--next');
const CAROUSEL = document.querySelector('.slider__carousel');
const LIST_LEFT = document.querySelector('.slider__list--left');
const LIST_RIGHT = document.querySelector('.slider__list--right');
const LIST_ACTIVE = document.querySelector('.slider__list--active');

LIST_ACTIVE?.addEventListener('click', (evt) => {
  if (evt.target.closest('li')) {
    renderModalElement(evt.target.closest('li').querySelector('.item__name').textContent);
  }
});

const moveLeft = () => {
  CAROUSEL.classList.add('transition-left');
  BUTTON_LEFT.removeEventListener('click', moveLeft);
  BUTTON_RIGHT.removeEventListener('click', moveRight);
};

const moveRight = () => {
  CAROUSEL.classList.add('transition-right');
  BUTTON_LEFT.removeEventListener('click', moveLeft);
  BUTTON_RIGHT.removeEventListener('click', moveRight);
};

BUTTON_LEFT?.addEventListener('click', moveLeft);
BUTTON_RIGHT?.addEventListener('click', moveRight);

const createItemTemplate = ({ name, img }) => `<li class="item" data-name=${name}>
  <a class="item__link">
    <h3 class="item__name section__main-text">${name}</h3>
    <div class="item__image">
      <img
        src="img/sections/friends/${img}"
        alt="Katrine"
      />
    </div>
    <button class="button button--border">Learn more</button>
  </a>
</li>`;

export const renderItemElement = (pet, parent) => {
  const itemElement = document.createElement('li');
  parent.append(itemElement);
  itemElement.outerHTML = createItemTemplate(pet);
};

const renderThreeItems = (parent) => {
  for (let i = 0; i < 3; i++) {
    let index = makeRandomInteger(0, pets.length - 1);

    while (document.querySelector(`[data-name=${pets[index].name}]`)) {
      index = makeRandomInteger(0, pets.length - 1);
    }

    renderItemElement(pets[index], parent);
  }
};

const renderSidesItems = () => {
  renderThreeItems(LIST_LEFT);
  LIST_RIGHT.innerHTML = LIST_LEFT.innerHTML;

  // turn off tabIndex for accessibility
  document.querySelectorAll('.slider__list:not(.slider__list--active) button').forEach((itemElement) => {
    itemElement.setAttribute('tabindex', '-1');
  });
};

CAROUSEL?.addEventListener('animationend', (animationEvent) => {
  if (animationEvent.animationName === 'move-left') {
    CAROUSEL.classList.remove('transition-left');
    LIST_ACTIVE.innerHTML = LIST_LEFT.innerHTML;
  } else {
    CAROUSEL.classList.remove('transition-right');
    LIST_ACTIVE.innerHTML = LIST_RIGHT.innerHTML;
  }

  LIST_LEFT.innerHTML = '';
  LIST_RIGHT.innerHTML = '';
  renderSidesItems();

  BUTTON_LEFT.addEventListener('click', moveLeft);
  BUTTON_RIGHT.addEventListener('click', moveRight);
});

if (document.querySelector('.slider')) {
  renderThreeItems(LIST_ACTIVE);
  renderSidesItems();
}
