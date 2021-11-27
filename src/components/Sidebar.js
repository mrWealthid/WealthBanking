import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import Signup from './Signup';
import Login from './Login';

const Sidebar = () => {
  const [close, setClose] = useState(false);

  const [ind, setInd] = useState(0);
  const data = [
    { title: 'Home', path: 'Users Profiles' },
    { title: 'Credit', path: 'Users Credit Profile' },
    { title: 'Debit', path: 'Users Debit Profile' },
    { title: 'DashBoard', path: 'Users Dashboard Profile' },
  ];

  return (
    <div className='flex gap-4'>
      <div
        className={`    ${
          close ? 'w-12' : 'w-3/12'
        } flex p-2 flex-col gap-3 min-h-screen bg-gray-700 text-white`}
      >
        <div className='flex justify-between'>
          {!close && <p onClick={() => setClose(!close)}>Banking</p>}
          <p onClick={() => setClose(!close)}>
            {close ? <FaTimes /> : <FaBars />}
          </p>
        </div>

        <div>
          {data.map((link, index) => (
            <div onClick={() => setInd(index)} key={index}>
              <p>{link.title}</p>
            </div>
          ))}
        </div>
        {/* <Link to='/sidebar'>{close ? <FaHome /> : 'Home'}</Link>
      <Link to='/sidebar/credit'>{close ? <FaHome /> : 'Credit'}</Link>
      <Link to='/sidebar/dashboard'>{close ? <FaHome /> : 'Dashboard'}</Link>
      <Link to='/sidebar/debit'>{close ? <FaHome /> : 'Debit'}</Link> */}
        {/* <NavLink to='/Settings'>Settings</NavLink> */}
      </div>
      <p className='w-full'>
        {' '}
        {ind === 0 ? <Signup /> : ind === 1 ? <Login /> : 'Flexing'}
      </p>
    </div>
  );
};

export default Sidebar;
