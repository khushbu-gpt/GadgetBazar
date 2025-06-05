import { configureStore } from '@reduxjs/toolkit'
import { cartSlice } from './slice/cart.slice'
import { authSlice } from './slice/auth.slice'
import { RootSaga } from './rootsaga'
import createSagaMiddleware from 'redux-saga'
const sagaMiddleware=createSagaMiddleware()
export const store=configureStore({
reducer:{
    Cart:cartSlice.reducer,
    Auth:authSlice.reducer
},
middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([sagaMiddleware])

})
sagaMiddleware.run(RootSaga)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

