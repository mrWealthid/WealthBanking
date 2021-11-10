import React from 'react';
import { Link } from 'react-router-dom';
import { useBankContext } from '../BankContext/BankAppContext';

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
    <div className='min-h-screen animate-slideIn flex flex-col items-center justify-center'>
      <div className='w-10/12 sm:w-8/12 md:w-6/12 lg:w-4/12 flex flex-col max-w-xl gap-2'>
        <form
          className='py-6 px-8 flex rounded-lg cap bg-contain shadow-lg flex-col gap-2 items-center bg-gray-200 '
          onSubmit={handleSignup}
        >
          <p className='text-2xl'> Sign Up</p>
          {type ? (
            <p className='text-red-900  animate-slideIn p-2 rounded'>{msg}</p>
          ) : null}
          <div className='flex item-center w-full gap-4'>
            <input
              type='text'
              placeholder='First Name'
              value={register.firstname}
              name='firstname'
              onChange={handleChangeRegister}
              className='my-2 block w-full p-2 rounded-md outline-none bg-gray-100'
            />
            <input
              type='text'
              placeholder='Last Name'
              value={register.lastname}
              name='lastname'
              onChange={handleChangeRegister}
              className='my-2 block w-full p-2 rounded-md outline-none bg-gray-100'
            />
          </div>
          <div className='flex item-center w-full gap-4'>
            <input
              type='text'
              placeholder='email'
              value={register.email}
              name='email'
              onChange={handleChangeRegister}
              className='my-2 block w-full p-2 rounded-md outline-none bg-gray-100'
            />
            <input
              type='password'
              placeholder='password'
              value={register.password}
              name='password'
              onChange={handleChangeRegister}
              className='my-2 block w-full p-2 rounded-md outline-none bg-gray-100'
            />
          </div>
          <button
            className={` ${
              confirmFields ? 'bg-gray-400' : ' bg-gray-700 hover:bg-gray-500'
            }  text-white text-sm w-4/12 md:text-base rounded-lg cap  py-2 px-7 text-white transition ease-linear duration-1000`}
            disabled={confirmFields}
          >
            {buttonLoader ? 'Loading...' : 'Register'}
          </button>
          <p>
            {' '}
            Already Have An Account{' '}
            <Link className='text-blue-700' to='/login'>
              Login
            </Link>{' '}
          </p>{' '}
        </form>
      </div>
    </div>
  );
};

export default Signup;
