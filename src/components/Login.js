import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container } from "@mui/material";
import Cookies from 'js-cookie';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const login = (e) => {
    e.preventDefault();

    if (!state.username || !state.password) {
      alert('Please fill in all fields');
      return;
    }

    axios({
      method: 'POST',
      url: '/api/auth/login', // Update with your actual endpoint
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        username: state.username,
        password: state.password,
      }
    })
    .then(response => {
      const { token } = response.data;
      Cookies.set('access_token', token, { 
        expires: 1, 
        secure: true,
        sameSite: 'strict'
      });
      navigate("/homepage");
    })
    .catch(error => {
      console.error('Login error:', error);
      alert(error.response?.data?.message || 'Login failed. Please try again.');
    });
  };

  return (
    <div className="App">
      <Container maxWidth="sm">
        <form className="login-form" onSubmit={login}>
          <TextField
            required
            onChange={handleTextChange}
            value={state.username}
            name="username"
            label="Username"
            type="text"
          />
          <TextField
            required
            onChange={handleTextChange}
            value={state.password}
            name="password"
            label="Password"
            type="password"
          />
          <Button
            type="submit"
            className="login-button"
            variant="contained"
            color="primary"
          >
            Login
          </Button>
        </form>
        <Button
          onClick={() => navigate("/signup")}
          variant="text"
        >
          Need an account? Sign up
        </Button>
      </Container>
    </div>
  );
};

export default Login;
