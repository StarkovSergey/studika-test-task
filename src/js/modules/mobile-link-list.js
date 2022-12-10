const menuButtons = document.querySelectorAll('[data-category-menu]')
const lists = document.querySelectorAll('[data-category-list]')

menuButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    const category = e.target.dataset.categoryMenu

    menuButtons.forEach(item => {
      if (item.dataset.categoryMenu === category) {
        item.closest('li')
          .classList
          .add('mobile-nav-box__categories-item--active')
      } else {
        item.closest('li')
          .classList
          .remove('mobile-nav-box__categories-item--active')
      }
    })

    lists.forEach(list => {
      if (list.dataset.categoryList === category) {
        list.classList.add('mobile-link-list--active')
      } else {
        list.classList.remove('mobile-link-list--active')
      }
    })
  })
})
