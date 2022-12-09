export function setCookie(name, value, options = {}) {

  options = {
    path: '/',
    ...options,
  }

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString()
  }

  let updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`

  // eslint-disable-next-line guard-for-in
  for (const optionKey in options) {
    updatedCookie += `; ${optionKey}`
    const optionValue = options[optionKey]
    if (optionValue !== true) {
      updatedCookie += `=${optionValue}`
    }
  }

  document.cookie = updatedCookie
}

export function getCookie(name) {
  const matches = document.cookie.match(new RegExp(
    `(?:^|; )${  name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')  }=([^;]*)`,
  ))
  return matches ? decodeURIComponent(matches[1]) : undefined
}

export const isOccurrence = (search, text = '') => text.toLowerCase()
  .indexOf(search.toLowerCase()) !== -1

export const applyOccurrence = (search, text) => {
  const index = text.toLowerCase()
    .indexOf(search.toLowerCase())
  if (index === -1) return text
  return `${text.slice(0, index)}<b>${text.slice(index, index + search.length)}</b>${text.slice(index + search.length)}`
}
