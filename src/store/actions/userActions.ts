import {AppThunk} from "../store";
import services from "../../services/Services";
import {UserResponseData} from "../../interfaces/UserResponseData";
import {clearUser, setUser} from "../slices/userSlice";

export const setUserAction = (user: UserResponseData) => {
    return setUser(user);
}

export const clearUserAction = () => {
    return clearUser();
}

export const fetchUser = (userId: string): AppThunk => async (dispatch) => {
    try {
        const user: UserResponseData = await services.user.getOneById(userId);
        dispatch(setUser(user))
    } catch (error) {
        console.log("Error fetching user:", error)
    }
}