import React from 'react';
import './App.css';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouteObject,
    RouterProvider,
    Routes,
} from 'react-router-dom';
import RootLayout from "./pages/Root/Root";
import {Router as RemixRouter} from "@remix-run/router/dist/router";
import ErrorPage from "./pages/Root/Error";
import UserProfilePage, {loader as userProfileLoader} from "./pages/Profile/UserProfile";
import ProfilePage from "./pages/Profile/Profile";
import {Provider} from "react-redux";
import store from "./store/store";
import ShopPage from "./pages/Root/Shop";
import UserNotFoundPage from "./pages/Profile/UserProfileError";
import AuthPage, {action as AuthPageAction} from "./pages/Root/Auth";
import WelcomePage from "./pages/Root/Welcome";
import NewUserPage, {newUserAction} from "./pages/Dashboard/Users/NewUser";

const routerDefinitions: RouteObject[] = createRoutesFromElements([
    <Route path="/" id="root" element={<RootLayout/>} errorElement={<ErrorPage/>}>
        <Route path="home"></Route>
        <Route path="shop" element={<ShopPage/>}></Route>
        <Route path="contact"></Route>
        <Route path="blog">
            <Route path=":blogTitle"></Route>
        </Route>
        <Route path="privacy-policy"/>
        <Route path="terms"/>
        <Route path="profil" element={<ProfilePage/>}/>
        <Route path="profil/:username" id="user-profile" element={<UserProfilePage/>} loader={userProfileLoader} errorElement={<UserNotFoundPage/>}/>
        <Route path="auth" element={<AuthPage />} action={AuthPageAction}/>
        <Route path="powitanie" element={<WelcomePage/>}/>
    </Route>,
    <Route path="dashboard">
        <Route path="users">
            <Route path="new" element={<NewUserPage/>} action={newUserAction}/>
            <Route path=":userId">
                <Route path="edit"/>
            </Route>
        </Route>
        <Route path="orders">
            <Route path=":orderId"></Route>
        </Route>
        <Route path="archives"></Route>
    </Route>,
    <Route path="settings"></Route>
    ]
);

const router: RemixRouter = createBrowserRouter(routerDefinitions);

const App: React.FC = () => {
    return <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>;
}

export default App;
