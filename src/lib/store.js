import { configureStore } from '@reduxjs/toolkit'
import  counterReducer  from './features/CounterSlice/counterSlice'
import  authReducer  from "./features/auth/AuthSlice";  // ✅ Correct import


export const makeStore = () => {
  return configureStore({
    reducer: {
        counter: counterReducer, 
        auth: authReducer,
    }
  })
}

