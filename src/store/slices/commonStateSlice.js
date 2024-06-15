/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'

import { loadArticles } from './articleSlice'

const initialState = {
  loading: false,
  errors: [],
}

const commonStateSlice = createSlice({
  name: 'commonState',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(loadArticles.fulfilled, (state) => {
      state.loading = false
    })
    builder.addCase(loadArticles.pending, (state) => {
      state.loading = true
    })
    builder.addCase(loadArticles.rejected, (state, action) => {
      state.loading = false
      console.log('📢[commonStateSlice.js:24]: action: ', action)
      state.errors.push(action.error)
    })
  },
})

export default commonStateSlice.reducer
