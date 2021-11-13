import React from 'react';
import { Link } from 'react-router-dom';
import { useBankContext } from '../BankContext/BankAppContext';

const Login = () => {
  const {
    handleChangeLogin,
    handleLogin,
    email,
    password,
    confirmFields,
    buttonLoader,
    type,
    msg,
  } = useBankContext();

  return (
    <div className='min-h-screen animate-slideOut flex flex-col items-center justify-center'>
      <div className='w-10/12 sm:w-8/12 md:w-6/12 lg:w-4/12 flex flex-col max-w-xl  gap-1 transform hover:scale-105 transition ease-in-out duration-500'>
        <form
          className='py-6 px-8 cap  bg-contain rounded-xl shadow-lg flex flex-col gap-2 items-center glass '
          onSubmit={handleLogin}
        >
          <p className='text-xl'> Login</p>

          {type ? (
            <p className='text-red-800 animate-slideIn p-2 '>{msg}</p>
          ) : null}

          <input
            type='email'
            placeholder='john@example.com'
            name='email'
            className='my-2 block w-full py-2 px-2 focus:outline-none text-black rounded-lg focus:ring-2 border-green-500 focus:ring-green-500 focus:border-transparent text-sm'
            value={email}
            onChange={handleChangeLogin}
          />

          <input
            type='password'
            placeholder='Enter Password'
            name='password'
            className='my-2 block w-full py-2 px-2  focus:outline-none border-green-500 text-black rounded-lg focus:ring-2 focus:ring-green-500 text-sm focus:border-transparent'
            value={password}
            onChange={handleChangeLogin}
          />

          <button
            className={` ${
              confirmFields ? 'bg-green-200' : ' bg-green-700 '
            } text-white cap text-sm w-4/12 md:text-base rounded-lg  py-2 px-7 text-white transition ease-linear duration-1000`}
            disabled={confirmFields}
          >
            {buttonLoader ? 'Loading...' : 'Login'}
          </button>
          {/* <Link className='text-sm' to='/resetPassword'>
            Forgot Password{' '}
          </Link> */}

          <p className=' text-sm'>
            Need An Account {''}{' '}
            <Link className='text-blue-600 text-sm' to='/create'>
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
