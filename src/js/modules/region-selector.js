import SimpleBar from 'simplebar'
import { createLabelsTemplate, createRegionTemplate } from './templates-creators.js'
import { applyOccurrence, isOccurrence } from '../utils/util.js'
import { getCookie, setCookie } from '../utils/cookie.js'

export class RegionSelector {
  chosenRegions = []

  constructor(subscribe, regions, textElement, button, modalMenu, loader, container) {
    this.subscribe = subscribe
    this.regions = regions
    this.textElement = textElement
    this.button = button
    this.modalMenu = modalMenu
    this.loader = loader
    this.container = container
    this.filteredRegions = regions

    this.labels = modalMenu.querySelector('[data-region-labels]')
    this.saveButton = modalMenu.querySelector('[data-region-save]')
    this.input = modalMenu.querySelector('[data-region-input]')

    this.clickHandler = this.clickHandler.bind(this)
    this.clickRegionHandler = this.clickRegionHandler.bind(this)
    this.labelsClickHandler = this.labelsClickHandler.bind(this)
    this.saveButtonClickHandler = this.saveButtonClickHandler.bind(this)
    this.inputKeyUpHandler = this.inputKeyUpHandler.bind(this)

    this.container.addEventListener('click', this.clickRegionHandler)
    this.button.addEventListener('click', this.clickHandler)
    this.labels.addEventListener('click', this.labelsClickHandler)
    this.saveButton.addEventListener('click', this.saveButtonClickHandler)
    this.input.addEventListener('keyup', this.inputKeyUpHandler)

    this.#renderTextElements()
  }

  #renderTextElements() {
    this.textElement.innerText = JSON.parse(getCookie('region'))[0].name
  }

  showLoader() {
    this.loader.classList.add('active')
  }

  hideLoader() {
    this.loader.classList.remove('active')
  }

  clickHandler(evt) {
    this.modalMenu.classList.toggle('active')
    evt.stopImmediatePropagation()

    const handler = (e) => {
      if (!e.target.closest('[data-region-modal]')) {
        this.modalMenu.classList.remove('active')

        document.removeEventListener('click', handler)
      }
    }

    if (this.modalMenu.classList.contains('active')) {
      document.addEventListener('click', handler)
    }

    if (this.regions.length === 0) this.#getData()
  }

  clickRegionHandler(e) {
    const buttonElement = e.target.closest('button')

    if (buttonElement) {

      if (this.chosenRegions.some(region => region.id === buttonElement.id)) {
        this.chosenRegions = this.chosenRegions.filter(region => region.id !== buttonElement.id)
      } else {
        this.chosenRegions.push({
          name: buttonElement.dataset.regionName,
          id: buttonElement.id,
        })
      }

      this.renderLabels()
    }
  }

  labelsClickHandler(e) {
    if (e.target.nodeName.toLowerCase() === 'button') {
      this.chosenRegions = this.chosenRegions.filter(region => region.id !== e.target.dataset.labelId)
      this.renderLabels()
    }
  }

  inputKeyUpHandler(e) {
    const buttons = this.container.querySelectorAll('button')
    buttons.forEach(button => {
      if (isOccurrence(e.target.value, button.dataset.regionName)) {
        button.classList.remove('hide')

        if (button.dataset.regionType === 'city') {
          button.querySelector('.region-menu__title').innerHTML = applyOccurrence(e.target.value, button.dataset.regionName)
          button.querySelector('.region-menu__subtitle').innerHTML = applyOccurrence(e.target.value, button.dataset.regionName)
        } else {
          button.innerHTML = applyOccurrence(e.target.value, button.dataset.regionName)
        }
      } else {
        button.classList.add('hide')
      }
    })
  }

  #getData() {
    this.showLoader()
    fetch(`https://studika.ru/api/areas`, {
      method: 'POST',
    })
      .then((response) => response.json())
      .then(regions => {
        this.regions = regions
        this.filteredRegions = regions
        this.subscribe(this.regions)
        this.renderList()
        this.hideLoader()
      })
      .catch(e => {
        console.warn(e)
        this.hideLoader()
      })
  }

  saveButtonClickHandler() {
    setCookie('region', JSON.stringify(this.chosenRegions))

    fetch(`https://studika.ru/api`, {
      method: 'post',
      headers: {
        withCredentials: true,
      },
    })
      .catch(e => {
        console.warn(e)
      })

    this.#renderTextElements()
    this.modalMenu.classList.toggle('active')
  }

  renderLabels() {
    this.labels.innerHTML = createLabelsTemplate(this.chosenRegions)
  }

  renderList() {
    const searchText = this.input.value

    this.container.innerHTML = createRegionTemplate(this.filteredRegions, searchText)
    new SimpleBar(this.container)
  }
}
