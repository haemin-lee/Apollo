import { createSlice } from '@reduxjs/toolkit'

const checkInSlice = createSlice({
    name: 'checkIn',
    initialState: {},
    reducers: {
        setAppointment: (state, action) => (state = action.payload),
    },
})

export const { setAppointment } = checkInSlice.actions
export default checkInSlice.reducer
