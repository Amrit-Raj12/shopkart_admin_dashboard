import { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../constants/apiUrl';

interface ProductData {
  thumbnail: string;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  brand: string;
  stock: number;
  rating: number;
  category: string;
}

interface UseAddProductsReturn {
  addProduct: (product: ProductData) => Promise<void>;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const useAddProducts = (token: string): UseAddProductsReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const addProduct = async (product: ProductData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post(
        `${BASE_URL}/api/products`,
        product,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Product added successfully:', response.data);
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      console.error('Error adding product:', err);
    } finally {
      setLoading(false);
    }
  };

  return { addProduct, loading, error, success };
};

export default useAddProducts;
