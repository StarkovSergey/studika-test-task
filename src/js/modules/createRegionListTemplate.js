export const createCitiesListTemplate = (cities, region) => cities
  .map(city => `<li data-region-type="city" class="region-menu__item region-menu__item--city" id="${city.id}">
        <button>
          <span class="region-menu__title">${city.name}</span>
          <span class="region-menu__subtitle">${region}</span>
        </button>
      </li>`)
  .join('')

export const createRegionListTemplate = (regions) => regions.map(region => {
  if (region.type === 'country') {
    return `<li data-region-type="country" id="${region.id}" class="region-menu__item"><button>${region.name}</button></li>`
  }
  return `<li data-region-type="area" id="${region.id}" class="region-menu__item">
<button>${region.name}</button>
<ul>${createCitiesListTemplate(region.cities, region.name)}</ul>
</li>`
})
  .join('')
