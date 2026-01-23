import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../Store/cartSlice';  
import db from '../db'; 
import { IoMdArrowBack } from "@react-icons/all-files/io/IoMdArrowBack"; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [dish, setDish] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    db.listDocuments("products").then(result => {
      const allProducts = result || [];  
      const found = allProducts.find(item => item.id === id);
      setDish(found);
      setLoading(false);
    }).catch(err => {
      console.error("Error:", err);
      setLoading(false);
    });
  }, [id]);

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    const productForCart = {
      id: dish.id,
      name: dish.data.Name,
      price: dish.data.Price,
      image: dish.data.Image,
      quantity: quantity
    };
    
    dispatch(addToCart(productForCart));
    toast.success(`${dish.data.Name} (${quantity}) added to cart!`);
  };

  if (loading) {
    return (
      <div className='product-details'>
        <p style={{ textAlign: 'center', padding: '40px' }}>Loading product...</p>
      </div>
    );
  }

  if (!dish) {
    return (
      <div className='product-details'>
        <p style={{ textAlign: 'center', padding: '40px', color: '#999' }}>Product not found</p>
      </div>
    );
  }

  return (
    <div className='product-details'>
      <ToastContainer position="top-right" autoClose={2000} />
      
      <IoMdArrowBack 
        onClick={() => navigate(-1)} 
        style={{ 
          marginTop: '-3rem',
          cursor: 'pointer', 
          fontSize: '29px', 
          borderRadius: '8px',
          transition: 'background 0.2s'
        }}
        onMouseEnter={(e) => e.target.style.background = '#f0f0f0'}
        onMouseLeave={(e) => e.target.style.background = 'transparent'}
      />

      <div className='left'>
        <img 
          src={dish.data.Image || 'https://via.placeholder.com/400x300/FFE4E1/8B4513?text=No+Image'} 
          alt={dish.data.Name}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x300/FFE4E1/8B4513?text=No+Image';
          }}
        />
      </div>

      <div className='right'>
        <h2>{dish.data.Name}</h2>
        <h3>₦{Number(dish.data.Price)?.toLocaleString()}</h3>
        <p>{dish.data.Description}</p>
        
        

        <div className='quantity'>
          <p>Quantity:</p>
          <div className='quantity-controls'>
            <button onClick={decreaseQuantity}>-</button>
            <span>{quantity}</span>
            <button onClick={increaseQuantity}>+</button>
          </div>
        </div>

        <button className='add-to-cart' onClick={handleAddToCart}>
          Add {quantity} to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
