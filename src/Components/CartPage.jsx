import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../Store/cartSlice';
import { useNavigate } from 'react-router-dom';
import { IoMdArrowBack } from "@react-icons/all-files/io/IoMdArrowBack"; 
import { MdOutlineCancel } from "react-icons/md";
import { toast } from 'react-toastify'; 

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector(state => state.cart);
  

  const isAuthenticated = !!localStorage.getItem('user') || 
                         !!localStorage.getItem('token') || 
                         !!useSelector(state => state.auth?.isAuthenticated);

  const handleBack = () => navigate(-1);

  const subtotal = items.reduce((acc, item) => {
    return acc + (item.price || 0) * (item.quantity || 0);
  }, 0);
  
  const deliveryFee = 500;
  const total = subtotal + deliveryFee;

  
  const handleCheckout = () => {
    if (items.length === 0) return;
    
    if (!isAuthenticated) {
      toast.info('Please login to checkout', { 
        toastId: 'checkout-auth',
        autoClose: 2000 
      });
      setTimeout(() => {
        navigate('/auth');
      }, 500);
      return;
    }
    
    
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className='mainn'>
          <IoMdArrowBack onClick={handleBack} />
          <h2>Your Cart</h2>
        </div>
        <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
          <h3>Your cart is empty</h3>
          <p>Add some delicious dishes</p>
          <button 
            onClick={() => navigate('/category')} 
            style={{ 
              background: '#ff6600', 
              color: 'white', 
              padding: '12px 24px', 
              border: 'none', 
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className='mainn'>
        <IoMdArrowBack onClick={handleBack} />
        <h2>Your Cart</h2>
      </div>
      
      <div className="cart-items">
        {items.map(item => (
          <div key={item.id} className="cart-item">
            <img 
              src={item.image || 'https://via.placeholder.com/60x60/FFE4E1/8B4513?text=No+Image'} 
              alt={item.name || 'Product'}
              width={60}
              style={{ borderRadius: '8px' }}
            />
            <div className="item-details">
              <h3>{item.name || 'Unknown Product'}</h3>
              <p>₦{Number(item.price || 0).toLocaleString()}</p>
              <div className="quantity-control">
                <button 
                  onClick={() => dispatch(updateQuantity({ 
                    id: item.id, 
                    quantity: Math.max(1, (item.quantity || 1) - 1) 
                  }))}
                >
                  -
                </button>
                <span>{item.quantity || 1}</span>
                <div className='plu'>
                  <button 
                    onClick={() => dispatch(updateQuantity({ 
                      id: item.id, 
                      quantity: (item.quantity || 1) + 1 
                    }))}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <button 
              className="remove-btn"
              onClick={() => dispatch(removeFromCart(item.id))}
            >
              <MdOutlineCancel />
            </button>
          </div>
        ))}
      </div>

      <div className="order-summary">
        <div className="summary-row">
          <span>Subtotal:</span>
          <span>₦{subtotal.toLocaleString()}</span>
        </div>
        <div className="summary-row">
          <span>Delivery Fee:</span>
          <span>₦{deliveryFee.toLocaleString()}</span>
        </div>
        <div className="summary-total">
          <span>Total:</span>
          <span>₦{total.toLocaleString()}</span>
        </div>
        <button 
          className="checkout-btn"
          onClick={handleCheckout} 
          disabled={items.length === 0}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
