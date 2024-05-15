import { URL_API, API_ENDPOINT_ARTICLES } from './constants'

export default function fetchArticleBySlug(slug) {
  const url = new URL(URL_API)
  url.pathname = `${API_ENDPOINT_ARTICLES}/${slug}`

  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json()
      }
      throw new Error('Error fetch article by slug')
    })
    .then((json) => {
      return json.article
    })
}
