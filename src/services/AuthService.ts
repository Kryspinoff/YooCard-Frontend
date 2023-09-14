import {AxiosError, AxiosInstance} from "axios";
import {json} from "react-router-dom";

interface UserRegistrationData {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone?: string;
}

export interface UserLoginData {
    username: string;
    password: string;
}

interface AuthServiceInterface {
    login(args: UserRegistrationData): Promise<any>;
    logout(): Promise<any>;
    register(args: UserRegistrationData): Promise<any>;
    // isAuthenticated(): boolean;
}

class AuthService implements AuthServiceInterface {
    constructor(private axiosInstance: AxiosInstance) {
    }

    async login(data: UserLoginData): Promise<any> {
        try {
            const response = await this.axiosInstance.post<{message: string}>("/login", data, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Accept": "application/json",
                },
                withCredentials: true
            });
            return response.data;
        } catch (err) {
            const error = err as AxiosError;
            if (!error.response || !(error.response.data instanceof Object)) {
                return json({detail: "Server error"}, {status: 500})
            }
            if (error.response.status === 400) {
                return json({...error.response.data}, {status: 400});
            }
            if (error.response.status === 422) {
                return json({detail: "Missing username/e-mail or password"}, { status: 422 });
            }
            // throw { detail: "Error"}
        }
        // return await this.axiosInstance.post("/login", data)
    }

    async logout(): Promise<any> {

    }

    async register(data: UserRegistrationData): Promise<any> {
        return await this.axiosInstance.post("/register", data)
    }

    // isAuthentication(): boolean {
    //     const token = document.cookie.split(';').some((item) => item.trim().startsWith('access_token='));
    //     return !!token;
    // }
}

export default AuthService;