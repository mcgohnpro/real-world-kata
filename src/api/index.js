/* eslint-disable no-useless-catch */
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
      if (error.response.status === 401) {
        localStorage.removeItem('jwt-token')
      }
      throw error
    }
  }
  return {
    user: {
      authorized: false,
    },
  }
}

export async function fetchLogin({ email, password }) {
  const body = JSON.stringify({
    user: {
      email,
      password,
    },
  })
  const url = new URL(URL_API)
  url.pathname = ENDPOINTS.LOGIN
  const data = await fetcher(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  })
  localStorage.setItem('jwt-token', data.user.token)
  return data
}

export async function fetchRegisterNewUser({ email, password, username }) {
  const body = JSON.stringify({
    user: {
      email,
      password,
      username,
    },
  })
  const url = new URL(URL_API)
  url.pathname = ENDPOINTS.USERS
  const data = await fetcher(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  })
  localStorage.setItem('jwt-token', data.user.token)
  return data
}

export async function fetchUpdateProfile(formData) {
  const { email, password, username, image, token } = formData
  const url = new URL(URL_API)
  url.pathname = ENDPOINTS.USER
  const body = JSON.stringify({
    user: {
      email,
      password,
      username,
      image,
    },
  })
  try {
    const data = await fetcher(url, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body,
    })
    localStorage.setItem('jwt-token', data.user.token)
    return data
  } catch (error) {
    if (error.response.status === 401) {
      localStorage.removeItem('jwt-token')
    }
    throw error
  }
}

export async function fetchCreateArticle({ title, description, body, tagList, token }) {
  const requestBody = JSON.stringify({
    article: {
      title,
      description,
      body,
      tagList: tagList.map((item) => item.tagName),
    },
  })
  const url = new URL(URL_API)
  url.pathname = ENDPOINTS.ARTICLES
  const data = await fetcher(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: requestBody,
  })
  return data
}

export async function fetchUpdateArticle(formData, slug) {
  const { title, description, body, tagList, token } = formData
  const requestBody = JSON.stringify({
    article: {
      title,
      description,
      body,
      tagList: tagList.map((item) => item.tagName),
    },
  })
  const url = new URL(URL_API)
  url.pathname = `${ENDPOINTS.ARTICLES}/${slug}`
  const data = await fetcher(url, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: requestBody,
  })
  return data
}
