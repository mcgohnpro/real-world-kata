/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { fetchCurrentUser } from '../../api'

export const loadCurrentUser = createAsyncThunk('user/fetchCurrentUser', async () => {
  const data = await fetchCurrentUser()
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
      state.username = action.payload.user?.username || ''
      state.email = action.payload.user?.email || ''
      state.token = action.payload.user?.token || ''
      state.authorized = action.payload.user?.authorized || false
      state.bio = action.payload.user?.bio || ''
      state.image = action.payload.user?.image || null
    },
    logOutCurrentUser: (state) => {
      state.username = ''
      state.email = ''
      state.token = ''
      state.authorized = false
      state.bio = ''
      state.image = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadCurrentUser.fulfilled, (state, action) => {
      state.username = action.payload.user?.username || ''
      state.email = action.payload.user?.email || ''
      state.token = action.payload.user?.token || ''
      state.authorized = action.payload.user?.authorized || false
      state.bio = action.payload.user?.bio || ''
      state.image = action.payload.user?.image || null
    })
    builder.addCase(loadCurrentUser.rejected, (state) => {
      state.authorized = false
    })
  },
})
export const { updateCurrentUser, logOutCurrentUser } = currentUserSlice.actions
export default currentUserSlice.reducer
