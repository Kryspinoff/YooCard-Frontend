import React from "react";
import {
    defer,
    Form,
    json,
    Link,
    redirect,
    useActionData,
    useLoaderData,
    useLocation,
    useNavigate, useNavigation
} from "react-router-dom";
import useFormInput from "../../hooks/use-form-input";
import classes from "../Auth/LoginForm.module.css";
import FormInput from "../UI/Inputs/FormInput";
import FormInputPhone from "../UI/Inputs/FormInputPhone";
import FormButton from "../UI/Buttons/FormButton";
import {
    isCorrectEmail,
    isCorrectName,
    isCorrectPassword,
    isCorrectReplacedPassword,
    isCorrectUsername
} from "../Auth/RegisterForm";
import {ActionFunction, LoaderFunction} from "@remix-run/router/utils";
import ModalLoading from "../Modals/ModalLoading";
import {AxiosResponse} from "axios";

interface UserFormProps {
}

const CreateUserForm: React.FC<UserFormProps> = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const navigation = useNavigation();
    const actionData = useActionData() as AxiosResponse<{detail: string}>;
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

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        navigate("", {state: {data: {message: "hello"}, step: 2}})
    }

    return <>
        {isSubmitting && <ModalLoading/>}
        <Form method="POST" onContextMenu={() => {return "OK"}}>
            <h2>Nowy użytkownik</h2>
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
                    id="password"
                    name="password"
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
                <FormInputPhone id="phone" name="phone" type="tel" label="Nr. Telefonu" />
                <FormButton disabled={!isValidForm && !isSubmitting} type="submit" name="intent" value="user">Stwórz użytkownika</FormButton>
                {actionData && actionData.data.detail && <p>{actionData.data.detail}</p>}
            </div>
        </Form>
    </>;
}

export default CreateUserForm;

export const userFormAction: ActionFunction = async ({request, params}) => {
    // const data = await request.formData();
    // console.log(data.get("intent"))
    console.log("userFormAction");
    return json({username: "Kartaryna"}, {status: 201});
    // return redirect("/dashboard/users/new");
}

export const userFormLoader: LoaderFunction = async ({request}) => {
    console.log("userFormLoader");
    return defer({message: "kaplica" })
    // return redirect("/picture");
}