import {AxiosError, AxiosInstance, AxiosResponse} from "axios";
import {UserCreateData, UserResponseData} from "../interfaces/UserResponseData";
import {json} from "react-router-dom";

export interface UserFilterProps {
    username: string;
}

interface UserMultiProps {
    page: number;
    pageSize: number;
    orderBy: "asc" | "desc";
    filter: UserFilterProps;
}

// interface UserMultiRequest {
//     (args: UserMultiProps): Promise<UserData[]>
// }

export interface UserServiceInterface {
    getOneById(userId: string): Promise<UserResponseData>;
    getOneByUsername(username: string): Promise<UserResponseData>;
    getMulti(params: UserMultiProps): Promise<UserResponseData[]>;
    // create(userData: UserCreateData): Promise<UserResponseData | Response>;
    create(userData: UserCreateData): Promise<AxiosResponse<UserResponseData>>;
    // create(userData: UserCreateData): Promise<Response>;
    uploadPicture(userId: string, image: File): Promise<UserResponseData | Response>;
}

class UserService implements UserServiceInterface {
    constructor(private axiosInstance: AxiosInstance) {}

    public async getOneById(userId: string): Promise<UserResponseData> {
        return this.axiosInstance.get(`/users/${userId}`)
    }
    public async getOneByUsername(username: string): Promise<UserResponseData> {
        return this.axiosInstance.get("/users", {params: {username: username}})
    }
    public async getMulti(params: UserMultiProps): Promise<UserResponseData[]> {
        return this.axiosInstance.get(
            "/users",
            {
                params: {
                    page: params.page,
                    pageSize: params.pageSize,
                    orderBy: params.orderBy,
                    filter: params.filter
                }
            }
        )
    }
    public async create(userData: UserCreateData): Promise<AxiosResponse<UserResponseData>> {
        return await this.axiosInstance.post(
            '/users',
            {...userData},
            {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                }
            }
        )
        // try {
        //     return await this.axiosInstance.post(
        //         '/users',
        //         {...userData},
        //         {
        //             headers: {
        //                 "Content-Type": "application/json",
        //                 "Accept": "application/json",
        //             }
        //         }
        //     )
        // } catch (err) {
        //     const error = err as AxiosError;
        //     if (!error.response || !(error.response.data instanceof Object)) {
        //         throw json({detail: "Server error"}, {status: 500})
        //     }
        //     if (error.response.status === 400) {
        //         throw json({...error.response.data}, {status: 400});
        //     }
        //     if (error.response.status === 422) {
        //         throw json({detail: "Missing username/e-mail or password"}, { status: 422 });
        //     }
        //     throw json({detail: "Unexpected error occurred"}, {status: error.response.status})
        // }
    }
    public async uploadPicture(userId: string, image: File): Promise<UserResponseData | Response> {
        const formData = new FormData();
        formData.append('image', image);

        try {
            const response = await this.axiosInstance.post(
                `/users/${userId}/picture`,
                formData,
                {
                    headers: {
                        "Accept": "application/json",
                    }
                }
            );
            return response.data;
        } catch (err) {
            const error = err as AxiosError;
            if (!error.response || !(error.response.data instanceof Object)) {
                return json({detail: "Server error"}, {status: 500});
            }
            // Możesz dodać więcej obsługi błędów specyficznych dla tego endpointu
            return json({detail: "Unexpected error occurred"}, {status: error.response.status});
        }
    }
}

export default UserService;