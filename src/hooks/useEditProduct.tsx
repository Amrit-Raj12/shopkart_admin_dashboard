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
  editProduct: (product: ProductData) => Promise<void>;
  editLoading: boolean;
  editError: string | null;
  success: boolean;
}

const useEditProduct = (id: string,token: string): UseAddProductsReturn => {
  const [editLoading, setLoading] = useState(false);
  const [editError, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const editProduct = async (product: ProductData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.patch(
        `${BASE_URL}/api/products/${id}`,
        product,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Product updated successfully:', response.data);
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      console.error('Error adding product:', err);
    } finally {
      setLoading(false);
    }
  };

  return { editProduct, editLoading, editError, success };
};

export default useEditProduct;
