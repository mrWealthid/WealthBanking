import React from 'react';
import { FaShopify } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import Popup from './Popup';
import { useBankContext } from '../BankContext/BankAppContext';

const Navbar = () => {
  const { handleModal, users, isOpen, handleLogout } = useBankContext();
  return (
    <div className='bg-gray-700 bg-opacity-50 relative text-white py-6'>
      <div className='w-11/12 mx-auto flex justify-between items-center'>
        <div>
          <a href='https://www.shopify.com/'>
            <div className='text-lg flex items-center gap-2'>
              <span>
                <FaShopify
                  color='#bae26a'
                  className='w-6 h-6 md:w-8 p-1 shadow-xl animate-bounce md:h-8 object-fit bg-white rounded-full'
                />
              </span>
              <span> BankApp</span>
            </div>
          </a>
        </div>
        <div className='flex items-center gap-6'>
          <NavLink className='hover:underline focus:text-yellow-300' to='/'>
            {' '}
            Home
          </NavLink>
          {!users ? (
            <NavLink
              className='hover:underline focus:text-yellow-300'
              to='/create'
            >
              Create Account
            </NavLink>
          ) : (
            <NavLink
              className='hover:underline focus:text-yellow-300'
              to='/profile'
            >
              Profile
            </NavLink>
          )}
          {users ? (
            <p
              className='hover:underline 
            focus:text-yellow-300'
              onClick={handleLogout}
            >
              Logout
            </p>
          ) : (
            <NavLink
              className='hover:underline 
            focus:text-yellow-300 trans'
              to='/login'
            >
              {' '}
              Login
            </NavLink>
          )}

          <div className='nav'>
            <nav className='Pop' onClick={handleModal}>
              <div className={`${isOpen && 'open'}     menu-btn`}>
                <div className='menu-btn__burger'></div>
              </div>
            </nav>

            {isOpen ? (
              <div className={`${isOpen ? 'animate-slideIn' : ''} popup`}>
                <Popup />
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
