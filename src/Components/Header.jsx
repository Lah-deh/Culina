import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../assets/IMG-20251204-WA0007-removebg-preview.png';
import { IoCartOutline } from "@react-icons/all-files/io5/IoCartOutline";
import { toast } from 'react-toastify'; 

const Header = () => {
  const navigate = useNavigate();
  const cartItems = useSelector(state => state.cart.items);
  
  
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  
  const handleClick = () => navigate('/cart');
  
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    toast.success('Logged out! ');
    navigate('/');
  };

  
  const authButton = user ? (
    <button className='logout-btn' onClick={handleLogout}>
      Logout
    </button>
  ) : (
    <button className='login-btn' onClick={() => navigate('/login')}>
      Login
    </button>
  );

  return (
    <div className='Header'>
      <div className='head'>
        <img src={logo} alt='logo' loading='lazy'/>
      </div>

      

      <div className='ic'>
        
        <div className='cart-icon' onClick={handleClick}>
          <IoCartOutline className='icon' />
          {totalItems > 0 && <span className='cart-count'>{totalItems}</span>}
        </div>
        
        
        {authButton}
      </div>

      <hr/>
    </div>
  );
};

export default Header;
