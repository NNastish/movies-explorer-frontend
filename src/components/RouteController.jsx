import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Promo from './Promo/Promo';
import AboutProject from './AboutProject/AboutProject';
import Techs from './Techs/Techs';
import AboutMe from './AboutMe/AboutMe';
import Portfolio from './Portfolio/Portfolio';
import Profile from './Profile/Profile';
import Login from './Authorization/Login';
import Register from './Authorization/Register';
import NotFound from './NotFound/NotFound';
import MovieController from './MoviesRelatedComponents/MovieController';
import ProtectedRoute from './ProtectedRoute';
import * as api from '../utils/MainApi';

export default function RouteController({
  loggedIn, promoteLogging, showError, setCurrentUser,
  handleExit, films,
}) {
  const [isUpdateError, setIsUpdateError] = useState(false);
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);
  const [isLoginError, setIsLoginError] = useState(false);
  const [isFormProceed, setIsFormProceed] = useState(false);
  const [isRegisterError, setIsRegisterError] = useState(false);
  const history = useHistory();

  async function handleLogin(login) {
    try {
      const loginResponse = await api.login(login);
      const { user, token } = loginResponse;
      if (token) {
        localStorage.setItem('jwt', token);
        promoteLogging(user);
        history.push('/movies');
      }
    } catch (e) {
      showError(e);
      setIsLoginError(true);
    } finally {
      setIsFormProceed(false);
    }
  }

  async function handleRegister(register) {
    try {
      const response = await api.register(register);
      if (response) {
        const { email, password } = register;
        handleLogin({ email, password });
      }
    } catch (e) {
      showError(e);
      setIsRegisterError(true);
    } finally {
      setIsFormProceed(false);
    }
  }

  async function handleUpdateUser(userInfo) {
    try {
      const jwtToken = localStorage.getItem('jwt');
      const userUpdated = await api.updateUserInfo(userInfo, jwtToken);
      if (userUpdated) {
        const { name, email } = userUpdated;
        setCurrentUser({ name, email });
        setIsUpdateSuccess(true);
      }
    } catch (e) {
      showError(e);
      setIsUpdateError(true);
    }
  }

  useEffect(() => {
    setIsLoginError(false);
    setIsRegisterError(false);
  }, [history]);

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
        films={films}
      />
      <ProtectedRoute
        path="/saved-movies"
        loggedIn={loggedIn}
        component={MovieController}
        films={films}
      />
      <ProtectedRoute
        path="/profile"
        loggedIn={loggedIn}
        component={Profile}
        handleExit={handleExit}
        handleUpdateUser={handleUpdateUser}
        isUpdateError={isUpdateError}
        setIsUpdateError={setIsUpdateError}
        isUpdateSuccess={isUpdateSuccess}
        setIsUpdateSuccess={setIsUpdateSuccess}
      />
      <Route path="/signin">
        <Login
          handleLogin={handleLogin}
          isLoginError={isLoginError}
          isFormProceed={isFormProceed}
          setIsFormProceed={setIsFormProceed}
        />
      </Route>
      <Route path="/signup">
        <Register
          handleRegister={handleRegister}
          isRegisterError={isRegisterError}
          isFormProceed={isFormProceed}
          setIsFormProceed={setIsFormProceed}
        />
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  );
}
