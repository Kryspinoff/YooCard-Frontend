import React, {Suspense, useEffect, useState} from "react";
import {Await, useLoaderData, useRouteLoaderData} from "react-router-dom";
import {UserProfileLoaderData} from "../../../../pages/Profile/UserProfile";
import {UserProfileData} from "../../../../interfaces/UserProfileData";
import UserPicture from "../../UserPicture";

import classes from "./UserProfileNavigation.module.css";
import IconButton from "../../../UI/Buttons/IconButton";
import {ThreeDots} from "../../../Icons/ThreeDots";

interface UserProfileNavigationProps {
}

const UserProfileNavigation: React.FC<UserProfileNavigationProps> = () => {
    const { userProfile } = useRouteLoaderData("user-profile") as UserProfileLoaderData;
    const [displayOverlay, setDisplayOverlay] = useState(false);

    const [scrolled, setScrolled] = useState(false); // stan informujący czy strona została przewinięta

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    let navigationClassName = classes.navigation;

    if (scrolled) {
        navigationClassName += ` ${classes.scrolled}`
    }

    return <>
        {/*{displayOverlay && <ModalProfileSingupOptions onClose={() => setDisplayOverlay(false)}/>}*/}
        {/*<div className={classes.container}>*/}
        {/*</div>*/}
        <div className={navigationClassName}>
            <IconButton className={classes.button}>{<ThreeDots/>}</IconButton>
            <div className={classes["username-wrapper"]}>
                <Suspense>
                    <Await resolve={userProfile}>
                        {(loadedUserProfile) => <p className={classes.username}>@{loadedUserProfile.username}</p>}
                    </Await>
                </Suspense>
            </div>
            <div className={classes["picture-wrapper"]}>
                <Suspense>
                    <Await resolve={userProfile}>
                        {(loadedUserProfile) => <UserPicture className={classes.picture} username={loadedUserProfile.username} pictureUrl={loadedUserProfile.picture}/>}
                    </Await>
                </Suspense>
            </div>
        </div>
    </>;
}

export default UserProfileNavigation;