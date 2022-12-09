import SimpleBar from 'simplebar'
import { createLabelsTemplate, templatesCreators } from './templates-creators.js'
import { getCookie, setCookie } from './util.js'

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

    this.labels = modalMenu.querySelector('[data-region-labels]')
    this.saveButton = modalMenu.querySelector('[data-region-save]')

    this.clickHandler = this.clickHandler.bind(this)
    this.clickRegionHandler = this.clickRegionHandler.bind(this)
    this.labelsClickHandler = this.labelsClickHandler.bind(this)
    this.saveButtonClickHandler = this.saveButtonClickHandler.bind(this)

    this.container.addEventListener('click', this.clickRegionHandler)
    this.button.addEventListener('click', this.clickHandler)
    this.labels.addEventListener('click', this.labelsClickHandler)
    this.saveButton.addEventListener('click', this.saveButtonClickHandler)

    this.renderTextElements()
  }

  renderTextElements() {
    this.textElement.innerText = JSON.parse(getCookie('region'))[0].name
  }

  showLoader() {
    this.loader.classList.add('active')
  }

  hideLoader() {
    this.loader.classList.remove('active')
  }

  clickHandler() {
    this.modalMenu.classList.toggle('active')

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

  #getData() {
    this.showLoader()
    fetch(`https://studika.ru/api/areas`, {
      method: 'POST',
    })
      .then((response) => response.json())
      .then(regions => {
        this.regions = regions
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

    this.renderTextElements()
    this.modalMenu.classList.toggle('active')
  }

  renderLabels() {
    this.labels.innerHTML = createLabelsTemplate(this.chosenRegions)
  }

  renderList() {
    this.container.innerHTML = templatesCreators(this.regions)
    new SimpleBar(this.container)
  }
}
