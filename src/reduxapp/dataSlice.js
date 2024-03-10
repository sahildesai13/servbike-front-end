import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userName: '',
    userEmail: '',
    userService: {},
}

export const dataSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        AddUser: (state,action) => {
            state.userName = action.payload.userName;
            state.userEmail = action.payload.userEmail;
        },
        addService: (state,action) => {
            state.userService=action.payload;
            console.log(state.userService);
        },
    },
})

export const { AddUser,addService } = dataSlice.actions

export default dataSlice.reducer