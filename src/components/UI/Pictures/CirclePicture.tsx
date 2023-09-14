import React from "react";

import classes from "./CirclePicture.module.css";

interface CirclePictureProps {
    className?: string;
}

const CirclePicture: React.FC<CirclePictureProps> = ({className= ""}) => {
    return <div className={`${classes["picture-wrapper"]} ${className}`}>

    </div>;
}

export default CirclePicture;