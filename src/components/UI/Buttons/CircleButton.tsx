import React, {ReactNode} from "react";

import classes from "./CircleButton.module.css";

interface CircleButtonProps {
    onClick: () => void;
    children: ReactNode;
    className?: string;
}

const CircleButton: React.FC<CircleButtonProps> = (props) => {
    const { className, ...otherProps } = props;

    const buttonClassName: string = className ? `${classes["basic-button"]} ${className}` : classes["basic-button"];

    return <button {...otherProps} className={buttonClassName}/>;
}

export default CircleButton;