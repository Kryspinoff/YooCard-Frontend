import React, {useState} from "react";
import Card from "../UI/Card";
import {Form, json, Link, useActionData, useAsyncError, useNavigation} from "react-router-dom";
import useInput from "../../hooks/use-input";
import FormInput from "../UI/Inputs/FormInput";

import classes from "./LoginForm.module.css";
import FormButton from "../UI/Buttons/FormButton";
import {UserLoginData} from "../../services/AuthService";
import {ActionFunction} from "@remix-run/router/utils";
import services from "../../services/Services";
import useFormInput from "../../hooks/use-form-input";

const isCorrectUsernameField = (v: string) => {
    const value = v.trim();

    if (value.includes("@")) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(value);
    }

    return value.length > 6 && value.length < 32;
};

const isCorrectPassword = (v: string) => {
    const value = v.trim();
    const min_length = 8;
    const max_length = 64;
    const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

    if (value.length < min_length || value.length > max_length) {
        return false;
    }

    return regex.test(value);
};

interface LoginFormProps {}

const LoginForm: React.FC<LoginFormProps> = () => {
    const actionData = useActionData() as {detail: string};
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";

    const {
        value: usernameValue,
        isTouched: usernameIsTouched,
        isActive: usernameIsActive,
        isValid: usernameIsValid,
        hasError: usernameHasError,
        handleInputChange: usernameHandleInputChange,
        handleInputBlur: usernameHandleInputBlur,
        handleInputFocus: usernameHandleInputFocus,
        reset: usernameReset
    } = useFormInput({initialValue: "", validateValue: isCorrectUsernameField});

    const {
        value: passwordValue,
        isTouched: passwordIsTouched,
        isActive: passwordIsActive,
        isValid: passwordIsValid,
        hasError: passwordHasError,
        handleInputChange: passwordHandleInputChange,
        handleInputBlur: passwordHandleInputBlur,
        handleInputFocus: passwordHandleInputFocus,
        reset: passwordReset
    } = useFormInput({initialValue: "", validateValue: isCorrectPassword });

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        // event.preventDefault();
        // const form = event.currentTarget;
        // const formData = new FormData(form)
        //
        // const response = await services.auth.login({
        //     username: formData.get("username") as string,
        //     password: formData.get("password") as string
        // })

        // console.log(formData.get("username"));
        // const data = event.formData();
        // even
        // if (mode === "login") {
        //     const authData = authLoginData(data)
        //     const response = await services.auth.login(authData);
    }

    // return  <Form onSubmit={handleFormSubmit} method="post">

    const isValidForm = passwordIsValid && usernameIsValid;

    return  <Form method="post">
        <h2>Logowanie</h2>
        <div className={classes["form-elements"]}>
            <FormInput
                id="username"
                name="username"
                label="Nazwa użytkownika/E-mail"
                value={usernameValue}
                isActive={usernameIsActive}
                onChange={usernameHandleInputChange}
                onBlur={usernameHandleInputBlur}
                onFocus={usernameHandleInputFocus}
            />
            <FormInput
                id="password"
                name="password"
                label="Hasło"
                value={passwordValue}
                isActive={passwordIsActive}
                onChange={passwordHandleInputChange}
                onBlur={passwordHandleInputBlur}
                onFocus={passwordHandleInputFocus}
            />
            <FormButton type="submit" className={classes["button-submit"]} disabled={!isValidForm}>Zaloguj się</FormButton>
            <p className={classes.error}>{actionData && actionData.detail}</p>
            <p className={classes["switch-mode"]}>Nie masz konta? <Link to={"?mode=register"}>Zarejestruj się!</Link></p>
            {/*<button onClick={() => setAbc(!abc)}>KLIKNIJ MNIE!</button>*/}
        </div>
    </Form>;
}

export default LoginForm;

const authLoginData = (data: FormData): UserLoginData => {
    return {
        username: data.get("username") as string,
        password: data.get("password") as string
    };
};