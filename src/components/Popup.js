import React from 'react';
import { useBankContext } from '../BankContext/BankAppContext';
import { NavLink } from 'react-router-dom';

const Popup = () => {
  const { authenticated, handleLogout } = useBankContext();
  return (
    <div className='bg-white cap bg-blend-darken bg-contain shadow-lg flex flex-col gap-1 text-gray-700 rounded-b-lg group'>
      <NavLink className='p-2 hover:bg-gray-200 focus:text-yellow-300' to='/'>
        Home
      </NavLink>
      {!authenticated ? (
        <NavLink
          className=' p-2 hover:bg-gray-200 focus:text-yellow-300'
          to='/create'
        >
          Create Account
        </NavLink>
      ) : (
        <NavLink className='p-2 hover:focus:text-yellow-300' to='/profile'>
          Profile
        </NavLink>
      )}
      {authenticated ? (
        <p
          className='p-2 hover:bg-gray-200
            focus:text-yellow-300'
          onClick={handleLogout}
        >
          Logout
        </p>
      ) : (
        <NavLink
          className=' p-2 hover:bg-gray-200 
            focus:text-yellow-300 trans'
          to='/login'
        >
          {' '}
          Login
        </NavLink>
      )}
    </div>
  );
};

export default Popup;
