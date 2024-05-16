import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import AddProductModal from './AddProductModal';
import useProductData from '../hooks/useProductData'; // Import the custom hook
import '../styles/ProductListingPage.css';

const ProductListingPage = () => {
  const { products, loading, error, addProduct } = useProductData();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const sortedProducts = useMemo(() => {
    return products.sort((a, b) => a.selling_price - b.selling_price);
  }, [products]);

  const redirectToProductPage = (productId) => {
    navigate(`/products/${productId}`);
  };

  const handleAddProduct = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async (productName, productDescription, productAllergenInfo) => {
    await addProduct({ name: productName, description: productDescription, allergenInfo: productAllergenInfo });
    handleCloseModal();
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something went wrong.</p>;
  }

  return (
    <div>
      <h1>Products</h1>
      <div className="product-grid">
        {sortedProducts.map(product => (
          <div key={product.id} className="product-tile" onClick={() => redirectToProductPage(product.id)}>
            <img src={product.productImage} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Selling Price: ₹{product.selling_price}</p>
          </div>
        ))}
      </div>
      <button onClick={handleAddProduct} style={{ marginBottom: '10px' }}>Add Product</button>
      {showModal && <AddProductModal onClose={handleCloseModal} onSubmit={handleSubmit} />}
      <br />
      <br />
    </div>
  );
};

export default ProductListingPage;
