import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import '../../index.css';
import './App.css';
import RouteController from '../RouteController';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { isHeaderFooterVisible, showError, checkIfShouldBeUpdated } from '../../utils/utils';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { CurrentLocationContext } from '../../contexts/CurrentLocationContext';
import * as api from '../../utils/MainApi';
import * as beatFilmApi from '../../utils/MoviesApi';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [headerFooterVisibility, setHeaderFooterVisibility] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [beatFilms, setBeatFilms] = useState([]);
  const [savedFilms, setSavedFilms] = useState([]);
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

    api.getSavedMovies()
      .then((saved) => {
        const ownedFilms = saved.filter((film) => film.owner._id === currentUser._id);
        setSavedFilms(ownedFilms);
      });

    const shouldBeUpdated = checkIfShouldBeUpdated();
    if (shouldBeUpdated) {
      beatFilmApi.getBaseFilms()
        .then((response) => {
          setBeatFilms(response);
          localStorage.setItem('beatFilms', JSON.stringify(response));
          localStorage.setItem('updateTime', new Date().getTime());
        })
        .catch(showError);
    } else {
      const cachedFilms = JSON.parse(localStorage.getItem('beatFilms'));
      setBeatFilms(cachedFilms);
    }
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
            savedFilms={savedFilms}
            beatFilms={beatFilms}
            setSavedFilms={setSavedFilms}
          />

          <Footer
            showFooter={headerFooterVisibility}
          />
        </div>

      </CurrentLocationContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
