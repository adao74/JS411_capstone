import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container } from "@mui/material";
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const signup = (e) => {
    e.preventDefault();
    
    if (!state.username || !state.password) {
      alert('Please fill in all fields');
      return;
    }

    axios({
      method: 'POST',
      url: '/api/auth/signup', // Update with your actual endpoint
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        username: state.username,
        password: state.password,
      }
    })
    .then(response => {
      console.log('Signup successful:', response);
      navigate("/");
    })
    .catch(error => {
      console.error('Signup error:', error);
      const errorMessage = error.response?.data?.message || 'Signup failed. Please try again.';
      alert(errorMessage);
    });
  };

  return (
    <div className="App">
      <Container maxWidth="sm">
        <form className="signup-form" onSubmit={signup}>
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
            className="signup-button"
            variant="contained"
            color="primary"
          >
            Sign Up
          </Button>
        </form>
        <Button
          onClick={() => navigate("/")}
          variant="text"
        >
          Already have an account? Log in
        </Button>
      </Container>
    </div>
  );
};

export default Signup; 