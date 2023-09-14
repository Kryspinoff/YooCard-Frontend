import { createSlice } from '@reduxjs/toolkit';
import { getCookie } from '../../utils/cookie';

const initialState = {
    isLoggedIn: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        checkUserLoggedIn: (state) => {
            const token = getCookie('is_logged_in');
            console.log(token);
            state.isLoggedIn = !!token;
        },
    },
});

export const { checkUserLoggedIn } = authSlice.actions;
export default authSlice.reducer;