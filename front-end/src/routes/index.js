import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import NotFound from '../pages/NotFound';
import Login from '../pages/Login';
import Products from '../pages/Products';
import Register from '../pages/Register';
import Checkout from '../pages/Checkout';
import Payment from '../pages/Payment';
import OrderDetails from '../pages/OrderDetails';
import Orders from '../pages/Orders';
import Management from '../pages/Management';

export default function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={ <Navigate to="/login" /> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="/logout" element={ <Login /> } />
      <Route path="/admin/manage" element={ <Management /> } />
      <Route path="/customer/products" element={ <Products /> } />
      <Route path="/customer/checkout" element={ <Checkout /> } />
      <Route path="/:role/orders/:id" element={ <OrderDetails /> } />
      <Route path="/:role/orders" element={ <Orders /> } />
      <Route path="/customer/payment" element={ <Payment /> } />
      <Route path="/register" element={ <Register /> } />
      <Route path="*" element={ <NotFound /> } />
    </Routes>
  );
}
