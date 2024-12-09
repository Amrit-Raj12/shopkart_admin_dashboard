import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { BASE_URL } from '../constants/apiUrl';

// Define the shape of the category data
interface Category {
  id: number;
  name: string;
}

interface CategoryContextProps {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  addCategory: (category: Category) => void;
  removeCategory: (id: number) => void;
}

// Create the context
const CategoryContext = createContext<CategoryContextProps | undefined>(undefined);

// Provider component
export const CategoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([]);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/products`); // Replace with your actual API endpoint
        const fetchedCategories = response.data.category.map((name: string, index: number) => ({
          id: index + 1, // Generate a unique ID for each category
          name,
        }));
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const addCategory = (category: Category) => {
    setCategories((prev) => [...prev, category]);
  };

  const removeCategory = (id: number) => {
    setCategories((prev) => prev.filter((category) => category.id !== id));
  };

  return (
    <CategoryContext.Provider value={{ categories, setCategories, addCategory, removeCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

// Custom hook to use the CategoryContext
export const useCategory = (): CategoryContextProps => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategory must be used within a CategoryProvider');
  }
  return context;
};
