import React from 'react';
import Page from './page.png';
import Wallet from './wallet.png';

import Pop from './pops.png';
import { useBankContext } from '../BankContext/BankAppContext';

const ShowCase = () => {
  const { ShowCaseRef } = useBankContext();
  return (
    <div
      className='lg:min-h-screen gap-10 py-14 transition transition-opacity ease-in-out transition-transform duration-1000 hides lg:py-10 flex flex-col w-11/12 mx-auto justify-center items-center'
      ref={ShowCaseRef}
    >
      <section className='flex md:flex-row flex-col-reverse justify-between gap-10 items-center'>
        <div className='lg:max-w-lg sm:max-w-md'>
          <p>Make Seamless Transfers</p>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim

          </p>
        </div>

        <div className='w-full '>
          <img
            className='max-w-md w-1/2 mx-auto md:w-full'
            src={Page}
            alt='home'
          />
        </div>
      </section>

      <section className='flex md:flex-row flex-col-reverse justify-between gap-10 items-center'>
        <div className='lg:max-w-lg sm:max-w-md'>
          <p>Customized Wallet </p>

          <p>
            {' '}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>

        <div className='w-full '>
          <img
            className='max-w-md w-1/2 mx-auto md:w-full'
            src={Wallet}
            alt='home'
          />
        </div>
      </section>

      <section className='flex md:flex-row flex-col-reverse justify-between gap-10 items-center'>
        <div className='lg:max-w-lg sm:max-w-md'>
          <p>Customized Wallet </p>

          <p>
            {' '}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>

        <div className='w-full '>
          <img
            className='max-w-md w-1/2 mx-auto md:w-full'
            src={Pop}
            alt='home'
          />
        </div>
      </section>

      {/* <section className='flex md:flex-row flex-col gap-10 justify-between items-center'>
        <div className='w-full '>
          <img
            className='lg:max-w-lg mx-auto sm:max-w-md w-1/2 md:w-full'
            src={Wallet}
            alt='home'
          />
        </div>

        <div className='sm:max-w-md'>
          <p>Customized Wallet </p>

          <p>
            {' '}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
      </section> */}

      {/* <section className='flex md:flex-row flex-col-reverse justify-between gap-10 items-center'>
        <div className='md:max-w-lg sm:max-w-md'>
          <p>Make Real-Time Transfers</p>

          <p>
            {' '}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>

        <div className='w-full'>
          <img
            className='sm:max-w-md w-1/2 mx-auto md:w-full'
            src={Pop}
            alt='home'
          />
        </div> */}
      {/* </section> */}
    </div>
  );
};

export default ShowCase;
