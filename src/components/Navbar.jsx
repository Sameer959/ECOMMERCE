import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = () => {
  return (
    <div className='navbar-container'>
      <ul className='navbar-list'>
        <li className='navbar-item'>
          <NavLink
            to='/Home'
            className='navbar-link'
            activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li className='navbar-item'>
          <NavLink
            to='/collection'
            className='navbar-link'
            activeClassName='active'>
            Collection
          </NavLink>
        </li>
        <li className='navbar-item'>
          <NavLink
            to='/about'
            className='navbar-link'
            activeClassName='active'>
            About
          </NavLink>
        </li>
        <li className='navbar-item'>
          <NavLink
            to='/contact'
            className='navbar-link'
            activeClassName='active'>
            Contact
          </NavLink>
        </li>
      </ul>
      
    </div>
  );
};


export default Navbar;
