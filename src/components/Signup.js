import React from 'react';
import { Link } from 'react-router-dom';
import { useBankContext } from '../BankContext/BankAppContext';
import { currency } from './currencyList';
import Navbar from './Navbar';

const Signup = () => {
  const {
    handleSignup,
    handleChangeRegister,
    register,
    confirmFields,
    type,
    msg,
    buttonLoader,
  } = useBankContext();

  return (
    <div className='min-h-screen animate-slideIn Apps flex flex-col '>
      <Navbar background='bg-black opacity-80' />

      <div className='h-screen flex flex-col  justify-center items-center'>
        <div className='w-8/12    md:w-8/12  flex flex-col max-w-xl gap-2  transition ease-in-out duration-500'>
          <form
            className='py-6 px-8 flex rounded-lg cap bg-contain animate-slideOut shadow-2xl flex-col gap-2 lg:gap-2 glass21 '
            onSubmit={handleSignup}
          >
            <p className='text-xl text-center mb-3'> Sign Up</p>
            {type ? (
              <p className='text-red-900  animate-slideIn p-2 rounded'>{msg}</p>
            ) : null}
            <div className='flex flex-col md:flex-row item-center w-full gap-2 md:gap-4'>
              <input
                type='text'
                placeholder='First Name'
                value={register.firstname}
                name='firstname'
                onChange={handleChangeRegister}
                className='my-2 block w-full py-2 px-2 focus:outline-none border-green-500 text-black rounded-lg focus:ring-2 focus:ring-green-500 text-sm focus:border-transparent'
              />
              <input
                type='text'
                placeholder='Last Name'
                value={register.lastname}
                name='lastname'
                onChange={handleChangeRegister}
                className='my-2 block w-full py-2 px-2 focus:outline-none border-green-500 text-black rounded-lg focus:ring-2 focus:ring-green-500 text-sm focus:border-transparent'
              />
            </div>
            <div className='flex flex-col md:flex-row  item-center w-full gap-2 md:gap-4'>
              <input
                type='text'
                placeholder='Email'
                value={register.email}
                name='email'
                onChange={handleChangeRegister}
                className='my-2 block w-full py-2 px-2 focus:outline-none border-green-500 text-black rounded-lg focus:ring-2 focus:ring-green-500 text-sm focus:border-transparent'
              />
              <input
                type='password'
                placeholder='Password'
                value={register.password}
                name='password'
                onChange={handleChangeRegister}
                className='my-2 block w-full py-2 px-2  focus:outline-none border-green-500 text-black rounded-lg focus:ring-2 focus:ring-green-500 text-sm focus:border-transparent'
              />
            </div>
            <div className='flex flex-col md:flex-row w-full gap-2 md:gap-4'>
              <select
                className='py-2 my-2 px-2 text-sm lg-text-base greentxt w-full border border-green-600 focus:outline-none focus:ring-green-500 focus:border-green-500 rounded-lg'
                // value={selected.type}
                // onChange={selectChange}
              >
                <option>Currency</option>
                {currency.map((curr, index) => (
                  <option value={curr.code} key={index}>
                    {curr.name}
                  </option>
                ))}
              </select>

              <select
                className='py-2 px-2 my-2 text-sm lg-text-base w-full greentxt border border-green-600 focus:outline-none focus:ring-green-500 focus:border-green-500 rounded-lg'
                // value={selected.type}
                // onChange={selectChange}
              >
                <option>Gender</option>

                <option value='Male'>Male</option>

                <option value={'Female'}>Female</option>
              </select>
            </div>
            <div className='w-full flex  justify-end'>
              <button
                className={` ${
                  confirmFields ? 'bg-green-200' : ' bg-green-700 '
                }  text-white text-sm w-5/12 md:w-4/12 md:text-base rounded-lg cap   py-2  text-white transition ease-linear duration-1000`}
                disabled={confirmFields}
              >
                {buttonLoader ? 'Loading...' : 'Register'}
              </button>
            </div>
            <p className=' text-sm text-center flex gap-2 justify-center'>
              {' '}
              Already Have An Account
              <Link className='text-blue-700  text-sm' to='/login'>
                Login
              </Link>{' '}
            </p>{' '}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
