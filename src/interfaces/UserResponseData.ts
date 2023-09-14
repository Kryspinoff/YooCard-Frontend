export interface UserResponseData {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    phoneNumber: string;
    picture: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserCreateData {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber?: string;
}

export interface UserRegistrationData {

}