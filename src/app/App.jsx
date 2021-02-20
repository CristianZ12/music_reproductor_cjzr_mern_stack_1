import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import 'bootstrap/dist/css/bootstrap.css';
import './App.scss';

import Navigation from './Components/Navigation/Navigation';
import Register from './Components/User/Register';
import Login from './Components/User/Login';
import Profile from './Components/Music/Profile';
import Users from './Components/Music/Users';
import UpdateUser from './Components/Music/UpdateUser';
import Artist from './Components/Music/Artist/Artist';
import Album from './Components/Music/Album/Album';
import Sing from './Components/Music/Sing/SIng';

const App = () => {
    return(
        <Router>
            <Navigation />
            <ToastContainer />

            <Switch>
                <Route path="/" exact />
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <Route path="/profile" component={Profile} />
                <Route path="/users" component={Users} />
                <Route path="/update/user/:id" component={UpdateUser} />
                <Route path="/artist" component={Artist} />
                <Route path="/album/:id" component={Album} />
                <Route path="/sing/:id" component={Sing} /> 
            </Switch>
        </Router>
    );
}

export default App;
