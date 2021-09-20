import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Promo from "./Promo/Promo";
import AboutProject from "./AboutProject/AboutProject";
import Techs from "./Techs/Techs";
import AboutMe from "./AboutMe/AboutMe";
import Portfolio from "./Portfolio/Portfolio";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Profile from "./Profile/Profile";
import Login from "./Authorization/Login";
import Register from "./Authorization/Register";
import NotFound from "./NotFound/NotFound";
import Movies from "./Movies/Movies";

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
                <Movies />
            </Route>
            {/*TODO: make protected*/}
            <Route path='/saved-movies'>
                <Movies />
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
