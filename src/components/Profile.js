import React, { useRef } from 'react';
import { useBankContext } from '../BankContext/BankAppContext';
import { FaClock } from 'react-icons/fa';
import Transactions from './Transactions';

const Profile = () => {
  const {
    userDetails,
    total,
    handleLoan,
    closeAcc,
    accounts,
    handleTransfers,
    transferAmount,
    transferNum,
  } = useBankContext();

  // const transferAmount = useRef();
  // const transferNum = useRef();
  const loanRef = useRef();
  const closeUser = useRef();
  const closeUserPin = useRef();

  return (
    <div className='flex flex-col animate-slideOut w-11/12 mx-auto'>
      {userDetails && (
        <div
          className={`${
            userDetails ? 'opacity-100' : 'opacity- 0'
          } px-4  transition-opacity duration-1000`}
        >
          <p className='text-xl'>
            Welcome Back,{' '}
            <span className='text-gray-900'>{userDetails.name}!</span>
          </p>

          <div className='flex justify-between py-16 '>
            <div className='flex  flex-col'>
              Current Balance
              <p>As at {new Date().toDateString()}</p>
            </div>
            <p className='text-lg'>€{total}</p>
          </div>

          <section className='flex gap-5 justify-between w-10/12 mx-auto'>
            <section className='bg-gray-800 cap bg-blend-color-burn bg-contain p-4 text-white w-7/12'>
              <div className='flex gap-2  items-center'>
                <FaClock /> Transaction History
              </div>
              {userDetails.transactions?.length > 0 &&
                userDetails.transactions.map((item, index) => (
                  <Transactions key={index} {...item} />
                ))}
            </section>

            <section className='flex rounded-lg flex-col w-5/12 gap-3'>
              <section className='transfer bg-blend-screen bg-contain h-40 cap rounded-lg p-5'>
                <p>Transfer Money</p>

                <div className='grid grid-cols-3 w-full gap-2 '>
                  <form onSubmit={handleTransfers}>
                    <input
                      className='w-full my-input p-0'
                      type='number'
                      name='number'
                      ref={transferNum}
                      required
                    />
                    <input
                      className='w-full my-input p-0'
                      type='number'
                      name='amount'
                      ref={transferAmount}
                      required
                    />
                    <button>Send</button>
                  </form>
                  <p>Transfer To</p>
                  <p>Amount</p>
                </div>
              </section>

              <section className='loan cap bg-blend-screen bg-contain h-40 rounded-lg p-5'>
                <p>Request Loan</p>

                <div className='grid grid-cols-2 w-full gap-2 '>
                  <form onSubmit={handleLoan}>
                    <input
                      className='w-full my-input p-0'
                      type='text'
                      ref={loanRef}
                      required
                    />

                    <input className='w-1/2 p-0' type='submit' value='send' />
                  </form>
                  <p>Amount</p>
                </div>
              </section>

              <section className='close bg-contain cap h-40 rounded-lg p-5'>
                <p>Close Account</p>

                <div className='grid grid-cols-3 w-full gap-2 '>
                  <form onSubmit={closeAcc}>
                    <input
                      className='w-full my-input p-0'
                      type='text'
                      ref={closeUser}
                    />
                    <input
                      className='w-full my-input p-0'
                      type='text'
                      ref={closeUserPin}
                    />
                    <input type='submit' value='send' />
                  </form>
                  <p>Username</p>
                  <p>Pin</p>
                </div>
              </section>
            </section>
          </section>
        </div>
      )}
    </div>
  );
};

export default Profile;
