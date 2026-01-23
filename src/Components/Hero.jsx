import React from 'react'
import Food from '../assets/k75bsZMwYNu2L3iBMXq5y7xeiy1isFJsZxnMZSXuXEsxe4ee1cUkGyPPubvYstjFY3DsZrAnF6GJHxXcKdxKFE4KLmPBeL5UpBRVj6LEFTcvRKQeC9C9seYaBXDoJ1rHt4m7SDX9vvSo5pq67qbP2NQvNmAvkqeRt.jpg'
import Drink from '../assets/drink.webp'
import Pastry from '../assets/pastry.jpg'
import { useNavigate } from 'react-router-dom'


const Hero = () => {
    const navigate = useNavigate()

    const handleClick =()=>{
        navigate('/category')
    }
  return (
    <div className='Hero'>
        <div className='hero'>
            <h1>Intercontinental Dishes Made Simple</h1>
            <p>Order from Culina and enjoy dishes from every corner of the world</p>
            <button onClick={handleClick}>Veiw Menu</button>
        </div>
        <h3>Browse by Category</h3>
        <div className='all'>
            <div className='ffoo' onClick={handleClick}>
                <img src={Food} alt='Foods' loading='lazy'/>
                <h3>Foods</h3>
            </div>
            <div onClick={handleClick}>
                <img src={Drink} alt='Drink' loading='lazy'/>
                <h3>Drinks</h3>
            </div>
            <div onClick={handleClick}>
                <img src={Pastry} alt='Pastry' loading='lazy'/>
                <h3>Pastry</h3>
            </div>
        </div>
    </div>
  )
}

export default Hero
