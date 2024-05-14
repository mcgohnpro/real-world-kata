/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */

// TODO сделать слайс с общими состояниями приложения

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const URl_API = 'https://blog.kata.academy/'
const API_ENDPOINT_ARTICLES = 'api/articles'

export const fetchArticles = createAsyncThunk('articles/fetchRecentArticles', async (offset = '0') => {
  const url = new URL(URl_API)
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
      state.articles = action.payload.articles
      state.articlesCount = action.payload.articlesCount
    })
  },
})

export const { updateCurrentPage } = articlesSlice.actions

export default articlesSlice.reducer
