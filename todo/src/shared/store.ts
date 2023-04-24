import { configureStore } from '@reduxjs/toolkit'
import TaskReducer from './reducer'

const store = configureStore({ reducer:  TaskReducer});

export default store;

