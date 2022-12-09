export const isOccurrence = (search, text = '') => text.toLowerCase()
  .indexOf(search.toLowerCase()) !== -1

export const applyOccurrence = (search, text) => {
  const index = text.toLowerCase()
    .indexOf(search.toLowerCase())
  if (index === -1) return text
  return `${text.slice(0, index)}<b>${text.slice(index, index + search.length)}</b>${text.slice(index + search.length)}`
}
