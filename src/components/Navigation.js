import React from 'react'
import { AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const Navigation = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove the access token cookie
        Cookies.remove('access_token');
        // Redirect to login page
        navigate('/');
    };

    return (
        <AppBar position="relative">
            <Toolbar>
                <IconButton color="inherit">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" style={{ flexGrow: "1" }}>
                    Wishlist app
                </Typography>
                <ul className="nav-list">
                    <li className="nav-list-item">
                        <Button 
                            color="inherit"
                            onClick={() => navigate('/homepage')}
                        >
                            Home
                        </Button>
                    </li>
                    <li className="nav-list-item">
                        <Button 
                            color="inherit"
                            onClick={() => navigate('/new-wishlist')}
                        >
                            New wishlist
                        </Button>
                    </li>
                    <li className="nav-list-item">
                        <Button 
                            color="inherit" 
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    </li>
                </ul>
            </Toolbar>
        </AppBar>
    )
}

export default Navigation