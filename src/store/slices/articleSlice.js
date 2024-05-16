/* eslint-disable no-param-reassign */

// TODO сделать слайс с общими состояниями приложения

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { URL_API, API_ENDPOINT_ARTICLES } from '../../api/constants'

export const fetchArticles = createAsyncThunk('articles/fetchRecentArticles', async (offset = '0') => {
  const url = new URL(URL_API)
  url.pathname = API_ENDPOINT_ARTICLES
  url.searchParams.set('limit', '5')
  url.searchParams.set('offset', offset)
  const response = await fetch(url)
  if (response.ok) {
    const data = await response.json()
    return data
  }
  throw new Error('Error fetch data')
})

const initialState = {
  currentPage: 1,
  articlesCount: 0,
  articles: [],
}

export const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    updateCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      state.articles = action.payload.articles.map((article) => article.slug)
      state.articlesCount = action.payload.articlesCount
    })
  },
})

export const { updateCurrentPage } = articlesSlice.actions

export default articlesSlice.reducer
