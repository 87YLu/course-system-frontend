import { configureStore } from '@reduxjs/toolkit'
import { fetchMiddleware } from './middleware'
import * as reducers from './reducer'

const store = configureStore({
  reducer: { ...reducers },
  middleware: getDefaultMiddleware => [fetchMiddleware],
  devTools: process.env.NODE_ENV !== 'production',
})

export default store
