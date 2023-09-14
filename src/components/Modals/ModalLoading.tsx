import React from "react";
import ModalOverlay from "./ModalOverlay";
import SVGLoading from "../Icons/Loading";

import classes from "./ModalLoading.module.css";

interface ModalLoadingProps {
}

const ModalLoading: React.FC<ModalLoadingProps> = () => {
    return <ModalOverlay className={classes.modal}>{<SVGLoading className={classes.icon}/>}</ModalOverlay>;
}

export default ModalLoading;