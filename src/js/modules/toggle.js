const toggleButton = document.querySelector('.navigation__toggle');
const navigationElement = document.querySelector('.navigation');
const navigationList = document.querySelector('.navigation__list');

toggleButton.addEventListener('click', () => {
  navigationElement.classList.toggle('navigation--open');

  if (navigationElement.classList.contains('navigation--open')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }
});

const closeMenu = () => {
  navigationElement.classList.remove('navigation--open');
  document.body.style.overflow = 'auto';
};

navigationList.addEventListener('click', (evt) => {
  if (evt.target.nodeName.toLowerCase() !== 'a') {
    return;
  }

  closeMenu();
});

document.addEventListener('click', (evt) => {
  if ((document.documentElement.clientWidth - evt.clientX) > navigationList.clientWidth && evt.clientX !== 0) {
    closeMenu();
  }
});
