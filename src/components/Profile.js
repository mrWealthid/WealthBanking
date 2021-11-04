import React, { useRef, useState, useEffect } from 'react';
import { useBankContext } from '../BankContext/BankAppContext';
import {
  FaClock,
  FaArrowCircleUp,
  FaArrowDown,
  FaArrowUp,
} from 'react-icons/fa';
import Transactions from './Transactions';
import Loader from './Loader';

const Profile = () => {
  const {
    userDetails,
    total,

    handleTransfers,
    transferAmount,
    transferNum,
    deposit,
    withdrawal,
    loanRef,
    closeUser,
    closeUserPin,
    handleLoans,
    handleCloseAccount,
  } = useBankContext();

  const [counter, setCounter] = useState(0);

  const [totalDepCount, setTotalDepCount] = useState(0);

  const [totalCount, setTotalCount] = useState(0);

  const [totalWithdrawalCount, setTotalWithdrawalCount] = useState(0);

  const [transfer, setTransfer] = useState(false);
  const [loan, setLoan] = useState(false);
  const [closeAcc, setCloseAcc] = useState(false);

  const value = 1000;

  useEffect(() => {
    const timer = setInterval(() => {
      counter < value && setCounter(counter + 1);
    }, 500);

    return () => clearInterval(timer);
  }, [counter, value]);

  useEffect(() => {
    const timer = setInterval(() => {
      totalCount < total
        ? setTotalCount(total > 1000 ? totalCount + 100 : totalCount + 10)
        : setTotalCount(total);
    }, 100);

    return () => clearInterval(timer);
  }, [totalCount, total]);

  useEffect(() => {
    const timer = setInterval(() => {
      totalDepCount < deposit &&
        setTotalDepCount(
          deposit > 1000 ? totalDepCount + 100 : totalDepCount + 10
        );
    }, 5);

    return () => clearInterval(timer);
  }, [totalDepCount, deposit]);

  useEffect(() => {
    const timer = setInterval(() => {
      totalWithdrawalCount < withdrawal &&
        setTotalWithdrawalCount(
          withdrawal > 1000
            ? totalWithdrawalCount + 100
            : totalWithdrawalCount + 10
        );
    }, 100);

    return () => clearInterval(timer);
  }, [totalWithdrawalCount, withdrawal]);

  return (
    <div className='flex flex-col animate-slideOut  w-11/12 mx-auto'>
      {userDetails && (
        <div
          className={`${
            userDetails ? 'opacity-100' : 'opacity- 0'
          } px-4  transition-opacity my-4 duration-1000`}
        >
          <p className='text-xl'>
            Welcome Back,{' '}
            <span className='text-gray-900'>{userDetails.name}!</span>
          </p>

          <p>Account Number : {userDetails.accountNumber}</p>

          <div className='flex justify-between py-16 '>
            <div className='flex  flex-col'>
              Current Balance
              <p>As at {new Date().toDateString()}</p>
            </div>
            <p className='text-lg'>€{totalCount}</p>
          </div>

          <section className='flex flex-row-reverse gap-5 justify-between'>
            <section className='bg-gray-800 cap bg-blend-color-burn rounded-lg bg-contain flex flex-col gap-3 p-4 text-white w-7/12'>
              <div className='flex gap-2  items-center'>
                <FaClock /> Transaction History
              </div>
              <div className='flex flex-col gap-4'>
                {userDetails.transactions?.length > 0 &&
                  userDetails.transactions.map((item, index) => (
                    <Transactions key={index} {...item} />
                  ))}
              </div>
            </section>

            <section className='flex rounded-lg flex-col w-5/12 text-gray-200 gap-3'>
              <section className='transfer  flex flex-col gap-2  justify-center bg-blend-screen bg-contain h-40 cap rounded-lg p-5'>
                <p>Transfer Money</p>

                <form
                  className='flex flex-col gap-2'
                  onSubmit={handleTransfers}
                >
                  <div className='flex'>
                    <label htmlFor='number' className='w-40'>
                      Account Number
                    </label>
                    <input
                      className='w-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent p-0'
                      type='text'
                      name='number'
                      ref={transferNum}
                      required
                    />
                  </div>

                  <div className='flex'>
                    <label className='w-40' htmlFor='name'>
                      Amount
                    </label>
                    <input
                      className='w-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent p-0'
                      type='text'
                      name='amount'
                      ref={transferAmount}
                      required
                    />
                  </div>
                  <div className='flex justify-end'>
                    <button className='bg-white text-black w-1/6 p-1 rounded-lg px-3 '>
                      Send
                    </button>
                  </div>
                </form>
              </section>

              <section className='loan cap bg-blend-screen flex flex-col gap-2  justify-center bg-contain h-40 rounded-lg p-5'>
                <p>Request Loan</p>

                <form className='flex flex-col gap-2' onSubmit={handleLoans}>
                  <div className='flex'>
                    <label htmlFor='amount' className='w-40'>
                      Amount
                    </label>
                    <input
                      className='w-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent p-0'
                      type='text'
                      name='amount'
                      ref={loanRef}
                      required
                    />
                  </div>
                  <div className='flex justify-end'>
                    <button className='bg-white text-black w-1/6 p-1 rounded-lg px-3 '>
                      Send
                    </button>
                  </div>
                </form>
              </section>

              <section className='close bg-contain gap-2  flex flex-col  justify-center cap h-40 rounded-lg p-5'>
                <p>Close Account</p>

                <form
                  className='flex flex-col gap-2'
                  onSubmit={handleCloseAccount}
                >
                  <div className='flex'>
                    <label className='w-40'>Account Number</label>
                    <input
                      className='w-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent p-0'
                      type='text'
                      ref={closeUser}
                    />
                  </div>
                  <div className='flex'>
                    <label className='w-40'>Account Number</label>
                    <input
                      className='w-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent p-0'
                      type='text'
                      ref={closeUserPin}
                    />
                  </div>

                  <div className='flex justify-end'>
                    <button className='bg-white text-black w-1/6 p-1 rounded-lg px-3 '>
                      Send
                    </button>
                  </div>
                </form>
              </section>
            </section>

            <div className='w-3/12 flex flex-col gap-3'>
              <section className='close flex flex-col gap-2 text-gray-200 items-center justify-center bg-contain cap h-40 rounded-lg p-5'>
                <div className='bg-white text-green-600 w-8 h-8 rounded-full flex items-center justify-center '>
                  <FaArrowDown color='green' />
                </div>

                <p className='text-4xl'>{totalDepCount}</p>
              </section>

              <section className='close flex flex-col text-gray-200 gap-2 items-center justify-center bg-contain cap h-40 rounded-lg p-5'>
                <div className='bg-white text-red-600 w-8 h-8 rounded-full flex items-center justify-center '>
                  <FaArrowUp color='red' />
                </div>
                <p className='text-4xl'>{totalWithdrawalCount}</p>
              </section>

              <section className='close flex flex-col gap-2 text-gray-200 items-center justify-center bg-contain cap h-40 rounded-lg p-5'>
                <p>Loan</p>
                <p className='text-4xl'>{10}</p>

                <div className='grid grid-cols-3 w-full gap-2 '></div>
              </section>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default Profile;
