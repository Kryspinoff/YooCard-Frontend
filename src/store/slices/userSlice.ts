import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {UserResponseData} from "../../interfaces/UserResponseData";

export interface UserState extends UserResponseData {}

// export const initialState: UserState = {} as UserState;

export const initialState: UserState = {
    id: "",
    firstName: "",
    lastName: "",
    username: "",
    phoneNumber: "",
    picture: "",
    createdAt: new Date(""),
    updatedAt: new Date(""),
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            return action.payload;
        },
        clearUser: () => initialState,
    },
});

export type UserAction = ReturnType<typeof setUser | typeof clearUser>;

export const { setUser, clearUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;