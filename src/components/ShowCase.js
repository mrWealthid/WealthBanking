import React from 'react';
import Page from './page.png';
import Wallet from './wallet.png';

import Pop from './pops.png';

const ShowCase = () => {
  return (
    <div className=' min-h-screen gap-16 md:gap-28 flex flex-col my-20 lg:my-28  w-11/12 mx-auto justify-center items-center'>
      <section className='flex md:flex-row flex-col-reverse justify-between gap-10 items-center'>
        <div className='lg:max-w-lg max-w-md'>
          <p>Make Seamless Transfers</p>

          <p>
            {' '}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>

        <div className='w-full'>
          <img className='max-w-md' src={Page} alt='home' />
        </div>
      </section>
      <section className='flex md:flex-row flex-col gap-10 justify-between items-center'>
        <div className='w-full '>
          <img className='lg:max-w-lg max-w-md' src={Wallet} alt='home' />
        </div>

        <div className='max-w-md'>
          <p>Customized Wallet </p>

          <p>
            {' '}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
      </section>

      <section className='flex md:flex-row flex-col-reverse justify-between gap-10 items-center'>
        <div className='md:max-w-lg max-w-md'>
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
          <img className='max-w-md' src={Pop} alt='home' />
        </div>
      </section>
    </div>
  );
};

export default ShowCase;
