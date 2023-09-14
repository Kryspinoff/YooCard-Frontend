import React, {Suspense} from "react";

import {UserProfileData} from "../../../interfaces/UserProfileData";
import UserPicture from "../UserPicture";

import classes from "./UserProfileView.module.css";
import {Await, useRouteLoaderData} from "react-router-dom";
import {UserProfileLoaderData} from "../../../pages/Profile/UserProfile";
import TileList from "../../Tiles/TileList";

import ModalLoading from "../../Modals/ModalLoading";

// interface UserProfileProps {
//     userProfile: UserProfileData
// }

const UserProfileView: React.FC = () => {
    const { userProfile } = useRouteLoaderData("user-profile") as UserProfileLoaderData;

    return <div className={classes.container}>
        <div className={classes.header}>
            <Suspense fallback={<ModalLoading/>}>
                <Await resolve={userProfile}>
                    {(loadedUserProfile: UserProfileData) => <>
                        <UserPicture className={classes.picture} username={loadedUserProfile.username} pictureUrl={loadedUserProfile.picture}/>
                        <h1 className={classes.username}>@{loadedUserProfile.username}</h1>
                    </>}
                </Await>
            </Suspense>
        </div>
        <TileList/>
    </div>;
}

export default UserProfileView;