import React from 'react';
import { FaWifi } from 'react-icons/fa';


import Navbar from './Navbar';
import { useBankContext } from '../BankContext/BankAppContext';
import { Link } from 'react-router-dom';
const Home = () => {


  // const [intersects, setIntersects] = useState(false);

  const { userDetails, headerRef } = useBankContext();

  return (
    <div
      className='home min-h-screen  flex flex-col justify-center  items-center '
      ref={headerRef}
    >
      <p className=''></p>
      <Navbar background={'glass21'} />
      <div className='md:flex-1 my-12 p-2 md:my-0 min-h-screen md:min-h-full flex flex-col justify-center  items-center'>
        <section className='flex flex-col gap-10 md:gap-1 md:flex-row justify-between mt-10 md:mt-0 items-center w-11/12 '>
          <div className='flex flex-col text  md:w-1/2  flex-1 gap-6 glassTxt'>
            <p className='text-4xl lg:text-4xl  '>
              The Easiest Way <br></br> To Manage Personal <br></br> Finances
            </p>

            <p className='text-sm leading-normal lg:max-w-full  '>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris.

            </p>

            <Link to='/login'>
              <button className='w-1/3 cap bg-contain glass21 px-2 py-4 rounded-full'>
                Explore
              </button>
            </Link>
          </div>

          <section className='flex w-full  md:w-1/2 gap-8 glassTxt justify-end'>
            <div className='w-1/2 hidden lg:flex '>
              <section className='w-60 flex flex-col h-96  box-border rounded-lg cap  border border-green-300 glass2 text-yellow-200'>
                <div className='flex flex-1 justify-between p-3'>
                  <p>WealthPay</p>
                  <FaWifi className='transform  rotate-45 block' />
                </div>

                <div className=' p-3 flex flex-col mb-5'>
                  <div className='flex gap-4 items-center'>
                    <div className='flex text-sm gap-1'>
                      <p>5123</p>
                      <p>5123</p>
                      <p>5123</p>
                      <p>5123</p>
                    </div>
                    {/* <p>Wealth Iduwe</p> */}
                    <div className='flex'>
                      <p className='bg-yellow-500 z-10  opacity-80  rounded-full w-8 h-8'></p>
                      <p className='bg-red-800 -ml-4 rounded-full w-8 h-8'></p>
                    </div>
                  </div>
                  <p>{userDetails?.name || 'Wealth Iduwe'}</p>
                </div>
              </section>
            </div>

            {/*<section className='w-full lg:w-1/2 justify-center mx-auto text-yellow-200 lg:w-full border cap border-green-400 glass2 text-white p-2 px-4 rounded-lg flex gap-3 flex-col  lg:max-w-full'>*/}
            {/*  <div className=' flex gap-2'>*/}
            {/*    <p*/}
            {/*      onClick={() => setType(1)}*/}
            {/*      className={`${*/}
            {/*        type === 1 ? 'border-b-2 border-green-600' : ''*/}
            {/*      } cursor-pointer`}*/}
            {/*    >*/}
            {/*      Currency*/}
            {/*    </p>*/}
            {/*    <p*/}
            {/*      onClick={() => setType(2)}*/}
            {/*      className={`${*/}
            {/*        type === 2 ? 'border-b-2 border-gray-600' : ''*/}
            {/*      } cursor-pointer`}*/}
            {/*    >*/}
            {/*      Crypto*/}
            {/*    </p>*/}
            {/*  </div>*/}

            {/*  <p>{type === 1 ? 'Currency Converter' : 'Crypto Converter'}</p>*/}

            {/*  <form className=' flex flex-col py-2 px-4  gap-4 '>*/}
            {/*    {type === 1 ? (*/}
            {/*      <>*/}
            {/*        {' '}*/}
            {/*        <input*/}
            {/*          type='text'*/}
            {/*          placeholder='Enter Amount '*/}
            {/*          className='py-2 px-2 text-sm lg-text-base greentxt animate-slideIn w-full border border-green-600 focus:outline-none focus:ring-green-500 focus:border-green-500 rounded-lg'*/}
            {/*        />*/}
            {/*        <select*/}
            {/*          className='py-2 px-2 text-sm lg-text-base greentxt animate-slideIn w-full border border-green-600 focus:outline-none focus:ring-green-500 focus:border-green-500 rounded-lg'*/}
            {/*          // value={selected.type}*/}
            {/*          // onChange={selectChange}*/}
            {/*        >*/}
            {/*          <option>Currency</option>*/}
            {/*          {currency.map((curr, index) => (*/}
            {/*            <option value={curr.code} key={index}>*/}
            {/*              {curr.code}*/}
            {/*            </option>*/}
            {/*          ))}*/}
            {/*        </select>*/}
            {/*        <select*/}
            {/*          className='py-2 px-2 text-sm lg-text-base greentxt w-full  animate-slideIn border border-green-600 focus:outline-none focus:ring-green-500 focus:border-green-500 rounded-lg'*/}
            {/*          // value={selected.type}*/}
            {/*          // onChange={selectChange}*/}
            {/*        >*/}
            {/*          <option>Currency</option>*/}
            {/*          {currency.map((curr, index) => (*/}
            {/*            <option value={curr.code} key={index}>*/}
            {/*              {curr.code}*/}
            {/*            </option>*/}
            {/*          ))}*/}
            {/*        </select>*/}
            {/*      </>*/}
            {/*    ) : (*/}
            {/*      <>*/}
            {/*        {' '}*/}
            {/*        <select*/}
            {/*          className='py-2 px-2 text-sm lg-text-base greentxt w-full  animate-slideOut border border-green-600 focus:outline-none focus:ring-green-500 focus:border-green-500 rounded-lg'*/}
            {/*          // value={selected.type}*/}
            {/*          // onChange={selectChange}*/}
            {/*        >*/}
            {/*          <option>Crypto Currency</option>*/}
            {/*          {cryptoCurrency.map((curr, index) => (*/}
            {/*            <option value={curr.code} key={index}>*/}
            {/*              {curr.code}*/}
            {/*            </option>*/}
            {/*          ))}*/}
            {/*        </select>*/}
            {/*        <select*/}
            {/*          className='py-2 px-2 text-sm lg-text-base greentxt w-full border animate-slideOut border-green-600 focus:outline-none focus:ring-green-500 focus:border-green-500 rounded-lg'*/}
            {/*          // value={selected.type}*/}
            {/*          // onChange={selectChange}*/}
            {/*        >*/}
            {/*          <option>Crypto Currency</option>*/}
            {/*          {cryptoCurrency.map((curr, index) => (*/}
            {/*            <option value={curr.code} key={index}>*/}
            {/*              {curr.code}*/}
            {/*            </option>*/}
            {/*          ))}*/}
            {/*        </select>*/}
            {/*      </>*/}
            {/*    )}*/}
            {/*    <p>Currency Rate</p>*/}
            {/*    <div className='text-center'>*/}
            {/*      <button*/}
            {/*        className={*/}
            {/*          'bg-green-700 text-white cap text-xs w-full  md:w-6/12 md:text-base rounded-lg text-center py-2 text-white transition ease-linear duration-1000'*/}
            {/*        }*/}
            {/*      >*/}
            {/*        Convert*/}
            {/*      </button>*/}
            {/*    </div>*/}
            {/*  </form>*/}
            {/*</section>*/}
          </section>
        </section>
      </div>
    </div>
  );
};

export default Home;
