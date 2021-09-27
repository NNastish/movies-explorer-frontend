import React, { useEffect, useContext } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Promo from "./Promo/Promo";
import AboutProject from "./AboutProject/AboutProject";
import Techs from "./Techs/Techs";
import AboutMe from "./AboutMe/AboutMe";
import Portfolio from "./Portfolio/Portfolio";
import Profile from "./Profile/Profile";
import Login from "./Authorization/Login";
import Register from "./Authorization/Register";
import NotFound from "./NotFound/NotFound";
import Movies from "./MoviesRelatedComponents/Movies/Movies";
import ProtectedRoute from "./ProtectedRoute";
import * as api from '../utils/MainApi'
import {CurrentUserContext} from "../contexts/CurrentUserContext";

const RouteController = ({loggedIn, location, promoteLogging, showError, setCurrentUser, handleExit}) => {
    const currentUser = useContext(CurrentUserContext);

    async function handleLogin(login) {
        try {
            const loginResponse = await api.login(login);
            if (loginResponse) {
                const { user, token } = loginResponse;
                const { name, email } = user;
                localStorage.setItem('jwt', token);
                promoteLogging({ name, email });
            }
        } catch (e) {
            showError(e);
        }
    }

    async function handleRegister(register) {
        try {
            const response = await api.register(register);
            if (response) {
                // useful fields for login;
                const {email, password} = register;
                await handleLogin({email, password});
            }
        } catch (e) {
            showError(e);
        }
    }

    async function handleUpdateUser(userInfo) {
        try {
            const jwtToken = localStorage.getItem('jwt');
            const userUpdated = await api.updateUserInfo(userInfo, jwtToken);
            if (userUpdated) {
                const {name, email} = userUpdated;
                setCurrentUser({name, email});
            }
        } catch (e) {
            showError(e);
        }
    }

    return (
        <Switch>
            <Route exact path='/'>
                <Promo/>
                <AboutProject/>
                <Techs/>
                <AboutMe/>
                <Portfolio/>
            </Route>
            <ProtectedRoute
                path='/movies'
                component={Movies}
                loggedIn={loggedIn}
            />
            {/*TODO: maybe change Children to SavedMovies*/}
            <ProtectedRoute
                path='/saved-movies'
                component={Movies}
                loggedIn={loggedIn}
            />
            <ProtectedRoute
                path='/profile'
                component={Profile}
                loggedIn={loggedIn}
                currentUser={currentUser}
                handleExit={handleExit}
                handleUpdateUser={handleUpdateUser}
            />
            <Route path='/signin'>
                <Login location={location} handleLogin={handleLogin}/>
            </Route>
            <Route path='/signup'>
                <Register location={location} handleRegister={handleRegister}/>
            </Route>
            <ProtectedRoute
                path='*'
                component={NotFound}
                loggedIn={loggedIn}
            />
        </Switch>
    );
};

export default RouteController;
