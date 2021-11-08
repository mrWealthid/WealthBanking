import React, { useState, useEffect } from 'react';
import { useBankContext } from '../BankContext/BankAppContext';
import {
  FaClock,
  FaArrowDown,
  FaArrowUp,
  FaSearch,
  FaSyncAlt,
} from 'react-icons/fa';
import Transactions from './Transactions';

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
    transferError,
    loanAlert,
    closeAlert,
  } = useBankContext();

  const [counter, setCounter] = useState(0);

  const [totalDepCount, setTotalDepCount] = useState(0);

  const [totalCount, setTotalCount] = useState(0);

  const [totalWithdrawalCount, setTotalWithdrawalCount] = useState(0);

  const [popUp, setpopUp] = useState(false);
  const [loan, setLoan] = useState(false);
  const [closeAcc, setCloseAcc] = useState(false);

  const [sorted, setsorted] = useState(false);
  const [input, setInput] = useState('');

  const [type, setType] = useState('');

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

  // To capitalize input

  const capitalize = (vals) => {
    if (vals) {
      return vals.split('')[0].toUpperCase() + vals.slice(1);
    } else {
      return vals;
    }
  };

  return (
    <div className='flex flex-col animate-slideOut  w-11/12 mx-auto'>
      {userDetails && (
        <div className={`${popUp && 'filter blur'} px-4  my-4`}>
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
            <div className='text-lg animate-slideIn'>
              <p>Balance</p>
              <p className='text-2xl text-gray-900 font-bold '>
                €{totalCount}
              </p>{' '}
            </div>
          </div>

          <section className='flex flex-row-reverse gap-5 justify-between relative'>
            <section className='flex w-3/12 sticky top-3 h-full rounded-lg flex-col w-5/12 text-gray-200 gap-3'>
              <section
                className='transfer  flex flex-col gap-2  justify-center bg-blend-screen bg-contain h-40 cap rounded-lg p-5'
                onClick={() => {
                  setpopUp(!popUp);

                  setType('transfer');
                }}
              >
                <p> Make A Transfer Today</p>
              </section>

              <section
                className='loan cap bg-blend-screen flex flex-col gap-2  justify-center bg-contain h-40 rounded-lg p-5'
                onClick={() => {
                  setpopUp(!popUp);
                  setType('loan');
                }}
              >
                <p>Request Loan</p>
              </section>

              <section
                className='close bg-contain gap-2  flex flex-col  justify-center cap h-40 rounded-lg p-5'
                onClick={() => {
                  setpopUp(!popUp);

                  setType('close');
                }}
              >
                <p>Close Account</p>
              </section>
            </section>

            <section className='bg-gray-800 cap bg-blend-color-burn rounded-lg bg-contain flex flex-col gap-3 p-4 text-white w-10/12'>
              <div className='flex gap-2 justify-between items-center'>
                <div className='flex gap-2 items-center'>
                  <FaClock /> Transaction History
                </div>

                <div className='bg-white items-center px-3 rounded-3xl py-1 flex gap-2'>
                  <FaSearch className='text-gray-700' />
                  <input
                    type='text'
                    className='border-transparent focus:outline-none text-black focus:py-0 focus:ring-2 focus:ring-white focus:border-transparent py-0'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder='Search...'
                  />
                </div>

                <div
                  className='flex gap-2 bg-gray-50 text-gray-800 cursor-pointer rounded-xl px-2 items-center'
                  onClick={() => setsorted(!sorted)}
                >
                  <FaSyncAlt /> sort
                </div>
              </div>
              <div className='flex flex-col  '>
                {sorted
                  ? userDetails.transactions?.length > 0 &&
                    userDetails.transactions
                      .filter((item) =>
                        item.Depositor.includes(capitalize(input))
                      )
                      .map((item, index) => (
                        <Transactions key={index} {...item} />
                      ))
                  : userDetails.transactions?.length > 0 &&
                    userDetails.transactions
                      .filter((item) =>
                        item.Depositor.includes(capitalize(input))
                      )
                      .map((item, index) => (
                        <Transactions key={index} {...item} />
                      ))
                      .reverse()}
              </div>
            </section>

            <div className='w-3/12 flex sticky top-3 h-full flex-col gap-3'>
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

      {popUp ? (
        <section className='flex transact_popup bg-white w-8/12  md:w-6/12   flex-col min-h-70 h-1/2'>
          <section className='flex p-4'>
            <div className='flex items-center justify-center  cap w-full h-full'>
              {type === 'transfer'
                ? 'Seamless Transfer'
                : type === 'loan'
                ? 'Quick Loan in 2 minutes'
                : 'We will miss you'}
            </div>

            <form
              className='flex flex-col gap-2 w-full animate-slideIn'
              onSubmit={
                type === 'transfer'
                  ? handleTransfers
                  : type === 'loan'
                  ? handleLoans
                  : handleCloseAccount
              }
            >
              {type === 'transfer' && transferError.type ? (
                <p className='text-center text-sm'>{transferError.msg}</p>
              ) : type === 'loan' && loanAlert.type ? (
                <p className='text-center text-sm'>{loanAlert.msg}</p>
              ) : (
                <p className='text-center text-sm'>{closeAlert.msg}</p>
              )}
              {type === 'transfer' || type === 'close' ? (
                <div className='flex'>
                  <label htmlFor='number' className='w-40'>
                    Account Number
                  </label>

                  <input
                    className='w-100  focus:outline-none text-black focus:ring-2 focus:ring-gray-200 focus:border-transparent py-1 px-2'
                    type='text'
                    name='number'
                    ref={type === 'transfer' ? transferNum : closeUser}
                    required
                  />
                </div>
              ) : null}
              {/* 
              <div className='flex'>
                <label htmlFor='number' className='w-40'>
                  Account Name
                </label>

                <input
                  className='w-100  focus:outline-none text-black focus:ring-2 focus:ring-gray-200 focus:border-transparent py-1 px-2'
                  type='text'
                  name='number'
                  ref={transferNum}
                  required
                />
              </div> */}

              {type === 'close' && (
                <div className='flex'>
                  <label htmlFor='number' className='w-40'>
                    Email
                  </label>

                  <input
                    className='w-100  focus:outline-none text-black focus:ring-2 focus:ring-gray-200 focus:border-transparent py-1 px-2'
                    type='email'
                    name='email'
                    ref={closeUserPin}
                    required
                  />
                </div>
              )}

              {type === 'transfer' || type === 'loan' ? (
                <div className='flex'>
                  <label className='w-40' htmlFor='name'>
                    Amount
                  </label>
                  <input
                    className='w-100  focus:outline-none text-black  focus:ring-2 focus:ring-gray-200 focus:border-transparent py-1 px-2'
                    type='text'
                    name='amount'
                    ref={type === 'loan' ? loanRef : transferAmount}
                    required
                  />
                </div>
              ) : null}
              <div className='flex justify-end'>
                <button className='bg-white text-black w-1/6 p-1 rounded-lg px-3 '>
                  Send
                </button>
              </div>
            </form>
          </section>
        </section>
      ) : null}
    </div>
  );
};

export default Profile;
