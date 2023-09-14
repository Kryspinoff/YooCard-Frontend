import React from "react";

import classes from "./Welcome.module.css";

interface WelcomePageProps {
}

const WelcomePage: React.FC<WelcomePageProps> = () => {
    return <div className={classes.container}>
        helloWelcome
    </div>;
}

export default WelcomePage;