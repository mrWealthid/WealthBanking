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
      <div className='w-8/12  md:w-8/12  flex flex-col max-w-xl gap-2  transition ease-in-out duration-500'>
        <form
          className='py-6 px-8 flex rounded-lg cap bg-contain shadow-lg flex-col gap-1 items-center glass '
          onSubmit={handleSignup}
        >
          <p className='text-xl'> Sign Up</p>
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
              placeholder='email'
              value={register.email}
              name='email'
              onChange={handleChangeRegister}
              className='my-2 block w-full py-2 px-2 focus:outline-none border-green-500 text-black rounded-lg focus:ring-2 focus:ring-green-500 text-sm focus:border-transparent'
            />
            <input
              type='password'
              placeholder='password'
              value={register.password}
              name='password'
              onChange={handleChangeRegister}
              className='my-2 block w-full py-2 px-2  focus:outline-none border-green-500 text-black rounded-lg focus:ring-2 focus:ring-green-500 text-sm focus:border-transparent'
            />
          </div>
          <button
            className={` ${
              confirmFields ? 'bg-green-200' : ' bg-green-700 '
            }  text-white text-sm w-5/12  md:w-4/12 md:text-base rounded-lg cap  py-2  text-white transition ease-linear duration-1000`}
            disabled={confirmFields}
          >
            {buttonLoader ? 'Loading...' : 'Register'}
          </button>
          <p className=' text-sm'>
            {' '}
            Already Have An Account{' '}
            <Link className='text-blue-700 text-sm' to='/login'>
              Login
            </Link>{' '}
          </p>{' '}
        </form>
      </div>
    </div>
  );
};

export default Signup;
