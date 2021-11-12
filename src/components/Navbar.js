import React from 'react';
import { Fa500Px } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import Popup from './Popup';
import { useBankContext } from '../BankContext/BankAppContext';

const Navbar = () => {
  const { handleModal, authenticated, isOpen, handleLogout } = useBankContext();

  const styles = {
    color: 'seagreen',
    border: '1px solid seagreen',
    borderRadius: '20px',
    padding: '4px 10px',
  };
  return (
    <div className='bg-white  relative greentxt py-6'>
      <div className='w-11/12 text-sm mx-auto flex-wrap flex justify-between items-center'>
        <div>
          <div className='text-lg flex items-center gap-2'>
            <span>
              <Fa500Px
                color='seagreen'
                className='w-6 h-6 md:w-10 p-2 shadow-xl
              animate-bounce md:h-10 object-fit bg-white border border-green-700 rounded-full'
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
          {!authenticated ? (
            <NavLink
              activeStyle={styles}
              className='hidden md:block '
              to='/create'
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
          {authenticated ? (
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
