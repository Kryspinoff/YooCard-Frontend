import React, {useState} from "react";
import {Form, Link} from "react-router-dom";
import FormInput from "../UI/Inputs/FormInput";
import FormButton from "../UI/Buttons/FormButton";
import classes from "./LoginForm.module.css";
import FormInputPhone from "../UI/Inputs/FormInputPhone";
import PhonePrefixByCountryDropdown from "../UI/Dropdown/PhonePrefixByCountryDropdown";
import useFormInput from "../../hooks/use-form-input";

interface RegisterFormProps {
}


const RegisterForm: React.FC<RegisterFormProps> = () => {
    const [password1, setPassword1] = useState('');
    // const [password2, setPassword2] = useState('');
    // const [passwordError, setPasswordError] = useState<string>("");

    // const validatePasswordReplaceInputChange = (password2: string) => {
    //     console.log("DUPA", password2)
    //     const isCorrectPassword = isCorrectReplacedPassword(password1, password2);
    //     if (isCorrectPassword) {
    //         // setPasswordError("")
    //         return true
    //     }
    //     // setPasswordError("hasła się różnią")
    //     return false
    //     // return isCorrectReplacedPassword(password1, password2)
    // }

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
    } = useFormInput({initialValue: "", validateValue: isCorrectUsername});

    const {
        value: firstNameValue,
        isTouched: firstNameIsTouched,
        isActive: firstNameIsActive,
        isValid: firstNameIsValid,
        hasError: firstNameHasError,
        handleInputChange: firstNameHandleInputChange,
        handleInputBlur: firstNameHandleInputBlur,
        handleInputFocus: firstNameHandleInputFocus,
        reset: firstNameReset
    } = useFormInput({initialValue: "", validateValue: isCorrectName});

    const {
        value: lastNameValue,
        isTouched: lastNameIsTouched,
        isActive: lastNameIsActive,
        isValid: lastNameIsValid,
        hasError: lastNameHasError,
        handleInputChange: lastNameHandleInputChange,
        handleInputBlur: lastNameHandleInputBlur,
        handleInputFocus: lastNameHandleInputFocus,
        reset: lastNameReset
    } = useFormInput({initialValue: "", validateValue: isCorrectName});

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
    } = useFormInput({initialValue: "", validateValue: isCorrectPassword});

    const {
        value: replacedPasswordValue,
        isTouched: replacedPasswordIsTouched,
        isActive: replacedPasswordIsActive,
        isValid: replacedPasswordIsValid,
        hasError: replacedPasswordHasError,
        handleInputChange: replacedPasswordHandleInputChange,
        handleInputBlur: replacedPasswordHandleInputBlur,
        handleInputFocus: replacedPasswordHandleInputFocus,
        reset: replacedPasswordReset
    } = useFormInput({initialValue: "", validateValue: isCorrectReplacedPassword.bind(null, passwordValue)});

    const {
        value: emailValue,
        isTouched: emailIsTouched,
        isActive: emailIsActive,
        isValid: emailIsValid,
        hasError: emailHasError,
        handleInputChange: emailHandleInputChange,
        handleInputBlur: emailHandleInputBlur,
        handleInputFocus: emailHandleInputFocus,
        reset: emailReset
    } = useFormInput({initialValue: "", validateValue: isCorrectEmail});

    const isValidForm = usernameIsValid && firstNameIsValid && lastNameIsValid && passwordIsValid && replacedPasswordIsValid && emailIsValid; // phoneHasError

    return <Form>
        <h2>Rejestracja</h2>
        <div className={classes["form-elements"]}>
            <FormInput
                id="username"
                name="username"
                label="Nazwa użytkownika"
                required={true}
                value={usernameValue}
                isActive={usernameIsActive}
                isTouched={usernameIsTouched}
                hasError={usernameHasError}
                onChange={usernameHandleInputChange}
                onBlur={usernameHandleInputBlur}
                onFocus={usernameHandleInputFocus}
            />
            <FormInput
                id="first-name"
                name="first-name"
                label="Imię"
                required={true}
                value={firstNameValue}
                isActive={firstNameIsActive}
                isTouched={firstNameIsTouched}
                hasError={firstNameHasError}
                onChange={firstNameHandleInputChange}
                onBlur={firstNameHandleInputBlur}
                onFocus={firstNameHandleInputFocus}
            />
            <FormInput
                id="last-name"
                name="last-name"
                label="Nazwisko"
                required={true}
                value={lastNameValue}
                isActive={lastNameIsActive}
                isTouched={lastNameIsTouched}
                hasError={lastNameHasError}
                onChange={lastNameHandleInputChange}
                onBlur={lastNameHandleInputBlur}
                onFocus={lastNameHandleInputFocus}
            />
            <FormInput
                id="password1"
                name="password1"
                label="Hasło"
                required={true}
                value={passwordValue}
                isActive={passwordIsActive}
                isTouched={passwordIsTouched}
                hasError={passwordHasError}
                onChange={passwordHandleInputChange}
                onBlur={passwordHandleInputBlur}
                onFocus={passwordHandleInputFocus}
            />
            <FormInput
                id="password2"
                name="password2"
                label="Powtórz hasło"
                required={true}
                value={replacedPasswordValue}
                isActive={replacedPasswordIsActive}
                isTouched={replacedPasswordIsTouched}
                hasError={replacedPasswordHasError}
                onChange={replacedPasswordHandleInputChange}
                onBlur={replacedPasswordHandleInputBlur}
                onFocus={replacedPasswordHandleInputFocus}
            />
            <FormInput
                id="email"
                name="email"
                label="E-mail"
                required={true}
                value={emailValue}
                isActive={emailIsActive}
                isTouched={emailIsTouched}
                hasError={emailHasError}
                onChange={emailHandleInputChange}
                onBlur={emailHandleInputBlur}
                onFocus={emailHandleInputFocus}
            />
            {/*<FormInput id="phone" name="phone" type="tel"  label="Nr. Telefonu"/>*/}
            <FormInputPhone id="phone" name="phone" type="tel" label="Nr. Telefonu" />
            <FormButton disabled={!isValidForm}>Zarejestruj się</FormButton>
            <p className={classes["switch-mode"]}>Masz już konto? <Link to={"?mode=login"}>Zaloguj się!</Link></p>
        </div>
    </Form>;
}

export default RegisterForm;


export const isCorrectUsername = (value: string): boolean => {
    const regex = /^[a-zA-Z0-9_-]+$/;
    return value.trim().length >= 6 && value.trim().length <= 32 && regex.test(value);
};

export const isCorrectName = (value: string): boolean => value.trim().length >= 3 && value.trim().length <= 32;

export const isCorrectEmail = (value: string): boolean => {
    return Boolean(String(value)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ));
};

export const isCorrectPassword = (value: string): boolean => {
    const v = value.trim();
    const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,64}$/;
    return regex.test(v);
};

export const isCorrectReplacedPassword = (value1: string, value2: string): boolean => {
    return value1 === value2 && isCorrectPassword(value1) && isCorrectPassword(value2);
};