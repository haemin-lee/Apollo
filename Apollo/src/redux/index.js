import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './users'
import checkInReducer from './check-in'

const store = configureStore({
    reducer: {
        user: usersReducer,
        checkIn: checkInReducer,
    },
})

export default store
