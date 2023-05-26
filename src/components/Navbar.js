import React from 'react';
import { Fa500Px } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import Popup from './Popup';
import { useBankContext } from '../BankContext/BankAppContext';

const Navbar = ({ background }) => {
  const { authenticated, isOpen, handleLogout, NavRef } = useBankContext();

  const styles = {
    color: 'seagreen',
    border: '1px solid seagreen',
    borderRadius: '20px',
    padding: '4px 10px',
    backgroundColor: 'glass21',
  };

  // const intersection = () => {};

  return (
    <div
      className={`${background} bg-contain  cap  greentxt w-full py-4`}
      ref={NavRef}
    >
      <div className='w-11/12 text-sm mx-auto flex-wrap flex justify-between items-center'>
        <div>
          <div className='text-lg flex items-center gap-2'>
            <span>
              <Fa500Px
                color='seagreen'
                className='w-6 h-6 md:w-10 p-1 lg:p-2 flex-shrink-0 shadow-xl
              animate-bounce md:h-10 object-fit glass21  border border-green-700 rounded-full'
              />
            </span>
            <span> BankApp</span>
          </div>
        </div>
        <div className='flex items-center gap-6'>
          <NavLink
            activeStyle={styles}
            className='hidden md:block '
            exact
            to='/'
          >
            Home
          </NavLink>
          {!authenticated.uid ? (
            <NavLink
              activeStyle={styles}
              className='hidden md:block '
              to='/register'
            >
              Register
            </NavLink>
          ) : (
            <NavLink
              activeStyle={styles}
              className='hidden md:block  '
              to='/profile'
            >
              Profile
            </NavLink>
          )}
          {authenticated.uid ? (
            <p
              className='hidden md:block  
             cursor-pointer'
              onClick={handleLogout}
            >
              Logout
            </p>
          ) : (
            <NavLink
              activeStyle={styles}
              className='hidden md:block '
              to='/login'
            >
              {' '}
              Login
            </NavLink>
          )}

          <div className='nav md:hidden  '>
            <nav className='Pop'>
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
