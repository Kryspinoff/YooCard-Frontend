import React, {ReactNode} from "react";
import classes from "./Card.module.css";

interface CardProps {
    children: ReactNode,
    className?: string
}

const Card: React.FC<CardProps> = ({children, className=""}) => {
    return <div className={`${classes.card} ${className}`}>
        {children}
    </div>;
}

export default Card;