import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './users'

const store = configureStore({
    reducer: {
        user: usersReducer,
    },
})

export default store
