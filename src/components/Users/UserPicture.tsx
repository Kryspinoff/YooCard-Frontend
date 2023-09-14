import React, {Suspense} from 'react';
import {Await, useRouteLoaderData} from "react-router-dom";
import {UserProfileLoaderData} from "../../pages/Profile/UserProfile";
import {UserProfileData} from "../../interfaces/UserProfileData";

import classes from "./UserPicture.module.css"

interface UserAvatarProps {
    username: string;
    className?: string;
    pictureUrl?: string;
}

const UserPicture: React.FC<UserAvatarProps> = ({ username, pictureUrl, className = "" }) => {
    // const { userProfile } = useRouteLoaderData("user-profile") as UserProfileLoaderData;

    let containerClassName = classes.container;

    if (className) {
        containerClassName += ` ${className}`
    }

    let content = <p className={classes.text}>{username[0].toUpperCase()}</p>

    if (pictureUrl) {
        content = <img className={classes.picture} src={pictureUrl} alt={`Profile of the ${username}`}/>
    }

    return <div className={containerClassName}>
        {content}
        {/*<Suspense>*/}
        {/*    <Await resolve={userProfile}>*/}
        {/*        {(loadedUserProfile: UserProfileData) => {*/}
        {/*            if (loadedUserProfile.picture) {*/}
        {/*                return <img className={classes.picture} src={loadedUserProfile.picture} alt={`Profile of the ${loadedUserProfile.username}`}/>*/}
        {/*            }*/}
        {/*            if (!loadedUserProfile.picture) {*/}
        {/*                return <p className={classes.text}>{loadedUserProfile.username[0].toUpperCase()}</p>*/}
        {/*            }*/}
        {/*        }}*/}
        {/*    </Await>*/}
        {/*</Suspense>*/}
    </div>
};

export default UserPicture;