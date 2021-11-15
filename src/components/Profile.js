import React, { useState, useEffect } from 'react';
import { useBankContext } from '../BankContext/BankAppContext';
import {
  FaArrowDown,
  FaArrowUp,
  FaSearch,
  FaSortAmountDown,
  FaSortAmountUp,
  FaHistory,
  FaArrowRight,
  FaArrowLeft,
  FaSadTear,
  FaHandHoldingUsd,
} from 'react-icons/fa';
import Transactions from './Transactions';
import ProfilePopup from './ProfilePopup';
import Analytics from './Analytics';

const Profile = () => {
  const {
    userDetails,
    total,
    selectChange,
    selected,
    deposit,
    withdrawal,
    handleSortAsc,
    handleSortDesc,
    popUp,
    setpopUp,
    userData,
    setSuccessMsg,
    asc,
    capitalize,
  } = useBankContext();

  const [counter, setCounter] = useState(0);

  const [totalDepCount, setTotalDepCount] = useState(0);

  const [totalCount, setTotalCount] = useState(0);

  const [totalWithdrawalCount, setTotalWithdrawalCount] = useState(0);

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

  const globalizeDate = () => {
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      weekday: 'short',
    };

    const locale = navigator.language;

    const TodaysDate = new Intl.DateTimeFormat(locale, options).format(now);
    return TodaysDate;
  };

  return (
    <div className='flex flex-col animate-slideOut  w-11/12 mx-auto'>
      {userDetails && (
        <div className={`${popUp && 'filter blur'} px-4 my-2 lg:my-4`}>
          <p className='text-base flex gap-3 text-gray-800  md:text-xl'>
            Welcome Back,
            <span className='text-gray-800 '>{userDetails.name}!</span>
          </p>

          <p className='text-sm text-gray-800  md:text-base'>
            Account Number : {userDetails.accountNumber}
          </p>

          <div className='flex md:flex-row flex-col  justify-between md:items-center gap-2 py-8 lg:py-16 '>
            <div className='flex text-sm lg:text-base  flex-col text-gray-800 '>
              Current Balance
              <p className='text-sm text-gray-800 '>As at {globalizeDate()}</p>
            </div>
            <div className='animate-slideIn'>
              <p className='text-sm lg:text-base'>Balance</p>
              <p className=' text-lg lg:text-2xl text-gray-900 font-bold '>
                ₦{totalCount?.toLocaleString()}
              </p>{' '}
            </div>
          </div>

          <section className='flex flex-col lg:flex-row-reverse gap-5 justify-between '>
            <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 lg:w-5/12 w-full lg:sticky top-3 order-2 lg:order-none  h-full rounded-lg  text-gray-200 gap-3'>
              <section
                className='transfer flex flex-col gap-2 w-full items-center  max-w-md mx-auto justify-center bg-blend-screen bg-contain h-40 cap rounded-lg cursor-pointer p-5'
                onClick={() => {
                  setpopUp(!popUp);
                  setSuccessMsg(false);
                  setType('transfer');
                }}
              >
                <div className='glass rounded-full animate-slideOut flex-col items-center w-10 h-10  object-cover flex justify-center py-1 px-1 shadow-2xl mx-auto'>
                  <FaArrowRight color='green' />

                  <FaArrowLeft color='brown' />
                </div>
                <p className='text-center'> Make A Transfer</p>
              </section>

              <section
                className='loan cap bg-blend-screen flex flex-col w-full gap-2 items-center  max-w-md mx-auto  justify-center  cursor-pointer bg-contain h-40 rounded-lg p-5'
                onClick={() => {
                  setpopUp(!popUp);
                  setSuccessMsg(false);
                  setType('loan');
                }}
              >
                <div className='glass rounded-full animate-slideOut flex-col items-center w-10 h-10  object-cover flex justify-center py-1 px-1 shadow-2xl mx-auto'>
                  <FaHandHoldingUsd color='green' />
                </div>
                <p>Request Loan</p>
              </section>

              <section
                className='white shadow-2xl bg-contain gap-2  flex flex-col items-center  max-w-md mx-auto w-full justify-center  bg-gray-900 cursor-pointer cap h-40 rounded-lg p-5'
                onClick={() => {
                  setpopUp(!popUp);
                  setSuccessMsg(false);
                  setType('close');
                }}
              >
                <div className='glass rounded-full animate-slideOut flex-col items-center w-10 h-10  object-cover flex justify-center py-1 px-1 shadow-2xl mx-auto'>
                  <FaSadTear color='brown' />
                </div>

                <p>Close Account</p>
              </section>
            </section>
            <section className='lg:w-7/12 flex-shrink-0 order-1 lg:order-none  flex flex-col gap-3'>
              <p className='text-base lg:text-xl greentxt '>Transactions</p>

              <section className='flex glass shadow-lg border border-gray-300 rounded-lg px-3 py-4  text-gray-800 justify-between items-center'>
                <p className='text-sm greentxt lg:text-base'>
                  {Number(selected.type) === 1
                    ? 'All Transactions'
                    : Number(selected.type) === 2
                    ? 'All Debits'
                    : 'All Credits'}
                </p>
                <div className='flex gap-3'>
                  {/* <label className='flex gap-3 items-center'>
                    All
                    <input type='checkbox' />
                  </label>
                  <label className='flex gap-3 items-center'>
                    Credit
                    <input type='checkbox' />
                  </label>
                  <label className='flex gap-3 items-center'>
                    Debit
                    <input type='checkbox' />
                  </label> */}

                  <select
                    className='py-0 text-sm lg-text-base greentxt border border-green-600 focus:outline-none focus:ring-green-500 focus:border-green-500   w-28 rounded'
                    value={selected.type}
                    onChange={selectChange}
                  >
                    <option value={1}>All</option>

                    <option value={2}>Debit</option>

                    <option value={3}>Credit</option>
                  </select>
                </div>
              </section>
              <section className='w-full glass  rounded-lg bg-contain flex flex-col gap-2 p-4 text-black h-full'>
                <div className='flex gap-2 justify-between  flex-col md:flex-row items-center'>
                  <div className='flex gap-2 items-center flex-shrink-0 text-gray-700'>
                    <FaHistory className='text-gray-700' /> Transaction History
                  </div>

                  <div className='bg-white items-center px-3 rounded-3xl  lg:w-5/12 sm:w-auto border border-gray-300 overflow-hidden flex gap-2'>
                    <FaSearch
                      size='10px'
                      className='text-gray-700 flex-shrink-0'
                    />
                    <input
                      type='text'
                      className='border-transparent focus:outline-none text-black focus:py-0 focus:ring-2 focus:ring-white focus:border-transparent  py-0'
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder='Search...'
                    />
                  </div>

                  {asc ? (
                    <div
                      className='flex gap-2 bg-white text-gray-800 cursor-pointer text-sm rounded-xl px-3 py-1 items-center w-20 border-gray-300 border'
                      onClick={handleSortDesc}
                    >
                      <FaSortAmountDown color='green' /> Desc
                    </div>
                  ) : (
                    <div
                      className='flex gap-2 bg-white text-gray-800 cursor-pointer rounded-xl px-3 w-20 py-1 items-center text-sm border border-gray-300 '
                      onClick={handleSortAsc}
                    >
                      <FaSortAmountUp color='cadetblue' /> Asc
                    </div>
                  )}
                </div>
                {asc ? (
                  <div className='flex gap-2 flex-col animate-slideIn min-w-full overflow-auto w-full '>
                    {userData.transactions?.length > 0 &&
                      userData.transactions
                        .filter((item) =>
                          item.Depositor.includes(capitalize(input))
                        )
                        .map((item, index) => (
                          <Transactions key={index} {...item} />
                        ))}
                  </div>
                ) : (
                  <div className='flex flex-col animate-slideOut gap-2 min-w-full w-full overflow-auto '>
                    {userData.transactions?.length > 0 &&
                      userData.transactions
                        .filter((item) =>
                          item.Depositor.includes(capitalize(input))
                        )
                        .sort((a, b) => new Date(b.time) - new Date(a.time))
                        .map((item, index) => (
                          <Transactions key={index} {...item} />
                        ))}
                  </div>
                )}
              </section>
            </section>

            <div className='lg:w-4/12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  w-full order-3 lg:sticky top-3 lg:h-full gap-3 lg:grid-cols-1'>
              <Analytics
                counts={totalDepCount.toLocaleString()}
                icon={<FaArrowDown color='green' />}
                color='transfer'
              />
              <Analytics
                counts={totalWithdrawalCount.toLocaleString()}
                color={'loan'}
                icon={<FaArrowUp color='brown' />}
              />
              <Analytics
                counts={10}
                color={'bg-gray-900'}
                icon={<FaArrowDown color='green' />}
              />
            </div>
          </section>
        </div>
      )}
      {popUp ? (
        <ProfilePopup
          type={type}
          color={
            type === 'transfer'
              ? 'transfer'
              : type === 'loan'
              ? 'loan'
              : 'bg-gray-900'
          }
        />
      ) : null}
    </div>
  );
};

export default Profile;
