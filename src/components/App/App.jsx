import React, { useState, useEffect } from 'react';
import '../../index.css';
import './App.css';
import RouteController from "../RouteController";
import Header from "../Header";
import Footer from "../Footer/Footer";
import {useLocation} from "react-router-dom";
import {FOOTER_HEADER_ENDPOINTS} from "../../utils/constants";
import { handleLocation } from "../../utils/utils";

function App() {
    // TODO: change on false basic state
    const [loggedIn, setLoggedIn] = useState(true);
    const [headerFooterVisibility, setHeaderFooterVisibility] = useState(false);
    const currentLocation = useLocation();



    useEffect(() => {
        handleLocation(currentLocation, setHeaderFooterVisibility);
    }, [currentLocation])

    return (
        <div className={'App'}>
            <Header
                loggedIn={loggedIn}
                showHeader={headerFooterVisibility}
            />
            <RouteController />
            <Footer showFooter={headerFooterVisibility}/>
        </div>
    );
}

export default App;
