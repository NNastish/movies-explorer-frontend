import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import Promo from './Promo/Promo';
import AboutProject from './AboutProject/AboutProject';
import Techs from './Techs/Techs';
import AboutMe from './AboutMe/AboutMe';
import Portfolio from './Portfolio/Portfolio';
import Profile from './Profile/Profile';
import Login from './Authorization/Login';
import Register from './Authorization/Register';
import NotFound from './NotFound/NotFound';
import Movies from './MoviesRelatedComponents/Movies/Movies';
import SavedMovies from './MoviesRelatedComponents/SavedMovies/SavedMovies';
import MovieController from './MoviesRelatedComponents/MovieController';
import ProtectedRoute from './ProtectedRoute';
import * as api from '../utils/MainApi';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { BASE_URL_YANDEX } from '../utils/MoviesApi';
import { useFormWithValidation } from '../utils/customHooks';

const RouteController = ({
  loggedIn, promoteLogging, showError, setCurrentUser,
  handleExit, savedFilms, beatFilms, setSavedFilms,
}) => {
  const validation = useFormWithValidation();

  async function handleLogin(login) {
    try {
      const loginResponse = await api.login(login);
      if (loginResponse) {
        const { user, token } = loginResponse;
        localStorage.removeItem('jwt');
        localStorage.setItem('jwt', token);
        promoteLogging(user);
      }
    } catch (e) {
      showError(e);
    }
  }

  async function handleRegister(register) {
    try {
      const response = await api.register(register);
      if (response) {
        const { email, password } = register;
        await handleLogin({ email, password });
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
        const { name, email } = userUpdated;
        setCurrentUser({ name, email });
      }
    } catch (e) {
      showError(e);
    }
  }

  // async function saveMovie(movie) {
  //   try {
  //     const {
  //       country, director, duration, year,
  //       description, image, trailerLink: trailer,
  //       nameRU, nameEN, id: movieId,
  //     } = movie;
  //     const imageUrl = `${BASE_URL_YANDEX}${image?.url}`;
  //     const thumbnail = `${BASE_URL_YANDEX}${image?.formats?.thumbnail?.url}`;
  //     const movieToSave = {
  //       country: country ?? 'undefined',
  //       director: director ?? 'undefined',
  //       duration,
  //       year: year ?? 'undefined',
  //       description: description ?? 'undefined',
  //       image: imageUrl,
  //       trailer,
  //       nameEN: nameEN ?? 'undefined',
  //       nameRU: nameRU ?? 'undefined',
  //       movieId,
  //       thumbnail,
  //     };
  //     const token = localStorage.getItem('jwt');
  //     const isAlreadySaved = savedFilms.some((film) => film.movieId === movieToSave.movieId);
  //     if (!isAlreadySaved) {
  //       await api.saveMovie(movieToSave, token);
  //       setSavedFilms([...savedFilms, movieToSave]);
  //     }
  //   } catch (e) {
  //     showError(e);
  //   }
  // }

  // async function deleteMovie(movieId) {
  //   try {
  //     const token = localStorage.getItem('jwt');
  //     const deleted = await api.deleteMovie(movieId, token);
  //     if (deleted) {
  //       const newFilms = savedFilms.filter((film) => film._id !== movieId);
  //       setSavedFilms(newFilms);
  //     }
  //   } catch (e) {
  //     showError(e);
  //   }
  // }

  return (
    <Switch>
      <Route exact path="/">
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </Route>
      <ProtectedRoute
        path="/movies"
        loggedIn={loggedIn}
        component={MovieController}
        // component={Movies}
        // saveMovie={saveMovie}
        // deleteMovie={deleteMovie}
        // beatFilms={beatFilms}
      />
      <ProtectedRoute
        path="/saved-movies"
        loggedIn={loggedIn}
        component={MovieController}
        // component={SavedMovies}
        // deleteMovie={deleteMovie}
        // savedFilms={savedFilms}
      />
      <ProtectedRoute
        path="/profile"
        component={Profile}
        loggedIn={loggedIn}
        handleExit={handleExit}
        handleUpdateUser={handleUpdateUser}
        validation={validation}
      />
      <ProtectedRoute
        path="*"
        component={NotFound}
        loggedIn={loggedIn}
      />
      <Route path="/signin">
        <Login
          handleLogin={handleLogin}
          validation={validation}
        />
      </Route>
      <Route path="/signup">
        <Register
          handleRegister={handleRegister}
          validation={validation}
        />
      </Route>
    </Switch>
  );
};

export default RouteController;
