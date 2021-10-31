import React from 'react';
import { FaShopify } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='bg-gray-700 text-white py-6'>
      <div className='w-10/12 mx-auto flex justify-between items-center'>
        <div>
          <a href='https://www.shopify.com/'>
            {' '}
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
        <div className='flex gap-6'>
          <NavLink className='hover:underline focus:text-yellow-300' to='/'>
            {' '}
            Home
          </NavLink>
          <NavLink
            className='hover:underline focus:text-yellow-300'
            to='/create'
          >
            {' '}
            Create Account
          </NavLink>
          <NavLink
            className='hover:underline 
            focus:text-yellow-300'
            to='/login'
          >
            {' '}
            Login
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
