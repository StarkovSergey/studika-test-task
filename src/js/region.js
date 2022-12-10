import { RegionSelector } from './modules/region-selector.js'

const textElement = document.querySelector('.header__region-menu [data-region]')
const button = document.querySelector('.header__region-menu [data-region-button]')
const modalMenu = document.querySelector('.header__region-menu [data-region-modal]')
const loader = document.querySelector('.header__region-menu [data-region-loader]')
const container = document.querySelector('.header__region-menu [data-region-container]')

const textElementMobile = document.querySelector('.region-menu--mobile [data-region]')
const buttonMobile = document.querySelector('.region-menu--mobile [data-region-button]')
const modalMenuMobile = document.querySelector('.region-menu--mobile [data-region-modal]')
const loaderMobile = document.querySelector('.region-menu--mobile [data-region-loader]')
const containerMobile = document.querySelector('.region-menu--mobile [data-region-container]')

const dataRegions = {
  regions: [],
  changeData({
    regions,
    currentLocations,
  }) {
    if (regions) {
      this.regions = regions
    }

    if (currentLocations) {
      textElement.innerText = currentLocations.map(item => item.name)
        .join(', ')

      textElementMobile.innerText = currentLocations.map(item => item.name)
        .join(', ')
    }
  },
}

new RegionSelector((data) => dataRegions.changeData(data), dataRegions.regions, button, modalMenu, loader, container)

new RegionSelector((data) => dataRegions.changeData(data), dataRegions.regions, buttonMobile, modalMenuMobile, loaderMobile, containerMobile)
