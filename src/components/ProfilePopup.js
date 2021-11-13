import React from 'react';
import { useBankContext } from '../BankContext/BankAppContext';
import {
  FaArrowRight,
  FaArrowLeft,
  FaTimes,
  FaHandHoldingUsd,
  FaCheck,
  FaClipboardCheck,
  FaSadTear,
} from 'react-icons/fa';
import { useEffect } from 'react';
import { useState } from 'react';

const ProfilePopup = ({ type, color }) => {
  const {
    handleTransfers,
    transferAmount,
    transVal,
    setTransVal,

    loanRef,
    setpopUp,
    closeUserPin,
    handleLoans,
    handleCloseAccount,
    transferError,
    loanAlert,
    closeAlert,
    accounts,
    successMsg,
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
      <section className='flex transact_popup bg-white overflow-hidden w-6/12 shadow  md:w-8/12 lg:w-6/12 rounded-lg w-10/12  flex-col h-96'>
        <section className='flex h-full'>
          <p
            className='times cursor-pointer bg-white shadow-2xl rounded-full p-1'
            onClick={() => setpopUp(false)}
          >
            <FaTimes size='18px' color='darkslategrey' />
          </p>
          <div
            className={`${color} hidden sm:flex items-center px-2 flex-col bg-contain gap-2 justify-center text-center bg-blend-screen text-white cap  w-full min-h-full`}
          >
            {type === 'transfer' ? (
              !successMsg ? (
                <div className='glass rounded-full animate-slideOut flex-col items-center w-10 h-10  object-cover flex justify-center py-2 px-2 mx-auto'>
                  <FaArrowRight color='green' />

                  <FaArrowLeft color='brown' />
                </div>
              ) : (
                <div className='glass rounded-full animate-slideOut flex-col items-center w-10 h-10  object-cover flex justify-center py-2 px-2 mx-auto'>
                  <FaClipboardCheck color='green' />

                  {/* <FaArrowLeft color='brown' /> */}
                </div>
              )
            ) : type === 'loan' ? (
              !successMsg ? (
                <div className='glass rounded-full animate-slideOut flex-col items-center w-10 h-10  object-cover flex justify-center py-2 px-2 mx-auto'>
                  {' '}
                  <FaHandHoldingUsd color='green' />
                </div>
              ) : (
                <div className='glass rounded-full animate-slideOut flex-col items-center w-10 h-10  object-cover flex justify-center py-2 px-2 mx-auto'>
                  <FaClipboardCheck color='green' />
                </div>
              )
            ) : (
              <div className='glass rounded-full animate-slideOut flex-col items-center w-10 h-10  object-cover flex justify-center py-1 px-3 mx-auto'>
                <FaSadTear color='brown' />
              </div>
            )}

            <p>
              {type === 'transfer'
                ? successMsg
                  ? 'Transfer Completed'
                  : 'Seamless Transfer'
                : type === 'loan'
                ? successMsg
                  ? 'Payment Completed'
                  : 'Quick Loan in 2 minutes'
                : "It's Hard To See You Go"}
            </p>
          </div>

          <form
            className='flex  flex-col  gap-3  w-full min-h-full items-center cap bg-contain justify-center p-4 animate-slideIn'
            onSubmit={
              type === 'transfer'
                ? handleTransfers
                : type === 'loan'
                ? handleLoans
                : handleCloseAccount
            }
          >
            <div className=' sm:hidden'>
              {type === 'transfer' ? (
                <div className='glass rounded-full animate-slideOut flex-col items-center w-10 h-10  object-cover flex justify-center py-2 px-2 shadow-2xl mx-auto'>
                  <FaArrowRight color='green' />

                  <FaArrowLeft color='brown' />
                </div>
              ) : type === 'loan' ? (
                <div className='glass rounded-full animate-slideOut flex-col items-center w-10 h-10  object-cover flex justify-center py-2 px-2 shadow-2xl  mx-auto'>
                  <FaHandHoldingUsd color='green' />
                </div>
              ) : (
                <div className='glass rounded-full animate-slideOut flex-col items-center w-10 h-10  object-cover flex justify-center py-2 px-2 shadow-2xl  mx-auto'>
                  {' '}
                  <FaSadTear color='brown' />
                </div>
              )}
            </div>

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
              <div className='flex w-10/12 lg-w-full flex-col relative'>
                <label htmlFor='number' className='w-40 text-gray-700'>
                  Account Number
                </label>

                <input
                  className='w-100  focus:outline-none text-black rounded focus:ring-2 focus:ring-gray-200 focus:border-transparent py-1 px-2'
                  type='text'
                  name='number'
                  value={transVal}
                  onChange={(e) => setTransVal(e.target.value)}
                  required
                />

                {transferAccount && type === 'transfer' ? (
                  <FaCheck
                    className='absolute animate-slideIn glass check'
                    color='green'
                  />
                ) : null}
              </div>
            ) : null}

            {transferAccount && type === 'transfer' ? (
              <div className='flex w-10/12  flex-col animate-slideOut'>
                <label htmlFor='number' className='w-40 text-gray-700'></label>

                <input
                  className='w-100  focus:outline-none text-gray-700 border-none focus:ring-2 focus:ring-gray-200 focus:border-transparent py-1 px-2'
                  type='text'
                  value={transferAccount.name}
                  readOnly
                />
              </div>
            ) : null}

            {type === 'close' && (
              <div className='flex w-10/12  flex-col'>
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
              <div className='flex w-10/12  flex-col'>
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
            <div className='flex justify-end w-10/12'>
              <button
                // disabled={
                //   type === 'transfer' && transVal && transferAmount
                //     ? false
                //     : type === 'loan' && loanRef
                //     ? false
                //     : true
                // }
                className={`${color} cap text-white w-2/6 p-1 rounded px-3 `}
              >
                {type === 'close' ? 'Close' : 'Send'}
              </button>
            </div>
          </form>
        </section>
      </section>
    </div>
  );
};

export default ProfilePopup;
