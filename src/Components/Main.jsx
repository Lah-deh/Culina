import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import db from '../db';
import { IoMdArrowBack } from "@react-icons/all-files/io/IoMdArrowBack"; 
import { FiHeart } from "react-icons/fi";

const Main = () => {
  const navigate = useNavigate();
  const handleBack = () => navigate(-1);

  const [dishes, setDishes] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null); 

  const dishesPerPage = 6;

  useEffect(() => {
    db.listDocuments("products").then(result => {
      setDishes(result || []);
      setLoading(false);
    }).catch(err => {
      console.error("Error:", err);
      setLoading(false);
    });
  }, []);


  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2000);
  };

  const toggleFavorite = (dishId) => {
    setFavorites(prev => {
      const isFavorited = prev.includes(dishId);
      if (isFavorited) {
        showToast('Removed from favorites ', 'info');
        return prev.filter(id => id !== dishId);
      } else {
        showToast('Added to favorites ', 'success');
        return [...prev, dishId];
      }
    });
  };

  const filteredDishes = dishes
    .filter((dish) => 
      category === "all" ? true : dish.data?.Category?.toLowerCase() === category.toLowerCase()
    )
    .filter((dish) => 
      dish.data?.Name?.toLowerCase().includes(search.toLowerCase())
    );

  const totalPages = Math.ceil(filteredDishes.length / dishesPerPage);
  const indexOfLastDish = currentPage * dishesPerPage;
  const indexOfFirstDish = indexOfLastDish - dishesPerPage;
  const currentDishes = filteredDishes.slice(indexOfFirstDish, indexOfLastDish);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  if (loading) return <div className="Main"><p>Loading products...</p></div>;

  return (
    <div className="Main">
      
      {toast && (
        <div className={`custom-toast ${toast.type}`}>
          {toast.message}
        </div>
      )}

      <div className="main-header">
        <div className="mainn">
          <IoMdArrowBack onClick={handleBack} />
          <h2>Main Dishes</h2>
        </div>
        <div className="filters">
          <input
            type="text"
            placeholder="Search dishes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select value={category} onChange={(e) => {
            setCategory(e.target.value);
            setCurrentPage(1);
          }}>
            <option value="all">All</option>
            <option value="pastry">Pastry</option>
            <option value="food">Food</option>
            <option value="drink">Drinks</option>
          </select>
        </div>
      </div>

      <div className="dishes-grid">
        {currentDishes.length > 0 ? (
          currentDishes.map((dish) => (
            <div key={dish.id} className="card">
              <div 
                className="card-content"
                onClick={() => navigate(`/productdetails/${dish.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <img src={dish.data.Image} alt={dish.data.Name} loading="lazy" />
                <div className="info">
                  <h3>{dish.data.Name}</h3>
                  <p>{dish.data.Description}</p>
                  <span className="price">₦{Number(dish.data.Price)?.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="card-actions">
                <button 
                  className={`fav-btn ${favorites.includes(dish.id) ? 'favorited' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(dish.id);
                  }}
                  title={favorites.includes(dish.id) ? 'Remove from favorites' : 'Add to favorites'}
                >
                  {favorites.includes(dish.id) ? 
                    <FiHeart size={20} fill="currentColor" stroke="none" />
                    : 
                    <FiHeart size={20} />  
                  }
                </button>
              </div>

            </div>
          ))
        ) : (
          <p>No dishes found matching your filter.</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
            &lt;
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button 
              key={i} 
              className={currentPage === i + 1 ? "active" : ""} 
              onClick={() => goToPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default Main;
