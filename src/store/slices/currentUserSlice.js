/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { fetchCurrentUser } from '../../api'

export const loadCurrentUser = createAsyncThunk('user/fetchCurrentUser', async () => {
  const data = await fetchCurrentUser()
  console.log('📢[currentUserSlice.js:10]: data: ', data)
  return data
})

const initialState = {
  username: '',
  email: '',
  token: '',
  authorized: false,
  bio: '',
  image: null,
}

const currentUserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateCurrentUser: (state, action) => {
      state.username = action.payload.user?.username
      state.email = action.payload.user?.email
      state.token = action.payload.user?.token
      state.authorized = action.payload.user?.authorized
      state.bio = action.payload.user?.bio
      state.image = action.payload.user?.image
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadCurrentUser.fulfilled, (state, action) => {
      console.log('📢[currentUserSlice.js:38]: action: ', action)
      state.username = action.payload.user?.username
      state.email = action.payload.user?.email
      state.token = action.payload.user?.token
      state.authorized = action.payload.user?.authorized
      state.bio = action.payload.user?.bio
      state.image = action.payload.user?.image
    })
    builder.addCase(loadCurrentUser.rejected, (state, action) => {
      state.authorized = false
    })
  },
})
export const { updateCurrentUser } = currentUserSlice.actions
export default currentUserSlice.reducer
