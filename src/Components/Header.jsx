import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../assets/IMG-20251204-WA0007-removebg-preview.png';
import { IoIosNotifications } from "react-icons/io";
import { IoCartOutline } from "@react-icons/all-files/io5/IoCartOutline";

const Header = () => {
  const navigate = useNavigate();
  
  // Redux: Get cart items instead of Context
  const cartItems = useSelector(state => state.cart.items);
  
  const handleClick = () => navigate('/cart');
  const handleNotification = () => navigate('/notifications');

  // Same cart count logic
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className='Header'>
      <div className='head'>
        <img src={logo} alt='logo' loading='lazy'/>
      </div>

      <div className='list'>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/category'>Menu</Link></li>
          <li><Link to='/'>About Us</Link></li>
          <li><Link to='/'>Contact</Link></li>
        </ul>
      </div>

      <div className='ic'>
        <IoIosNotifications className='icon' onClick={handleNotification}/>
        <div className='cart-icon' onClick={handleClick}>
          <IoCartOutline className='icon' />
          {totalItems > 0 && <span className='cart-count'>{totalItems}</span>}
        </div>
      </div>

      <hr/>
    </div>
  );
};

export default Header;
