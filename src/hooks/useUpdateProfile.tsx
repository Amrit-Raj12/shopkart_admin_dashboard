import { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../constants/apiUrl';

interface UserData {
  name: string;
  age: number;
  email: string;
}

interface UseUpdateUserReturn {
  updateUser: (product: UserData) => Promise<void>;
  loading: boolean;
  updateError: string | null;
  success: boolean;
}

const useUpdateUser = (token: string): UseUpdateUserReturn => {
  const [loading, setLoading] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const updateUser = async (user: UserData) => {
    setLoading(true);
    setUpdateError(null);
    setSuccess(false);

    try {
      const response = await axios.patch(
        `${BASE_URL}/api/users/me`,
        user,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('User updated successfully:', response.data);
      setSuccess(true);
    } catch (err) {
        setUpdateError(err instanceof Error ? err.message : 'Something went wrong');
      console.error('Error adding product:', err);
    } finally {
      setLoading(false);
    }
  };

  return { updateUser, loading, updateError, success };
};

export default useUpdateUser;
