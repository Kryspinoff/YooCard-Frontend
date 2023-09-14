import React from "react";

import classes from "./UserProfileFooter.module.css";

import imgLogo from "../../../../assets/logo-black.png";
import {Link} from "react-router-dom";

interface UserProfileFooterProps {
}

const UserProfileFooter: React.FC<UserProfileFooterProps> = () => {
    return <div className={classes.container}>
        <Link to="">
            <img className={classes.logo} src={imgLogo} alt="YooCard" />
        </Link>
    </div>;
}

export default UserProfileFooter;