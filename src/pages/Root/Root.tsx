import React, {useEffect, useState} from "react";
import Navigation, {NavLinkData} from "../../components/Layout/Navigation";
import {Outlet, useSubmit} from "react-router-dom";
import useCookie from "../../hooks/use-cookie";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {checkUserLoggedIn} from "../../store/slices/authSlice";

const navigationLinks: NavLinkData[] = [
    {text: "Strona Główna", to: "/home"},
    {text: "Sklep", to: "/shop"},
    {text: "Kontakt", to: "/contact"},
    {text: "Blog", to: "/blog"},
]

const RootLayout: React.FC = () => {
    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector((state: any) => state.auth.isLoggedIn);

    // const [cookieLogged, setCookieLooged] = useCookie("is_logged_in");
    // const dispatch = useAppDispatch();
    // const submit = useSubmit();
    // const [isLoggedIn, setIsLoggedIn] = useState<boolean>(Boolean(Cookies.get('is_logged_in')));
    //
    console.log("ETETETET")
    useEffect(() => {
        dispatch(checkUserLoggedIn());
        // if (!cookieLogged) {
        //     return;
        // }
        //
        // if ()
        // console.log(cookie)
        // const intervalId = setInterval(() => {
        //     const cookieValue = Boolean(Cookies.get('is_logged_in'));
        //     if (cookieValue !== isLoggedIn) {
        //         setIsLoggedIn(cookieValue);
        //     }
        // }, 1000);  // sprawdź co sekundę

        //
        // return () => clearInterval(intervalId);
    }, [dispatch]);

    // if (isLoggedIn) {
    //
    // }

    return <>
        {/*<Navigation navLinks={navigationLinks}/>*/}
        <Outlet />
    </>
}

export default RootLayout;