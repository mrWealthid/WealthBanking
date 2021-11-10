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
      <div className='w-10/12 sm:w-8/12 md:w-6/12 lg:w-4/12 flex flex-col max-w-xl gap-2'>
        <form
          className='py-6 px-8 cap bg-contain rounded-xl shadow-lg flex flex-col gap-2 items-center bg-gray-200 '
          onSubmit={handleLogin}
        >
          <p className='text-2xl'> Login</p>

          {type ? (
            <p className='text-red-800 animate-slideIn p-2 '>{msg}</p>
          ) : null}

          <input
            type='email'
            placeholder='john@example.com'
            name='email'
            className='my-2 block w-full p-2 rounded-md outline-none bg-gray-100'
            value={email}
            onChange={handleChangeLogin}
          />

          <input
            type='password'
            placeholder='Enter Password'
            name='password'
            className='my-2 block w-full p-2 rounded-md outline-none bg-gray-100'
            value={password}
            onChange={handleChangeLogin}
          />

          <button
            className={` ${
              confirmFields ? 'bg-gray-400' : ' bg-gray-700 hover:bg-gray-500'
            } text-white cap text-sm w-4/12 md:text-base rounded-lg  py-2 px-7 text-white transition ease-linear duration-1000`}
            disabled={confirmFields}
          >
            {buttonLoader ? 'Loading...' : 'Login'}
          </button>
          <Link className='text-blue-600' to='/resetPassword'>
            Forgot Password{' '}
          </Link>

          <p>
            Need An Account {''}{' '}
            <Link className='text-blue-600' to='/create'>
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
