import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { HiMenu, HiChevronDoubleRight, HiChevronDown } from 'react-icons/hi'
import '../index.css'
import logo from '../media/logoblue.png'
import { useAuth } from '../authContext';

const Navbar = ({ toggleMenu, isMenuOpen, setIsMenuOpen }) => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); 
  };

  return (
    <nav className={`navbar main-content ${isMenuOpen ? 'pushed' : ''}`}>
      <div className="navbar-logo">
        <NavLink className='a' to="/">
          {' '}
          <img src={logo} alt="Logo" className="logo-image" />
        </NavLink>
      </div>
      <ul
        className={`navbar-Navlinks navbar-menu ${isMenuOpen ? 'active' : ''} ul`}
      >
        <div className="navbar-toggle  menu-arrow" onClick={toggleMenu}>
          <div className={`toggle-icon ${isMenuOpen ? 'active' : ''}`}>
            {' '}
            <HiChevronDoubleRight />
          </div>
        </div>

        <li className='li' onClick={() => toggleMenu()}>
          <NavLink className='a' to="/">Home</NavLink>
        </li>
        <li className='li' onClick={() => toggleMenu()}>
          <NavLink className='a' to="/mymeds">Reminders</NavLink>
        </li>
        <li className='li' onClick={() => toggleMenu()}>
          <NavLink className='a' to="/about">About</NavLink>
        </li>
        <li className='li' onClick={() => toggleMenu()}>
          <NavLink  className="a" to="/contact">
         Contact
          </NavLink>
        </li>
        {isLoggedIn ? (
          <button className="nav-btn" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <NavLink className="nov" to="/signin">
            <button onClick={() => toggleMenu()}  className="nav-btn">Login</button>
          </NavLink>
        )}
      </ul>
      <div className="navbar-toggle bars" onClick={() => toggleMenu()}>
        <div className={`toggle-icon `}>
          {' '}
          <HiMenu />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
