import React from 'react'
import { AppBar, Toolbar, IconButton, 
  Typography
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { Link } from 'react-router-dom'

const Navigation = () => {
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
                        <Link to="/homepage">Homepage</Link>
                    </li>
                    <li className="nav-list-item">
                        <Link to="/new-wishlist">New wishlist</Link>
                    </li>
                </ul>
            </Toolbar>
        </AppBar>
    )
}

export default Navigation