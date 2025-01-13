import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './containers/Dashboard'
import Import from './containers/Import'
import Home from './components/Home'

const Router = () => {
    return (
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/new-wishlist" element={<Import />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    );
};

export default Router;