import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import axios from 'axios';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (name, email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:4000/api/user/signup', {
        name,  // Include name if it's part of the signup process
        email,
        password
      });

      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(response.data));

      // update the auth context
      dispatch({ type: 'LOGIN', payload: response.data });

      // update loading state
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err.response.data.error || 'An error occurred. Please try again.');
    }
  };

  return { signup, isLoading, error };
};
