import axios, {AxiosInstance, AxiosRequestConfig} from "axios";
import UserService from "./UserService";
import UserProfileService from "./UserProfileService";
import AuthService from "./AuthService";


class Services {
    public readonly user: UserService;
    public readonly userProfile: UserProfileService;
    public readonly auth: AuthService;

    public constructor(private axiosInstance: AxiosInstance) {
        this.user = new UserService(axiosInstance);
        this.userProfile = new UserProfileService(axiosInstance);
        this.auth = new AuthService(axiosInstance);
    }

    async get(url: string, args?: AxiosRequestConfig): Promise<any> {
        return this.axiosInstance.get(url, {...args})
    }
}

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL
})

const services = new Services(axiosInstance);

export default services;