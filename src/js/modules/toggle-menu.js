const toggleButton = document.querySelector('.menu-button')
const navigationElement = document.querySelector('.nav-modal')
const closeMenuButton = document.querySelector('.modal-menu__close-button')
const shadow = document.querySelector('.modal-menu__shadow')

const closeMenu = () => {
  navigationElement.classList.remove('nav-modal--open')
  document.body.style.overflow = 'auto'
}

toggleButton.addEventListener('click', () => {
  console.log(333)
  navigationElement.classList.toggle('nav-modal--open')

  if (navigationElement.classList.contains('nav-modal--open')) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'auto'
  }
})

closeMenuButton.addEventListener('click', closeMenu)
shadow.addEventListener('click', closeMenu)
