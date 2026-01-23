import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import db from '../db';  // 

const Featured = () => {
  const [dishes, setDishes] = useState([]);
  const [page, setPage] = useState(0);
  const dishesPerPage = 3;
  const navigate = useNavigate();

  useEffect(() => {
    
    db.listDocuments("products").then(result => {
      const allProducts = result || [];
      setDishes(allProducts.slice(0, 9)); 
    }).catch(err => {
      console.error("Failed to load featured dishes:", err);
    });
  }, []);

  const handleNext = () => {
    if ((page + 1) * dishesPerPage < dishes.length) {
      setPage(page + 1);
    }
  };

  const handlePrev = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const start = page * dishesPerPage;
  const end = start + dishesPerPage;
  const visibleDishes = dishes.slice(start, end);

  return (
    <section className="Featured">
      <div className="container">
        <h2>Featured Dishes</h2>
        <p>Our top picks just for you</p>

        <div className="dishes">
          {visibleDishes.map(dish => (
            <Link
              key={dish.id}
              to={`/productdetails/${dish.id}`}
              className="card"
            >
              <img 
                src={dish.data.Image || 'https://via.placeholder.com/300x200/FFE4E1/8B4513?text=No+Image'} 
                alt={dish.data.Name}
                loading="lazy"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x200/FFE4E1/8B4513?text=No+Image';
                }}
              />
              <div className="info">
                <h3>{dish.data.Name}</h3>
                <p>{dish.data.Description}</p>
                <span className="price">₦{Number(dish.data.Price)?.toLocaleString()}</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="pagination-btns">
          <button onClick={handlePrev} disabled={page === 0}>‹</button>
          <button onClick={handleNext} disabled={end >= dishes.length}>›</button>
        </div>

        <div className="more">
          <button onClick={() => navigate("/category")}>See More</button>
        </div>
      </div>
    </section>
  );
};

export default Featured;
