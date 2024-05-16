import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRequest } from '../axios';
import '../styles/ProductPage.css'; 

const ProductPage = () => {
  const { productId } = useParams(); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDescription, setShowDescription] = useState(false);
  const [showAllergenInfo, setShowAllergenInfo] = useState(false);
  const [showUsage, setShowUsage] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getRequest(`/products/${productId}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>Product not found!</p>;
  }

  return (
    <div className="product-details">
      <h2>{product.name}</h2>
      <img src={product.productImage} alt={product.name} />

      <div className="section">
        <h3 onClick={() => setShowDescription(!showDescription)}>Description</h3>
        {showDescription && <p>{product.description}</p>}
      </div>

      <div className="section">
        <h3 onClick={() => setShowAllergenInfo(!showAllergenInfo)}>Allergen Information</h3>
        {showAllergenInfo && <p>{product.allergen_info}</p>}
      </div>

      <div className="section">
        <h3 onClick={() => setShowUsage(!showUsage)}>Usage Instructions</h3>
        {showUsage && <p>{product.cooking_instruction}</p>}
      </div>

      <p className="price">Selling Price: ₹{product.selling_price}</p>
    </div>
  );
};

export default ProductPage;
