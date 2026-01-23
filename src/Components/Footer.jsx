import React from 'react'
import { NavLink } from 'react-router-dom'
import { RiHome2Line } from "react-icons/ri";
import { GrCatalogOption } from "react-icons/gr";
import { FaRegHeart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

const Footer = () => {
  return (
    <div className='Footer'>
      <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
        <RiHome2Line />
        <span>Home</span>
      </NavLink>

      <NavLink to="/category" className={({ isActive }) => isActive ? 'active' : ''}>
        <GrCatalogOption />
        <span>Category</span>
      </NavLink>

      <NavLink to="/favorites" className={({ isActive }) => isActive ? 'active' : ''}>
        <FaRegHeart />
        <span>Favorites</span>
      </NavLink>

      <NavLink to="/login" className={({ isActive }) => isActive ? 'active' : ''}>
        <CgProfile />
        <span>Profile</span>
      </NavLink>
    </div>
  )
}

export default Footer;
