import React from "react";

import classes from "./Basic.module.css";

export interface ButtonButtonProps extends React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> {}

const BasicButton: ButtonButtonProps = (props) => {
    const { className, ...otherProps } = props;

    const buttonClassName: string = className ? `${classes["basic-button"]} ${className}` : classes["basic-button"];

    return <button {...otherProps } className={buttonClassName} />;
}

export default BasicButton;