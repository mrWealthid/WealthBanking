import React from 'react';
import { useBankContext } from '../BankContext/BankAppContext';
import { NavLink } from 'react-router-dom';
import {
  FaHome,
  FaSignOutAlt,
  FaUsersCog,
  FaUserCircle,
  FaRegUserCircle,
} from 'react-icons/fa';

const Popup = () => {
  const { authenticated, handleLogout } = useBankContext();
  return (
    <div className='bg-white cap bg-blend-darken bg-contain shadow-lg flex flex-col gap-1 color-gray-800 rounded-b-lg group'>
      <div className='flex items-center justify-between py-1 px-2'>
        {' '}
        <NavLink className='p-2 hover:bg-gray-200 focus:text-green-500' to='/'>
          Home
        </NavLink>
        <FaHome />
      </div>

      {!authenticated ? (
        <div className='flex items-center justify-between py-1 px-2'>
          <NavLink
            className=' p-2 hover:bg-gray-200 focus:text-green-500'
            to='/create'
          >
            Create Account
          </NavLink>
          <FaRegUserCircle />
        </div>
      ) : (
        <div className='flex items-center justify-between py-1 px-2'>
          <NavLink
            className='p-2 hover:bg-gray-200 focus:text-green-500'
            to='/profile'
          >
            Profile
          </NavLink>
          <FaUserCircle />
        </div>
      )}
      {authenticated ? (
        <div className='flex items-center justify-between py-1 px-2'>
          <p
            className='p-2 hover:bg-gray-200
            focus:text-green-500'
            onClick={handleLogout}
          >
            Logout
          </p>
          <FaSignOutAlt />
        </div>
      ) : (
        <div className='flex items-center justify-between py-1 px-2'>
          <NavLink
            className=' p-2 hover:bg-gray-200 
            focus:text-green-500'
            to='/login'
          >
            {' '}
            Login
          </NavLink>
          <FaSignOutAlt />
        </div>
      )}

      <div className='flex items-center justify-between py-1 px-2'>
        <NavLink
          className=' p-2 hover:bg-gray-200 
            focus:text-green-500'
          to='/'
        >
          Account Settings
        </NavLink>
        <FaUsersCog />
      </div>
    </div>
  );
};

export default Popup;
