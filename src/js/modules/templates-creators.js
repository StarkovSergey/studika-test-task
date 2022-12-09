export const createCitiesListTemplate = (cities, region) => cities
  .map(city => `<li  class="region-menu__item region-menu__item--city" id="${city.id}">
        <button data-region-type="city" id="${city.id}" data-region-name="${city.name}">
          <span class="region-menu__title">${city.name}</span>
          <span class="region-menu__subtitle">${region}</span>
        </button>
      </li>`)
  .join('')

export const templatesCreators = (regions) => regions.map(region => {
  if (region.type === 'country') {
    return `<li class="region-menu__item">
         <button data-region-type="country" data-region-name="${region.name}" id="${region.id}">${region.name}</button>
    </li>`
  }
  return `<li class="region-menu__item">
<button data-region-type="area" id="${region.id}" data-region-name="${region.name}">${region.name}</button>
<ul>${createCitiesListTemplate(region.cities, region.name)}</ul>
</li>`
})
  .join('')

export const createLabelsTemplate = (labels) => {

  const items = labels.map(label => `<li class="labels__item">
    <span class="label__text">${label.name}</span>
    <button class="label__button" aria-label="удалить" data-label-id="${label.id}"></button>
</li>`)
    .join('')

  return `<ul class="labels">${items}</ul>`
}
