// TODO вытащить ее в UTILS
function isValidHttpUrl(url) {
  try {
    const newUrl = new URL(url)
    return newUrl.protocol === 'http:' || newUrl.protocol === 'https:'
  } catch (err) {
    return false
  }
}

export default isValidHttpUrl
