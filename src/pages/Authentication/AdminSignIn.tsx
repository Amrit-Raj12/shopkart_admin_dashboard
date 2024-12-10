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

      const responseData = await response.json();

      if (response.ok) {
        const user = responseData.user;

        console.log('Success:', responseData);
        localStorage.setItem('token', responseData.token);
        localStorage.setItem('user', JSON.stringify(user));

        // Clear error if the response is successful
        setError(null);
        return { success: true, user };
      } else {
        console.error('Sign in Error:', responseData.message);
        
        // Set the error from response message
        setError(responseData.message || 'Failed to sign in admin.');
        return {success:false, message: responseData.message}
      }
    } catch (error) {
      console.error('Error occurred during sign in:', error);

      // Set error for unexpected issues
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return <SignIn onSignIn={handleAdminSignIn} error={error} />;
};

export default AdminSignInPage;
