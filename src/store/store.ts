import {Action, configureStore, ThunkAction} from "@reduxjs/toolkit";
import userReducer  from "./slices/userSlice";
import authSlice from "./slices/authSlice";

const store = configureStore({
    reducer: { user: userReducer, auth: authSlice }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

export default store;