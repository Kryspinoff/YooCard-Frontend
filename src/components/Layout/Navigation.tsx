import React, {JSX} from "react";
import {Link, NavLink} from "react-router-dom";

import classes from "./Navigation.module.css";

import logoImage from "../../assets/logo-black.png";
import NavButton from "../UI/Buttons/NavButton";
import IconButton from "../UI/Buttons/IconButton";
import MenuIcon from "../Icons/Menu";

export interface NavLinkData {
    text: string;
    to: string;
}

export interface NavigationProps {
    navLinks: NavLinkData[]
}


const Navigation: React.FC<NavigationProps> = ({navLinks}) => {
    const navLinkElements: JSX.Element[] = navLinks.map((navLink, index) => (
        <li key={index}>
            <NavLink to={navLink.to}>
                <span>{navLink.text}</span>
            </NavLink>
        </li>
    ));


    return <div className={classes.container}>
        <div className={classes["container-wrapper"]}>
            <header className={classes.header}>
                <IconButton><MenuIcon /></IconButton>
                <Link to={"/"}>
                    <img className={classes.logo} src={logoImage} alt="YooCard.pl" />
                </Link>
                <NavButton>Koszyk</NavButton>
            </header>
            <nav className={classes.navigation}>
                <ul className={classes.list}>
                    {navLinkElements}
                </ul>
            </nav>
            <NavButton>Lupa</NavButton>
            <NavButton>Koszyk</NavButton>
            <NavButton>Login</NavButton>
        </div>
    </div>
}

export default Navigation;