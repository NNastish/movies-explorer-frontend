import React from 'react';
import Navigation from '../Navigation/Navigation';
import AuthenticationHeader from './AuthenticationHeader/AuthenticationHeader';

const Header = ({ loggedIn, showHeader }) => {
  const determineHeader = (loginStatus) => {
    if (loginStatus) {
      return <Navigation />;
    }
    return <AuthenticationHeader />;
  };

  return (
    <div>
      {showHeader && determineHeader(loggedIn)}
    </div>
  );
};

export default Header;
