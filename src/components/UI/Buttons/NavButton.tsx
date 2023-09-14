import React from "react";
import BasicButton from "./Basic";

const NavButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
    return <BasicButton {...props} />;
}

export default NavButton;