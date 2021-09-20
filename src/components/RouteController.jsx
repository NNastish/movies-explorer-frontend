import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AuthenticationHeader from "./AuthenticationHeader/AuthenticationHeader";
import Promo from "./Promo/Promo";
import AboutProject from "./AboutProject/AboutProject";
import Techs from "./Techs/Techs";
import AboutMe from "./AboutMe/AboutMe";
import Portfolio from "./Portfolio/Portfolio";
import Footer from "./Footer/Footer";
import Navigation from "./Navigation/Navigation";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Profile from "./Profile/Profile";
import Login from "./Authorization/Login";
import Register from "./Authorization/Register";
import NotFound from "./NotFound/NotFound";

const RouteController = () => {
    return (
        <Switch>
            <Route exact path='/'>
                <Promo />
                <AboutProject />
                <Techs />
                <AboutMe />
                <Portfolio />
            </Route>
            {/*TODO: make protected*/}
            <Route path='/movies'>
                <SearchForm />
                <MoviesCardList yandexDb={true}/>
            </Route>
            {/*TODO: make protected*/}
            <Route path='/saved-movies'>
                <SearchForm />
                <MoviesCardList yandexDb={false}/>
            </Route>
            {/*TODO: make protected*/}
            <Route path='/profile'>
                <Profile />
            </Route>
            <Route path='/signin'>
                <Login />
            </Route>
            <Route path='/signup'>
                <Register />
            </Route>
            {/*TODO: make protected*/}
            <Route path='*'>
                <NotFound />
            </Route>
        </Switch>
    );
};

export default RouteController;
