import { pets } from '../data/pets.js'
import { renderModalElement } from './modal.js'
import { makeRandomInteger, checkLessValueInObject } from './util.js'
import { renderItemElement } from './slider.js'

const PAGE_NUMBER_ELEMENT = document.querySelector('.pagination__element--page')
const PAGINATION_LIST = document.querySelector('.pets__list')
const BUTTON_NEXT = document.querySelector('.pagination__element--next')
const BUTTON_PREV = document.querySelector('.pagination__element--prev')
const BUTTON_FIRST_PAGE = document.querySelector('.pagination__element--first')
const BUTTON_LAST_PAGE = document.querySelector('.pagination__element--last')

const pagination = {
  petsIndexes: [], // [[2, 4, 1, 4, 3, 5, 6, 7, 0], [1, 6, 0, 7, 3, 4, 5, 2,], ...]
  pagesCount: 6,
  petsPerPage: 8,
  writeCounts() {
    if (window.matchMedia('(max-width: 767px)').matches) {
      this.pagesCount = 18
      this.petsPerPage = 3
    } else if (window.matchMedia('(max-width: 1279px)').matches) {
      this.pagesCount = 8
      this.petsPerPage = 6
    } else {
      this.pagesCount = 6
      this.petsPerPage = 8
    }
  },
  generatePetsIndexes() {
    if (this.pagesCount === 18) {
      const generatedIndexes = []

      for (let i = 0; i < this.pagesCount; i++) { // 8
        const indexBox = []
        for (let j = 0; j < this.petsPerPage; j++) { // 6
          let index = makeRandomInteger(0, 7)
          while (indexBox.includes(index)) {
            index = makeRandomInteger(0, 7)
          }
          indexBox.push(index)
        }
        generatedIndexes.push(indexBox)
      }
      this.petsIndexes = generatedIndexes
    } else {
      let generatedIndexes = new Array(this.pagesCount)
      generatedIndexes = generatedIndexes.fill(null).map(() => [])

      let counter = new Array(this.pagesCount)
      counter = counter.fill(null).map(() => 0)
      counter = { ...counter }

      for (let i = 0; i < pets.length; i++) {
        for (let j = 0; j < 6; j++) {
          let pageIndex = makeRandomInteger(0, this.pagesCount - 1)
          while (generatedIndexes[pageIndex].includes(i)
          || generatedIndexes[pageIndex].length > this.petsPerPage
          || checkLessValueInObject(pageIndex, counter)) {
            pageIndex = makeRandomInteger(0, this.pagesCount - 1)
          }
          counter[pageIndex] += 1

          let cartIndex = makeRandomInteger(0, this.petsPerPage - 1)
          while (generatedIndexes[pageIndex][cartIndex] || generatedIndexes[pageIndex][cartIndex] === 0) {
            cartIndex = makeRandomInteger(0, this.petsPerPage - 1)
          }

          generatedIndexes[pageIndex][cartIndex] = i
        }
      }
      this.petsIndexes = generatedIndexes
    }
  },
  currentPage: 0,
  renderPageNumber() {
    PAGE_NUMBER_ELEMENT.innerText = this.currentPage + 1
  },
  renderPaginationList() {
    PAGINATION_LIST.innerHTML = ''
    for (let i = 0; i < this.petsPerPage; i++) {
      const index = this.petsIndexes[this.currentPage][i]
      renderItemElement(pets[index], PAGINATION_LIST)
    }
  },
  renderButtons() {
    if (this.currentPage === 0) {
      BUTTON_FIRST_PAGE.disabled = true
      BUTTON_PREV.disabled = true
    } else {
      BUTTON_FIRST_PAGE.disabled = false
      BUTTON_PREV.disabled = false
    }

    if (this.currentPage === this.pagesCount - 1) {
      BUTTON_LAST_PAGE.disabled = true
      BUTTON_NEXT.disabled = true
    } else {
      BUTTON_LAST_PAGE.disabled = false
      BUTTON_NEXT.disabled = false
    }
  },
  renderPage() {
    this.renderPageNumber()
    this.renderPaginationList()
    this.renderButtons()
  },
  renderInitial() {
    this.writeCounts()
    this.generatePetsIndexes()
    this.renderPage()
    this.buttonNextHandler = this.buttonNextHandler.bind(this)
    this.buttonPrevHandler = this.buttonPrevHandler.bind(this)
    this.buttonFirstHandler = this.buttonFirstHandler.bind(this)
    this.buttonLastHandler = this.buttonLastHandler.bind(this)
    BUTTON_NEXT.addEventListener('click', this.buttonNextHandler)
    document.addEventListener('keydown', this.buttonNextHandler)
    BUTTON_PREV.addEventListener('click', this.buttonPrevHandler)
    document.addEventListener('keydown', this.buttonPrevHandler)
    BUTTON_FIRST_PAGE.addEventListener('click', this.buttonFirstHandler)
    BUTTON_LAST_PAGE.addEventListener('click', this.buttonLastHandler)

    PAGINATION_LIST.addEventListener('click', (evt) => {
      if (evt.target.closest('li')) {
        renderModalElement(evt.target.closest('li').querySelector('.item__name').textContent)
      }
    })
  },
  buttonNextHandler(evt) {
    if ((evt.key && evt.key !== 'ArrowRight') || this.currentPage >= this.pagesCount - 1) {
      return
    }

    this.currentPage += 1
    this.renderPage()
  },
  buttonPrevHandler(evt) {
    if ((evt.key && evt.key !== 'ArrowLeft') || this.currentPage <= 0) {
      return
    }

    this.currentPage -= 1
    this.renderPage()
  },
  buttonFirstHandler() {
    this.currentPage = 0
    this.renderPage()
  },
  buttonLastHandler() {
    this.currentPage = this.pagesCount - 1
    this.renderPage()
  },
}

if (document.querySelector('.pagination')) {
  pagination.renderInitial()
}
