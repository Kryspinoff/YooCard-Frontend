import {AxiosInstance} from "axios";
import {UserProfileData} from "../interfaces/UserProfileData";

export interface ProfileInterface {
    getOneById(userId: string): Promise<UserProfileData>;
    getOneByUsername(username: string): Promise<UserProfileData>;
}

class UserProfileService implements ProfileInterface {
    constructor(private axiosInstance: AxiosInstance) {}

    getOneById(userId: string): Promise<UserProfileData> {
        return this.axiosInstance.get(`/profiles/${userId}`);
    }

    async getOneByUsername(username: string): Promise<UserProfileData> {
        const response = await this.axiosInstance.get(`/profiles/${username}`);
        return response.data;
    }
}

export default UserProfileService;