import React from "react";
import {defer, LoaderFunction} from "react-router-dom";
import UserProfileView from "../../components/Users/Profile/UserProfileView";
import {UserProfileData} from "../../interfaces/UserProfileData";
import services from "../../services/Services";
import UserProfileNavigation from "../../components/Users/Profile/Layout/UserProfileNavigation";

import classes from "./UserProfile.module.css";
import UserProfileFooter from "../../components/Users/Profile/Layout/UserProfileFooter";
export interface UserProfileLoaderData {
    userProfile: Promise<UserProfileData>;
}

interface UserProfileProps {}

const UserProfilePage: React.FC<UserProfileProps> = () => {
    // const { userProfile } = useLoaderData() as UserProfileLoaderData;
    //
    // console.log("CZEKAM")
    // return <div className={classes.container}>
    //     <UserProfileNavigation/>
    //     <div className={classes.content}>
    //         <UserProfileView/>
    //         <UserProfileFooter/>
    //     </div>
    // </div>;
    return <>
        <UserProfileNavigation/>
        <div className={classes.content}>
            <UserProfileView/>
            <UserProfileFooter/>
        </div>
    </>;
}

export default UserProfilePage;

export const loader: LoaderFunction = async ({params}) => {
    const username = params.username as string;
    return defer({ userProfile: services.userProfile.getOneByUsername(username)});
}

// export const fetchUserProfile = async (username: string) => {
// }

// export const loader: LoaderFunction = async ({ params }) => {
//     const username = params.username as string;
//     return defer({ userProfile: await fetchUserProfile(username) })
// }

// Typ reprezentujący dane profilu użytkownika
// interface UserProfiles {
//     // Dodaj odpowiednie pola, np. imię, nazwisko, zdjęcie profilowe, itp.
// }
//
// // Typ reprezentujący odpowiedź zawierającą dane profilu
// interface UserProfileResponse {
//     userProfile: UserProfiles;
// }
//
// // Typ reprezentujący błąd
// interface ErrorResponse {
//     error: string;
// }
//
// // Typ reprezentujący wartość zwracaną przez funkcję loader
// type LoaderFunctionResponse = Response | UserProfileResponse | ErrorResponse;

