import { combineReducers, configureStore } from '@reduxjs/toolkit'
import CALC from './slice/slice'

const reducer = combineReducers({
    CALC
})

const store = configureStore({reducer})

export default store