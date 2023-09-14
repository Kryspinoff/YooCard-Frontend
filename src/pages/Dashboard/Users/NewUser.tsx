import React from "react";
import {
    defer, json,
    Outlet,
    redirect,
    Route,
    Routes,
    useActionData,
    useLoaderData,
    useLocation, useNavigate,
    useRoutes
} from "react-router-dom";
import {ActionFunction} from "@remix-run/router/utils";

import classes from "./NewUser.module.css";
import CreateUserForm, {userFormAction, userFormLoader} from "../../../components/Users/CreateUserForm";
import UserPictureForm from "../../../components/Users/UserPictureForm";
import services from "../../../services/Services";
import {UserCreateData, UserResponseData} from "../../../interfaces/UserResponseData";
import {AxiosError, AxiosResponse, isAxiosError} from "axios";

interface NewUserPageProps {
}

const NewUserPage: React.FC<NewUserPageProps> = () => {
    const actionData = useActionData();
    console.log(actionData)
    // const loaderData = useLoaderData();
    // const location = useLocation();
    // const navigate = useNavigate();
    // console.log(actionData)
    // console.log(location.state)
    //
    // let content = <CreateUserForm/>
    //
    // if (actionData?.step === 2 && actionData?.userData) {
    //     content = <UserPictureForm username={actionData.userData.username} profileUrl={actionData.userData.picture}/>
    // }

    return <div className={classes.container}>
        <CreateUserForm/>
    </div>;
}

export default NewUserPage;

export const newUserAction: ActionFunction = async ({ request, params, context}) => {
    const data = await request.formData()
    const intent = data.get("intent")
    const dataObject = Object.fromEntries(data.entries());
    const phoneValue = data.get("phone") as string;
    const userData: UserCreateData = {
        username: data.get("username"),
        firstName: data.get("first-name"),
        lastName: data.get("last-name"),
        email: data.get("email"),
        password: data.get("password"),
        phoneNumber: phoneValue.startsWith('+') && phoneValue.length <= 4 ? null : phoneValue
    } as UserCreateData;
    try {
        const response = await services.user.create(userData)
        return redirect(`/profil/${response.data.username}`)
    } catch (error) {
        if (!isAxiosError(error)) {
            return json({detail: "Network error"}, {status: 500, statusText: "Network error"})
        }
        return error.response
    }
}

// export const newUserAction: ActionFunction = async ({ request, params, context}) => {
//     const data = await request.formData()
//     const intent = data.get("intent")
//     const dataObject = Object.fromEntries(data.entries());
//     console.log("CONTEXT", context)
//     console.log("params", params)
//     switch (intent) {
//         case "user":
//             const phoneValue = data.get("phone") as string;
//             const userData: UserCreateData = {
//                 username: data.get("username"),
//                 firstName: data.get("first-name"),
//                 lastName: data.get("last-name"),
//                 email: data.get("email"),
//                 password: data.get("password"),
//                 phoneNumber: phoneValue.startsWith('+') && phoneValue.length <= 4 ? null : phoneValue
//             } as UserCreateData;
//             return json({step: 2, userData: await services.user.create(userData)})
//         case "picture":
//             console.log(dataObject)
//             if (data.get("file") !== "") {
//                 const response = await services.user.uploadPicture()
//             }
//
//             return json({step: 2})
//         case "tiles":
//             return redirect("./")
//             // return services.user.create(dataObject)
//     }
// }

// export const userPictureAction: ActionFunction = async () => {
//     console.log("userPictureAction");
//     return redirect("/");
// }