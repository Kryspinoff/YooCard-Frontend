import React, {ReactNode} from "react";

import classes from "./FormButton.module.css";

interface FormButtonProps {
    children: ReactNode;
    type?: "button" | "submit" | "reset" | undefined;
    name?: string;
    value?: string;
    disabled?: boolean;
    className?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const FormButton: React.FC<FormButtonProps> = ({children, type="button", name, value, disabled, onClick, className=""}) => {
    return <button className={`${classes.button} ${className}`} type={type} name={name} value={value} disabled={disabled} onClick={onClick}>{children}</button>;
}

export default FormButton;