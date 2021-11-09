import React, { useState, useEffect } from 'react';
import { useBankContext } from '../BankContext/BankAppContext';
import {
  FaClock,
  FaArrowDown,
  FaArrowUp,
  FaSearch,
  FaSyncAlt,
  FaSortAmountDown,
  FaSortAmountUp,
  FaHistory,
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
    asc,
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
            <section className='w-10/12 flex flex-col gap-3'>
              <p className='text-xl'>Transactions</p>

              <section className='flex bg-white shadow-lg px-2 py-4 text-gray-800 justify-between items-center'>
                <p className='text-xl'>
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
                    className='py-0 w-28'
                    value={selected.type}
                    onChange={selectChange}
                  >
                    <option value={1}>All</option>

                    <option value={2}>Debit</option>

                    <option value={3}>Credit</option>
                  </select>
                </div>
              </section>
              <section className='bg-gray-800 cap bg-blend-color-burn rounded-lg bg-contain flex flex-col gap-3 p-4 text-white h-full'>
                <div className='flex gap-2 justify-between items-center'>
                  <div className='flex gap-2 items-center'>
                    <FaHistory /> Transaction History
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

                  {asc ? (
                    <div
                      className='flex gap-2 bg-gray-50 text-gray-800 cursor-pointer text-sm rounded-xl px-3 py-1 items-center '
                      onClick={handleSortDesc}
                    >
                      <FaSortAmountDown color='green' /> Desc
                    </div>
                  ) : (
                    <div
                      className='flex gap-2 bg-gray-50 text-gray-800 cursor-pointer rounded-xl px-3 py-1 items-center text-sm '
                      onClick={handleSortAsc}
                    >
                      <FaSortAmountUp color='cadetblue' /> Asc
                    </div>
                  )}
                </div>
                {asc ? (
                  <div className='flex flex-col'>
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
                  <div className='flex flex-col'>
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

            <div className='w-3/12 flex sticky top-3 h-full flex-col gap-3'>
              <Analytics
                counts={totalDepCount}
                icon={<FaArrowDown color='green' />}
              />
              <Analytics
                counts={totalWithdrawalCount}
                color={'red'}
                icon={<FaArrowUp color='red' />}
              />
              <Analytics
                counts={10}
                color={'green'}
                icon={<FaArrowDown color='green' />}
              />
            </div>
          </section>
        </div>
      )}
      {popUp ? <ProfilePopup type={type} /> : null}
    </div>
  );
};

export default Profile;
