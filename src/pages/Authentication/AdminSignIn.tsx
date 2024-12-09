import React, { useState } from 'react';
import { SIGN_IN_URL } from '../../constants/apiUrl';
import SignIn from './SignIn';

const AdminSignInPage: React.FC = () => {

    const [error, setError] = useState<string | null>(null);

  const handleAdminSignIn = async (email: string, password: string) => {
    try {
      const response = await fetch(SIGN_IN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const responseData = await response.json(); // Parse the JSON response

      if (!response.ok) {
        // Log the error message from the API
        console.error('Error:', responseData.message);
        setError(responseData.message);
        throw new Error(responseData.message || 'Failed to sign in admin.');
      }

      const user = responseData.user;

      // Log the successful response
      console.log('Success:', responseData);
      localStorage.setItem('token', responseData.token);
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
        // setError('Failed to sign in admin.')
      console.error('Error occurred during sign in:', error);
    }
  };

  return <SignIn onSignIn={handleAdminSignIn} error={error} />;
};

export default AdminSignInPage;
