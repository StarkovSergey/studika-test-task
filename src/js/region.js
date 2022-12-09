import { RegionSelector } from './modules/region-selector.js'

const textElement = document.querySelector('.region-menu [data-region]')
const button = document.querySelector('.region-menu [data-region-button]')
const modalMenu = document.querySelector('.region-menu [data-region-modal]')
const loader = document.querySelector('.region-menu [data-region-loader]')
const container = document.querySelector('.region-menu [data-region-container]')

const dataRegions = {
  regions: [],
  changeData(data) {
    this.regions = data
  },
}

const regionSelector = new RegionSelector((data) => dataRegions.changeData(data), dataRegions.regions, textElement, button, modalMenu, loader, container)
