/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { fetchCurrentUser } from '../../api'

export const loadCurrentUser = createAsyncThunk('user/fetchCurrentUser', async (userData, { rejectWithValue }) => {
  try {
    const data = await fetchCurrentUser()
    return data
    // FIXME возможно надо убрать данный фетч, так этот статус никуда не идет. Формат данных ошибки не единообразный
  } catch (error) {
    return rejectWithValue({ status: error.response.status })
  }
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
    // TODO надо переименовать в логин, надо подумать
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
    builder.addCase(loadCurrentUser.rejected, (state, action) => {
      state.authorized = false
    })
  },
})
export const { updateCurrentUser, logOutCurrentUser } = currentUserSlice.actions
export default currentUserSlice.reducer
