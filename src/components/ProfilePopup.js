import React from 'react';
import { useBankContext } from '../BankContext/BankAppContext';
import {
  FaArrowRight,
  FaArrowLeft,
  FaTimes,
  FaHandHoldingUsd,
  FaCheck,
} from 'react-icons/fa';
import { useEffect } from 'react';
import { useState } from 'react';

const ProfilePopup = ({ type }) => {
  const {
    handleTransfers,
    transferAmount,
    transVal,
    setTransVal,

    loanRef,

    closeUserPin,
    handleLoans,
    handleCloseAccount,
    transferError,
    loanAlert,
    closeAlert,
    accounts,
  } = useBankContext();

  const [transferAccount, setTransferAccount] = useState('');
  useEffect(() => {
    const findAccount =
      transVal &&
      accounts.find((acc) => acc.accountNumber === Number(transVal));
    setTransferAccount(findAccount);
  }, [accounts, transVal]);

  return (
    <div>
      (
      <section className='flex transact_popup bg-white overflow-hidden shadow w-8/12 rounded-lg md:w-6/12   flex-col min-h-70 h-1/2'>
        <section className='flex h-full'>
          <div className='flex items-center px-2 flex-col close bg-contain gap-2 justify-center text-center text-white cap bg-red-100 w-full min-h-full'>
            {type === 'transfer' ? (
              <div className='bg-white rounded-full animate-slideOut flex-col items-center w-10 h-10  object-cover flex justify-center py-2 px-2'>
                <FaArrowRight color='green' />

                <FaArrowLeft color='brown' />
              </div>
            ) : type === 'loan' ? (
              <div className='bg-white rounded-full animate-slideOut flex-col items-center w-10 h-10  object-cover flex justify-center py-2 px-2'>
                {' '}
                <FaHandHoldingUsd color='green' />
              </div>
            ) : (
              <div className='bg-white rounded-full animate-slideOut flex-col items-center w-10 h-10  object-cover flex justify-center py-2 px-2'>
                <FaTimes color='brown' />
              </div>
            )}

            <p>
              {type === 'transfer'
                ? 'Seamless Transfer'
                : type === 'loan'
                ? 'Quick Loan in 2 minutes'
                : 'We will miss you'}
            </p>
          </div>

          <form
            className='flex flex-col gap-3 w-full min-h-full items-center justify-center p-4 animate-slideIn'
            onSubmit={
              type === 'transfer'
                ? handleTransfers
                : type === 'loan'
                ? handleLoans
                : handleCloseAccount
            }
          >
            {type === 'transfer' && transferError.type ? (
              <p className='text-center text-sm animate-slideIn'>
                {transferError.msg}
              </p>
            ) : type === 'loan' && loanAlert.type ? (
              <p className='text-center text-sm animate-slideIn'>
                {loanAlert.msg}
              </p>
            ) : (
              <p className='text-center text-sm animate-slideIn'>
                {closeAlert.msg}
              </p>
            )}
            {type === 'transfer' || type === 'close' ? (
              <div className='flex'>
                <label htmlFor='number' className='w-40 text-gray-700'>
                  Account Number
                </label>

                <input
                  className='w-100  focus:outline-none text-black rounded focus:ring-2 focus:ring-gray-200 focus:border-transparent py-1 px-2'
                  type='text'
                  name='number'
                  value={transVal}
                  onChange={(e) => setTransVal(e.target.value)}
                  // ref={type === 'transfer' ? transferNum : closeUser}
                  required
                />

                {transferAccount && type === 'transfer' ? (
                  <FaCheck className='absolute check' color='green' />
                ) : null}
              </div>
            ) : null}

            {transferAccount && type === 'transfer' ? (
              <div className='flex animate-slideOut'>
                <label htmlFor='number' className='w-40 text-gray-700'>
                  Account Name
                </label>

                <input
                  className='w-100  focus:outline-none text-black border-none focus:ring-2 focus:ring-gray-200 focus:border-transparent py-1 px-2'
                  type='text'
                  value={transferAccount.name}
                />
              </div>
            ) : null}

            {type === 'close' && (
              <div className='flex'>
                <label htmlFor='number' className='w-40 text-gray-700'>
                  Email
                </label>

                <input
                  className='w-100  focus:outline-none rounded text-black focus:ring-2 focus:ring-gray-200 focus:border-transparent py-1 px-2'
                  type='email'
                  name='email'
                  ref={closeUserPin}
                  required
                />
              </div>
            )}

            {type === 'transfer' || type === 'loan' ? (
              <div className='flex'>
                <label className='w-40 text-gray-700' htmlFor='name'>
                  Amount
                </label>
                <input
                  className='w-100  focus:outline-none rounded text-black  focus:ring-2 focus:ring-gray-200 focus:border-transparent py-1 px-2'
                  type='text'
                  name='amount'
                  ref={type === 'loan' ? loanRef : transferAmount}
                  required
                />
              </div>
            ) : null}
            <div className='flex justify-end w-full'>
              <button
                disabled={
                  type === 'transfer' && transVal && transferAmount
                    ? false
                    : type === 'loan' && loanRef
                    ? false
                    : true
                }
                className='bg-gray-800 cap   text-white w-2/6 p-1 rounded px-3 '
              >
                Send
              </button>
            </div>
          </form>
        </section>
      </section>
    </div>
  );
};

export default ProfilePopup;
