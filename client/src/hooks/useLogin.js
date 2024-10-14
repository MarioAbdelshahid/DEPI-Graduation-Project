import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import axios from 'axios';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:4000/api/user/login', {
        email,
        password
      });

      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(response.data));
      localStorage.setItem('token', response.data.token); // Store the token
      localStorage.setItem('userId', response.data.id); // Store the user ID

      // update the auth context
      dispatch({ type: 'LOGIN', payload: response.data });

      // update loading state
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err.response.data.error || 'An error occurred. Please try again.');
    }
  };

  return { login, isLoading, error };
};
