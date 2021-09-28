import React, { useState, useEffect } from 'react';
import '../../index.css';
import './App.css';
import RouteController from "../RouteController";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useHistory, useLocation } from "react-router-dom";
import { isHeaderFooterVisible, showError } from "../../utils/utils";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { CurrentLocationContext } from '../../contexts/CurrentLocationContext';
import * as api from "../../utils/MainApi";

function App() {
    // TODO: change on false basic state
    const [loggedIn, setLoggedIn] = useState(false);
    const [headerFooterVisibility, setHeaderFooterVisibility] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const currentLocation = useLocation();
    const history = useHistory();

    function promoteLogging(userData) {
        setCurrentUser(userData);
        setLoggedIn(true);
        history.push('/movies');
    }

    function handleExit() {
        localStorage.removeItem('jwt');
        setLoggedIn(false);
        history.push('/');
    }

    async function tokenCheck() {
        try {
            const jwt = localStorage.getItem('jwt');
            if (jwt) {
                const userData = await api.getUserContent(jwt);
                if (userData) {
                    promoteLogging(userData);
                }
            }
        } catch (e) {
            showError(e);
        }
    }

    useEffect(() => {
        isHeaderFooterVisible(currentLocation, setHeaderFooterVisibility);
    }, [currentLocation])

    useEffect(() => {
        const tokenCheckStatus = tokenCheck();
        console.log(tokenCheckStatus);
    }, [])

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <CurrentLocationContext.Provider value={currentLocation}>

                <div className='App'>

                    <Header
                        loggedIn={loggedIn}
                        showHeader={headerFooterVisibility}
                    />

                    <RouteController
                        loggedIn={loggedIn}
                        location={currentLocation}
                        promoteLogging={promoteLogging}
                        showError={showError}
                        setCurrentUser={setCurrentUser}
                        handleExit={handleExit}
                    />

                    <Footer
                        showFooter={headerFooterVisibility}
                        currentLocation={currentLocation}
                    />
                </div>

            </CurrentLocationContext.Provider>
        </CurrentUserContext.Provider>
    );
}

export default App;
