import { configureStore } from '@reduxjs/toolkit'
import categoryReducer from './slice/category.slice'


export const store = configureStore({
  reducer: {
    category:categoryReducer
  }
})