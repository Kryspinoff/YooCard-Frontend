import ReactDOM from "react-dom";

import classes from "./ModalOverlay.module.css";
import React, {ReactNode} from "react";

interface ModalOverlayProps {
    onClick?: () => void;
    children: ReactNode;
    className?: string;
}

const ModalOverlay: React.FC<ModalOverlayProps> = ({ onClick, children, className = "" }) => {
    const clickBackgroundHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget && onClick) {
            onClick()
        }
    }

    return ReactDOM.createPortal(
        <div className={classes["modal-overlay"]} onClick={clickBackgroundHandler}>
            <div className={`${classes["modal-children-wrapper"]} ${className}`}>
                {children}
            </div>
        </div>,
        document.body
    );
};

export default ModalOverlay;