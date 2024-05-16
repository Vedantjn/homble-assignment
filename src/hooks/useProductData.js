import { useState, useEffect } from 'react';
import { getRequest, postRequest } from '../axios';

const useProductData = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getRequest('/products');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addProduct = async (newProduct) => {
    try {
      await postRequest('/products', newProduct);
      // Refresh the product listing after successful submission
      const response = await getRequest('/products');
      setProducts(response.data);
    } catch (error) {
      setError(error);
    }
  };

  return { products, loading, error, addProduct };
};

export default useProductData;
