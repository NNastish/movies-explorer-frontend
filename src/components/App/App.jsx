import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import '../../index.css';
import './App.css';
import RouteController from '../RouteController';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { getSearchedMovies, isHeaderFooterVisible, showError } from '../../utils/utils';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { CurrentLocationContext } from '../../contexts/CurrentLocationContext';
import * as api from '../../utils/MainApi';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [movies, setMovies] = useState(getSearchedMovies());
  const [headerFooterVisibility, setHeaderFooterVisibility] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const currentLocation = useLocation();
  const history = useHistory();
  console.log(history);
  function promoteLogging(userData) {
    setCurrentUser(userData);
    setLoggedIn(true);
  }

  function handleExit() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('movies');
    localStorage.removeItem('searchedMovies');
    setLoggedIn(false);
    setMovies([]);
    setCurrentUser({ email: '', name: '', _id: '' });
    history.push('/signin');
  }

  async function tokenCheck() {
    try {
      const jwt = localStorage.getItem('jwt');
      if (jwt) {
        const userData = await api.getUserContent(jwt);
        delete userData.__v;
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
  }, [currentLocation]);

  useEffect(() => {
    tokenCheck();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentLocationContext.Provider value={currentLocation}>

        <div className="App">

          <Header
            loggedIn={loggedIn}
            showHeader={headerFooterVisibility}
          />

          <RouteController
            loggedIn={loggedIn}
            promoteLogging={promoteLogging}
            showError={showError}
            setCurrentUser={setCurrentUser}
            handleExit={handleExit}
            films={movies}
          />

          <Footer
            showFooter={headerFooterVisibility}
          />
        </div>

      </CurrentLocationContext.Provider>
    </CurrentUserContext.Provider>
  );
}
