import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/product-home/product-home';
import ProductDescription from './pages/product-description/product-description';
import { use } from 'react';

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user')); // Retrieve user from local storage

  if (!user || !['USER', 'ADMIN', 'DATA_STEWARD'].includes(user.role)) {
    return <Navigate to="/" />;
  }
  

  return children;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/product"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/product/:productId"
          element={
            <ProtectedRoute>
              <ProductDescription />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
