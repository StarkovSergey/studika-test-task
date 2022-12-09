const nav = document.querySelector('.nav')
const navigationList = document.querySelector('.nav__list')
const buttonRight = document.querySelector('.nav__button--right')
const buttonLeft = document.querySelector('.nav__button--left')

buttonRight.addEventListener('click', () => {
  nav.classList.add('nav--right-shift')
  const shift = navigationList.scrollWidth - 1200
  navigationList.style.cssText = `transform: translateX(-${shift}px);`
})
buttonLeft.addEventListener('click', () => {
  nav.classList.remove('nav--right-shift')
  navigationList.style.cssText = `transform: translateX(0)`
})
