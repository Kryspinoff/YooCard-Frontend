import React, {useEffect} from "react";
import {defer, json, redirect, useNavigate, useRouteLoaderData, useSearchParams} from "react-router-dom";
import {ActionFunction, LoaderFunction} from "@remix-run/router/utils";
import services from "../../services/Services";
import {UserLoginData} from "../../services/AuthService";
import {NavigateFunction} from "react-router/dist/lib/hooks";
import LoginForm from "../../components/Auth/LoginForm";


import classes from "./Auth.module.css";
import RegisterForm from "../../components/Auth/RegisterForm";

interface AuthPageProps {
}

const AuthPage: React.FC<AuthPageProps> = () => {
    // const token = useRouteLoaderData("root")
    // const navigate = use
    // const token = useRouteLoaderData("root");
    // const navigate: NavigateFunction = useNavigate();

    // useEffect(() => {
    //     if (token) {
    //         navigate("/")
    //     }
    // }, [token, navigate])
    //
    const [searchParams] = useSearchParams();
    const mode = searchParams.get("mode");

    let content = <LoginForm/>;

    if (mode === "register") {
        content = <RegisterForm/>;
    }

    return <div className={classes.container}>
        {content}
    </div>;
}

export default AuthPage;

const authLoginData = (data: FormData): UserLoginData => {
    return {
        username: data.get("username") as string,
        password: data.get("password") as string
    };
};

interface AuthRegisterResult {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    password: string;
}

const authRegisterData = (data: FormData): AuthRegisterResult => {
    const phoneValue = data.get("phoneNumber");

    const cleanedPhone = (typeof phoneValue === "string") ? phoneValue.replace(/\s|\+/g, "") : "";

    return {
        username: data.get("username") as string,
        email: data.get("email") as string,
        first_name: data.get("firstName") as string,
        last_name: data.get("lastName") as string,
        phone_number: cleanedPhone,
        password: data.get("password") as string
    };
};

export const action: ActionFunction = async ({ request }) => {
    const searchParams = new URL(request.url).searchParams;
    const mode = searchParams.get("mode") || "login";

    if (mode !== "login" && mode !== "register") {
        throw json({message: "Unsupported mode"}, { status: 422})
    }
    const data = await request.formData();

    if (mode === "login") {
        const authData = authLoginData(data)
        const response = await services.auth.login(authData);
        console.log(response)
        // if (response.status !== 200) {
        //     console.log(response.data)
        //     return response.data;
        // }
    }

    // return

    return redirect("/powitanie");

    // if (response)

    // if (mode === "register") {
    //     const authData = authRegisterData(data)
    //
    // }

    // const authData = mode === "login" ? authLoginData(data) : authRegisterData(data);
    //
    // const responseAuth = await

}

const loader: LoaderFunction = async ({request, params}) => {

}