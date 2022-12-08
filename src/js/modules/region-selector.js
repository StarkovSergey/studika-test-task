import SimpleBar from 'simplebar'
import { createRegionListTemplate } from './createRegionListTemplate.js'

export class RegionSelector {
  regions
  currentLocation
  textElements
  buttons
  loaders
  containers

  constructor(textElements, buttons, modalMenus, loaders, containers) {
    this.textElements = textElements
    this.buttons = buttons
    this.modalMenus = modalMenus
    this.loaders = loaders
    this.containers = containers

    this.clickHandler = this.clickHandler.bind(this)

    this.buttons.forEach(button => {
      button.addEventListener('click', this.clickHandler)
    })
    this.modalMenus
  }

  renderTextElements() {
    this.textElements.forEach(element => {
      element.innerText = this.currentLocation
    })
  }

  showLoader() {
    this.loaders.forEach(loader => {
      loader.classList.add('active')
    })
  }

  hideLoader() {
    this.loaders.forEach(loader => {
      loader.classList.remove('active')
    })
  }

  clickHandler(event) {
    this.modalMenus.forEach(modal => {
      modal.classList.toggle('active')
    })

    if (!this.regions) this.#getData()
  }

  #getData() {
    this.showLoader()
    fetch(`https://studika.ru/api/areas`, {
      method: 'POST',
    })
      .then((response) => response.json())
      .then(regions => {
        this.regions = regions
        this.renderList()
        this.hideLoader()
      })
      .catch(e => {
        console.warn(e)
        this.hideLoader()
      })
  }

  renderList() {
    this.containers.forEach(container => {
      container.innerHTML = createRegionListTemplate(this.regions)
    })

    this.containers.forEach(container => {
      new SimpleBar(container)
    })

  }
}
