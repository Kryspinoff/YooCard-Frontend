import React, {Suspense} from "react";
import {Await, useRouteLoaderData} from "react-router-dom";
import {UserProfileLoaderData} from "../../pages/Profile/UserProfile";
import {UserProfileData} from "../../interfaces/UserProfileData";
import Tile from "./Tile";

import classes from "./TileList.module.css";

interface TileListProps {
}

const TileList: React.FC<TileListProps> = () => {
    const { userProfile } = useRouteLoaderData("user-profile") as UserProfileLoaderData;

    return <ul className={classes.list}>
        <Suspense>
            <Await resolve={userProfile}>
                {(loadedUserProfile: UserProfileData) => {
                    return loadedUserProfile.tiles.map(({id, type, title, url, position, iconUrl}) => (
                        <Tile key={id} type={type} title={title} url={url} position={position} icon_url={iconUrl}/>
                    ));
                }}
            </Await>
        </Suspense>
        <li><br/></li>
        <li><br/></li>
        <li><br/></li>
        <li><br/></li>
        <li><br/></li>
        <li><br/></li>
        <li><br/></li>
        <li><br/></li>
        <li><br/></li>
        <li><br/></li>
        <li><br/></li>
        <li><br/></li>
        <li><br/></li>
        <li><br/></li>
        <li><br/></li>
        <li><br/></li>
        <li><br/></li>
        <li><br/></li>
        <li><br/></li>
        <li><br/></li>
        <li><br/></li>
        <li><br/></li>
        <li><br/></li>
        <li><br/></li>
        <li><br/></li>
        <li><br/></li>
        <li><br/></li>
        <li><br/></li>
        <li><br/></li>
        <li><br/></li>
        <li><br/></li>
        <li><br/></li>
        <li><br/></li>
        <li><br/></li>
        <li><br/></li>
        <li><br/></li>
        <li><br/></li>
    </ul>;
}

export default TileList;