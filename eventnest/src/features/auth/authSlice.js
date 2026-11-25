import { createSlice } from "@reduxjs/toolkit";


const storedUser = JSON.parse(localStorage.getItem('eventnestuser'));

const initialState = {
    user: storedUser || null,
    isLoggedIn: storedUser ? true : false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload
            state.isLoggedIn = true

        },
        logout: (state) => {
            localStorage.removeItem('eventnestuser');
            state.user = null;
            state.isLoggedIn = false;
        }
    }
})

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer
