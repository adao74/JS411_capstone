import React from 'react'
import Cookies from 'js-cookie'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './containers/Home'
import CreateWishlist from './containers/CreateWishlist'
import Login from './components/Login'
import Signup from './components/Signup'

const checkAuth = () => {
    const token = Cookies.get('access_token');
    return token ? true : false
}

const ProtectedRoute = (props) => {
    const { component: Component, ...rest } = props;
    return (
        checkAuth() ? ( <Component {...rest} /> ) : ( <Navigate to="/" /> )
    );
};

const Router = () => {
    return (
        <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/new-wishlist" element={<ProtectedRoute component={CreateWishlist}/>} />
            <Route path="/homepage" element={<ProtectedRoute component={Home}/>} />
            <Route path="/signup" element={<Signup />} />
        </Routes>
    );
};

export default Router;