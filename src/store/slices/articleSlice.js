/* eslint-disable no-useless-catch */
/* eslint-disable no-unused-vars */
/* eslint-disable default-param-last */
/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { fetchArticles } from '../../api/index'

export const loadArticles = createAsyncThunk(
  'articles/fetchRecentArticles',
  async (offset = '0', { rejectWithValue }) => {
    try {
      const data = await fetchArticles(offset)
      return data
    } catch ({ name, message, stack, response: { status, url } }) {
      return rejectWithValue({
        name,
        message,
        stack,
        status,
        url,
      })
    }
  }
)

const initialState = {
  articlesCount: 0,
  articles: [],
}

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(loadArticles.fulfilled, (state, action) => {
      state.articles = action.payload.articles.map((article) => article.slug)
      state.articlesCount = action.payload.articlesCount
    })
  },
})

export default articlesSlice.reducer
