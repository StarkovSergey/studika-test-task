import { pets } from '../data/pets.js';
import { preventScroll, closeMenuEsc } from './util.js';

const createModalTemplate = ({
  name, img, type, breed, description, age, inoculations, diseases, parasites,
}) => `<section class="modal  modal--open">
  <div class="modal__box">
    <button class="modal__close-button">
      <span class="visually-hidden">close modal button</span>
    </button>
    <div class="modal__content">
      <div class="modal__image">
        <img src="img/sections/friends/${img}" width="500" height="500" alt="photo of pet">
      </div>
      <div class="modal__text-column">
        <h2 class="modal__title">${name}</h2>
        <p class="modal__subtitle">${type} - ${breed}</p>
        <p class="modal__text">
          ${description}
        <dl class="modal__list">
          <div class="modal__parameter">
            <dt class="modal__term">Age:&nbsp;</dt><dd class="modal__definition">${age}</dd>
          </div>
          <div class="modal__parameter">
            <dt class="modal__term">Inoculations:&nbsp;</dt><dd class="modal__definition">${inoculations.join(', ')}</dd>
          </div>
          <div class="modal__parameter">
            <dt class="modal__term">Diseases:&nbsp;</dt><dd class="modal__definition">${diseases.join(', ')}</dd>
          </div>
          <div class="modal__parameter">
            <dt class="modal__term">Parasites:&nbsp;</dt><dd class="modal__definition">${parasites.join(', ')}</dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</section>
`;

export const renderModalElement = (name) => {
  if (document.querySelector('.modal')) {
    return;
  }

  const item = pets.find((pet) => pet.name === name);
  const modalElement = document.createElement('section');
  document.querySelector('.main').append(modalElement);
  modalElement.outerHTML = createModalTemplate(item);

  const modal = document.querySelector('.modal');
  const closeButton = document.querySelector('.modal__close-button');

  closeButton.addEventListener('click', () => {
    modal.remove();
    document.removeEventListener('wheel', preventScroll);
  });

  modal.addEventListener('click', (evt) => {
    if (!evt.target.closest('.modal__box')) {
      modal.remove();
      document.removeEventListener('wheel', preventScroll);
    }
  });

  document.addEventListener('wheel', preventScroll, { passive: false });
  document.addEventListener('keydown', closeMenuEsc);
};
