import React, { useState } from 'react';
import { FaWifi } from 'react-icons/fa';

import { currency, cryptoCurrency } from './currencyList';
const Home = () => {
  const [type, setType] = useState(1);
  return (
    <div className='min-h-screen  flex flex-col items-center justify-center'>
      <section className='flex flex-col md:flex-row justify-between items-center w-11/12 '>
        <div className='flex flex-col w-1/2 gap-3'>
          <p className='text-3xl lg:text-4xl'>
            The Easiest Way <br></br> To Manage Personal <br></br> Finances
          </p>

          <p className='text-sm'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>

        <section className='flex w-1/2 gap-8  justify-between'>
          <div className='w-1/2 hidden lg:flex '>
            <section className='w-60 flex flex-col  box-border rounded-lg cap green text-white'>
              <div className='flex flex-1 justify-between p-3'>
                <p>WealthPay</p>
                <FaWifi className='transform  rotate-45 block' />
              </div>

              <div className=' p-3 flex flex-col mb-5'>
                <div className=' flex justify-between items-center'>
                  <div className='flex text-sm gap-1'>
                    <p>5123</p>
                    <p>5123</p>
                    <p>5123</p>
                    <p>5123</p>
                  </div>
                  {/* <p>Wealth Iduwe</p> */}
                  <div className='flex  '>
                    <p className='bg-yellow-500 z-10  opacity-80  rounded-full w-8 h-8'></p>
                    <p className='bg-red-800 -ml-4 rounded-full w-8 h-8'></p>
                  </div>
                </div>
                <p>Wealth Iduwe</p>
              </div>
            </section>
          </div>

          <section className='w-3/4 lg:w-1/2 justify-center mx-auto lg:w-full border glass p-2 px-4 rounded-lg flex gap-3 flex-col'>
            <div className=' flex gap-2'>
              <p
                onClick={() => setType(1)}
                className={`${
                  type === 1 ? 'border-b-2 border-green-600' : ''
                } cursor-pointer`}
              >
                Currency
              </p>
              <p
                onClick={() => setType(2)}
                className={`${
                  type === 2 ? 'border-b-2 border-gray-600' : ''
                } cursor-pointer`}
              >
                Crypto
              </p>
            </div>

            <p>{type === 1 ? 'Currency Converter' : 'Crypto Converter'}</p>

            <form className=' flex flex-col py-4 px-4  gap-4 border'>
              {type === 1 ? (
                <>
                  {' '}
                  <select
                    className='py-2 px-2 text-sm lg-text-base greentxt animate-slideIn w-full border border-green-600 focus:outline-none focus:ring-green-500 focus:border-green-500 rounded-lg'
                    // value={selected.type}
                    // onChange={selectChange}
                  >
                    <option>Currency</option>
                    {currency.map((curr, index) => (
                      <option value={curr.code} key={index}>
                        {curr.code}
                      </option>
                    ))}
                  </select>
                  <select
                    className='py-2 px-2 text-sm lg-text-base greentxt w-full  animate-slideIn border border-green-600 focus:outline-none focus:ring-green-500 focus:border-green-500 rounded-lg'
                    // value={selected.type}
                    // onChange={selectChange}
                  >
                    <option>Currency</option>
                    {currency.map((curr, index) => (
                      <option value={curr.code} key={index}>
                        {curr.code}
                      </option>
                    ))}
                  </select>
                </>
              ) : (
                <>
                  {' '}
                  <select
                    className='py-2 px-2 text-sm lg-text-base greentxt w-full  animate-slideOut border border-green-600 focus:outline-none focus:ring-green-500 focus:border-green-500 rounded-lg'
                    // value={selected.type}
                    // onChange={selectChange}
                  >
                    <option>Crypto Currency</option>
                    {cryptoCurrency.map((curr, index) => (
                      <option value={curr.code} key={index}>
                        {curr.code}
                      </option>
                    ))}
                  </select>
                  <select
                    className='py-2 px-2 text-sm lg-text-base greentxt w-full border animate-slideOut border-green-600 focus:outline-none focus:ring-green-500 focus:border-green-500 rounded-lg'
                    // value={selected.type}
                    // onChange={selectChange}
                  >
                    <option>Crypto Currency</option>
                    {cryptoCurrency.map((curr, index) => (
                      <option value={curr.code} key={index}>
                        {curr.code}
                      </option>
                    ))}
                  </select>
                </>
              )}
              <p>Currency Rate</p>
              <div className='text-center'>
                <button
                  className={
                    'bg-green-700 text-white cap text-xs w-full  md:w-6/12 md:text-base rounded-lg text-center py-2 text-white transition ease-linear duration-1000'
                  }
                >
                  Convert
                </button>
              </div>
            </form>
          </section>
        </section>
      </section>
    </div>
  );
};

export default Home;
