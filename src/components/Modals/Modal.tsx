import ReactDOM from "react-dom";
import React, {Fragment, ReactNode} from "react";

import classes from "./Modal.module.css";

interface BackdropProps {
    onClick: () => void;
}

const Backdrop: React.FC<BackdropProps> = props => {
    return <div className={classes.backdrop} onClick={props.onClick}/>
};

interface ModalOverlayProps {
    children: ReactNode;
    className?: string;
}

const ModalOverlay: React.FC<ModalOverlayProps> = ({children, className=""}) => {
    return <div className={`${classes.modal} ${className}`}>{children}</div>
};

const portalElement: HTMLElement | null = document.getElementById("overlay");

interface ModalProps {
    onClose: () => void;
    children: ReactNode;
    className?: string;
}

const Modal: React.FC<ModalProps> = ({onClose, children, className=""}) => {
    if (!portalElement) {
        return null;
    }

    return <Fragment>
        {ReactDOM.createPortal(
            <Backdrop onClick={onClose}/>,
            portalElement
        )}
        {ReactDOM.createPortal(
            <ModalOverlay className={className}>{children}</ModalOverlay>,
            portalElement
        )}
    </Fragment>
};

export default Modal;