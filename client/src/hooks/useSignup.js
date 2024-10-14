import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import axios from 'axios';

export const useSignup = () => {
  const [errorTwo, setErrorTwo] = useState(null);
  const [isLoadingTwo, setIsLoadingTwo] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (name, email, password) => {
    setIsLoadingTwo(true);
    setErrorTwo(null);

    try {
      const response = await axios.post('http://localhost:4000/api/user/signup', {
        name,  // Include name if it's part of the signup process
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
      setIsLoadingTwo(false);
    } catch (err) {
      setIsLoadingTwo(false);
      setErrorTwo(err.response.data.error || 'An error occurred. Please try again.');
    }
  };

  return { signup, isLoadingTwo, errorTwo };
};
