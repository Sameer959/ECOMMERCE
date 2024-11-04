
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './pages/Home';
import Collection from './pages/Collection';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import Logout from './pages/Logout';
import Cart from './pages/Cart';
import Products from './pages/Products';
import ProductList from './components/ProductList';
import { CartProvider } from './config/CartContext'; 

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <CartProvider>
      {/* <ProductList/> */}
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? <Navigate to="/home" replace /> : <Login />
            }
          />
          <Route path="/Home" element={isAuthenticated ? <Home /> : <Navigate to="/" replace />} />
          <Route path="/Collection" element={isAuthenticated ? <Collection /> : <Navigate to="/" replace />} />
          <Route path="/about" element={<PrivateRoute><About /></PrivateRoute>} />
          <Route path="/ProductList" element={<PrivateRoute><ProductList /></PrivateRoute>} />
          <Route path="/contact" element={<PrivateRoute><Contact /></PrivateRoute>} />
          <Route path="/Logout" element={<PrivateRoute><Logout /></PrivateRoute>} />
          <Route path="/Cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
          <Route path="/Products" element={<PrivateRoute><Products /></PrivateRoute>} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
