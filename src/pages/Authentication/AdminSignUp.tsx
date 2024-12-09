import React from 'react';
import SignUp from './SignUp';
import { SIGN_UP_URL } from '../../constants/apiUrl';

const AdminRegistrationPage: React.FC = () => {
  const handleAdminRegister = async (name: string, email: string, password: string, isAdmin: boolean) => {
    // Replace with your API call logic
    const response = await fetch(SIGN_UP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, email, password, isAdmin }),
    });

    if (!response.ok) {
      throw new Error('Failed to register admin.');
    }
  };

  return <SignUp onRegister={handleAdminRegister} />;
};

export default AdminRegistrationPage;
