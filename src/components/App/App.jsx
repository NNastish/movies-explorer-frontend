import React from 'react';
import '../../index.css';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import AboutProject from '../AboutProject/AboutProject';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Header from '../Header/Header';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Footer from '../Footer/Footer';
import NotFound from '../NotFound/NotFound';
import Navigation from '../Navigation/Navigation';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Promo from '../Promo/Promo';
import Main from "../Main/Main";
import NavTab from "../NavTab/NavTab";


function App() {
    return (
        <div className={'App'}>
            <Switch>
                <Route exact path='/'>
                    <Header />
                    <Promo />
                    <AboutProject />
                    <Techs />
                    <AboutMe />
                    <Portfolio />
                    <Footer />
                </Route>
                <Route path='/movies'>
                    <Navigation />
                    <SearchForm />
                    <MoviesCardList yandexDb={true}/>
                    <Footer />
                </Route>
                <Route path='/saved-movies'>
                    <Navigation />
                    <SearchForm />
                    <MoviesCardList yandexDb={false}/>
                    <Footer />
                </Route>
                <Route path='/profile'>
                    <Navigation />
                    <Profile />
                </Route>
                <Route path='/signin'>
                    <Login />
                </Route>
                <Route path='/signup'>
                    <Register />
                </Route>
                <Route path='/notfound'>
                    <NotFound />
                </Route>
            </Switch>
        </div>
    );
}

export default App;
