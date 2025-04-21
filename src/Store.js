import { configureStore } from '@reduxjs/toolkit'
import pasteReducer from './Redux/pasteItSlice'


 const store = configureStore({
  reducer: {
    paste:pasteReducer
  },
 })
export default store;