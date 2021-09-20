import React from 'react';
import Navigation from "./Navigation/Navigation";
import AuthenticationHeader from "./AuthenticationHeader/AuthenticationHeader";

const Header = ({ loggedIn, showHeader }) => {

    const determineHeader = (loginStatus) => {
        if (!showHeader) {
            return;
        }
        if (loginStatus) {
            return <Navigation />
        } else {
            return <AuthenticationHeader />
        }
    }
    return (
        <div>
            {determineHeader(loggedIn)}
        </div>
    );
};

export default Header;
