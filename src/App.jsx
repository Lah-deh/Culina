import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Category from './Pages/Category'
import ProductDetails from './Pages/ProductDetails'
import Cart from './Pages/Cart'
import Checkout from './Pages/Checkout'
import Order from './Pages/Order'
import NotFound from './Pages/NotFound'
import Login from './Pages/Login'
import Notification from './Pages/Notitfication'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadCartFromStorage } from './Store/cartStorage';
import { loadCart } from './Store/cartSlice';



const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
  
  const savedCart = loadCartFromStorage();
  
  if (savedCart.length > 0) {
    
    dispatch(loadCart(savedCart));
  }
}, [dispatch]); 


  return (
    <div>
      
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/category' element={<Category/>}/>
            <Route path='/productdetails/:id' element={<ProductDetails/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/checkout' element={<Checkout/>}/>
            <Route path='/order' element={<Order/>}/>
            <Route path='*' element={<NotFound/>}/>
            <Route path='/login' element={<Login/>}/>

            <Route path='/notifications' element={<Notification/>}/>
            
          </Routes>
        </BrowserRouter>
        <ToastContainer position="top-right" autoClose={2000} />
      
      
    </div>
  )
}

export default App

