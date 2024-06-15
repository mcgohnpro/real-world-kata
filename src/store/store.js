import { configureStore } from '@reduxjs/toolkit'

import articleReducer from './slices/articleSlice'
import commonStateReducer from './slices/commonStateSlice'
import currentUserSlice from './slices/currentUserSlice'

const store = configureStore({
  reducer: {
    articles: articleReducer,
    commonState: commonStateReducer,
    currentUser: currentUserSlice,
  },
})
export default store
