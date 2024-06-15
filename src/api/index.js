/* eslint-disable no-unused-vars */
import ErrorFetchData from '../errors/errorFetchData'

import { URL_API, ENDPOINTS } from './constants'

async function fetcher(url, options = {}) {
  const response = await fetch(url, options)
  if (response.ok) {
    const data = await response.json()
    return data
  }
  const error = new ErrorFetchData('Error fetch data', response)
  throw error
}

export async function fetchArticles(offset) {
  const url = new URL(URL_API)
  url.pathname = ENDPOINTS.ARTICLES
  url.searchParams.set('limit', '5')
  url.searchParams.set('offset', offset)
  const data = await fetcher(url)
  return data
}

export async function fetchArticleBySlug(slug) {
  const url = new URL(URL_API)
  url.pathname = `${ENDPOINTS.ARTICLES}/${slug}`
  const data = await fetcher(url)
  return data.article
}

export async function fetchCurrentUser() {
  const url = new URL(URL_API)
  url.pathname = ENDPOINTS.USER
  const jwtToken = localStorage.getItem('jwt-token')

  if (jwtToken) {
    try {
      const data = await fetcher(url, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      localStorage.setItem('jwt-token', data.user.token)
      data.user.authorized = true
      return data
    } catch (error) {
      if (error.response.status === '401') {
        return {
          user: {
            authorized: false,
          },
        }
      }
    }
  }
  return {
    user: {
      authorized: false,
    },
  }
}

export async function fetchLogin(formData) {
  const body = JSON.stringify({
    user: {
      email: formData.email,
      password: formData.password,
    },
  })
  const url = new URL(URL_API)
  url.pathname = ENDPOINTS.LOGIN
  try {
    const data = await fetcher(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    })
    localStorage.setItem('jwt-token', data.user.token)
    data.user.authorized = true
    return data
  } catch (error) {
    return {
      user: {
        authorized: false,
      },
    }
  }
}
