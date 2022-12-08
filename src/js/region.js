import { RegionSelector } from './modules/region-selector.js'

const textElements = document.querySelectorAll('[data-region]')
const buttons = document.querySelectorAll('[data-region-button]')
const modalMenus = document.querySelectorAll('[data-region-modal]')
const loaders = document.querySelectorAll('[data-region-loader]')
const containers = document.querySelectorAll('[data-region-container]')

const regionSelector = new RegionSelector(textElements, buttons, modalMenus, loaders, containers)
