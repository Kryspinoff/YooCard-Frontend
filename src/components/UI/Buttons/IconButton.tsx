import React from "react";
import BasicButton, {ButtonButtonProps} from "./Basic";

import classes from "./IconButton.module.css";

interface IconButtonProps extends ButtonButtonProps {}

const IconButton: IconButtonProps = (props) => {
    const { className, ...otherProps } = props;

    const buttonClassName: string = className ? `${classes["icon-button"]} ${className}` : classes["icon-button"];

    return <BasicButton {...otherProps} className={buttonClassName}/>;
}

export default IconButton;