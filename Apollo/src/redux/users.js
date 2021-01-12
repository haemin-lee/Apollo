import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {},
    reducers: {
        login: (state, action) => (state = action.payload),
        logout: (state) => (state = {}),
    },
})

export const { login, logout } = userSlice.actions
export default userSlice.reducer
