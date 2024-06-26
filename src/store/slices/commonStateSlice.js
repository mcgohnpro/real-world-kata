/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

import { loadArticles } from './articleSlice'

const initialState = {
  loading: false,
  errors: [],
}

const commonStateSlice = createSlice({
  name: 'commonState',
  initialState,
  reducers: {
    addError: (state, action) => {
      state.errors.push(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadArticles.fulfilled, (state) => {
      state.loading = false
    })
    builder.addCase(loadArticles.pending, (state) => {
      state.loading = true
    })
    builder.addCase(loadArticles.rejected, (state, action) => {
      state.loading = false
      state.errors.push(action.payload)
    })
  },
})

export const { addError } = commonStateSlice.actions

export default commonStateSlice.reducer
