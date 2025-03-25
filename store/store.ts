import {configureStore, combineReducers} from "@reduxjs/toolkit";
import balanceReducer from './reducers/Slice'

const rootReducer = combineReducers({
    balanceReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']