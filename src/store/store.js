import { configureStore } from '@reduxjs/toolkit'

import articleReducer from './slices/articleSlice'
import commonStateReducer from './slices/commonStateSlice'

const store = configureStore({
  reducer: {
    articles: articleReducer,
    commonState: commonStateReducer,
  },
})
export default store
