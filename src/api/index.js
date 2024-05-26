import { URL_API, API_ENDPOINT_ARTICLES } from './constants'

async function fetcher(url) {
  const response = await fetch(url)
  if (response.ok) {
    const data = await response.json()
    return data
  }
  throw new Error('Error fetch data')
}

export async function fetchArticles(offset) {
  const url = new URL(URL_API)
  url.pathname = API_ENDPOINT_ARTICLES
  url.searchParams.set('limit', '5')
  url.searchParams.set('offset', offset)
  const data = await fetcher(url)
  return data
}

export async function fetchArticleBySlug(slug) {
  const url = new URL(URL_API)
  url.pathname = `${API_ENDPOINT_ARTICLES}/${slug}`
  const data = await fetcher(url)
  return data.article
}
