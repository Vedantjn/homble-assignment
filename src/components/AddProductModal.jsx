import React, { useState } from 'react';
import { postRequest } from '../axios';
import '../styles/AddProductModal.css';

const AddProductModal = ({ onClose }) => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productAllergenInfo, setProductAllergenInfo] = useState('');

  const handleSubmit = async () => {
    try {
      await postRequest('/products', {
        name: productName,
        description: productDescription,
        allergenInfo: productAllergenInfo
      });
      // Close the modal after successful submission
      onClose();
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Add Product</h2>
        <div>
          <label>Product Name:</label>
          <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />
        </div>
        <div>
          <label>Product Description:</label>
          <textarea value={productDescription} onChange={(e) => setProductDescription(e.target.value)} />
        </div>
        <div>
          <label>Allergen Info:</label>
          <input type="text" value={productAllergenInfo} onChange={(e) => setProductAllergenInfo(e.target.value)} />
        </div>
        <button onClick={handleSubmit}>Add</button>
      </div>
    </div>
  );
};

export default AddProductModal;
