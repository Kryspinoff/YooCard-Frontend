import React, {useState} from "react";
import CircleButton from "../UI/Buttons/CircleButton";

import classes from "./Tile.module.css"
import {ThreeDots} from "../Icons/ThreeDots";
import Svg from "../UI/SVG/Svg";
import {TileType} from "../../interfaces/UserProfileData";



interface TileProps {
    type: TileType;
    title: string;
    url: string;
    position: number;
    icon_url: string;
}

// const getServiceSVG: React.FC<{platform: string}> = ({ platform }) => {
//     if (platform === "facebook") {
//         return <Facebook/>;
//     } else if (platform === "instagram") {
//         return <Instagram/>;
//     } else if (platform === "tiktok") {
//         return <TikTok/>;
//     } else if (platform === "discord") {
//         return <Discord/>;
//     } else if (platform === "linkedin") {
//         return <LinkedIn/>;
//     } else if (platform === "add to contact") {
//         return <Contacts/>;
//     } else {
//         return <HyperLink/>;
//     }
// };

const Tile: React.FC<TileProps> = ({ type, title, url, position, icon_url}) => {
    const [displayOverlay, setDisplayOverlay] = useState(false);

    // const icon = getServiceSVG({platform});


    return <li>
        {/*{displayOverlay && <ModalShareTile className={classes.overlay} onClose={() => setDisplayOverlay(false)}/>}*/}
        <a href={url}>
            <div className={classes.icon}/>
            <p className={classes.title}>{title}</p>
        </a>
        <CircleButton className={classes.button} onClick={() => setDisplayOverlay(true)}>
            <ThreeDots/>
        </CircleButton>
    </li>;
}

export default Tile;