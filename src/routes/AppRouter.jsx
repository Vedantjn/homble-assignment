import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductListingPage from "../components/ProductListingPage";
import ProductPage from "../components/ProductPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/products/*" element={<ProductListingPage />} />
      <Route path="/products/:productId" element={<ProductPage />} />
    </Routes>
  );
}

export default AppRouter;