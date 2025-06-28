import { configureStore } from '@reduxjs/toolkit'
import { RootSaga } from './rootsaga'
import createSagaMiddleware from 'redux-saga'
import { rootReducer } from './rootReducer'
const sagaMiddleware=createSagaMiddleware()
export const store=configureStore({
reducer:rootReducer,
middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([sagaMiddleware])
})
sagaMiddleware.run(RootSaga)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

