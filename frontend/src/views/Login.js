import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../authContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:3000/api/v1/login', {
        user: {
          email: email,
          password: password,
        },
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const authToken = response.data.authToken;
      console.log(response.data);
  
      // Call the login function from the auth context to update the state
      login(authToken);
  
      // Redirect to another page after successful login
      navigate('/'); // Change '/dashboard' to the desired route
  
    } catch (error) {
      console.error('Login error:', error);
    }
  };
  
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default Login;
