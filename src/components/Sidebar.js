import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaHome, FaTimes } from 'react-icons/fa';

const Sidebar = () => {
  const [close, setClose] = useState(false);
  return (
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
      <Link to='/sidebar'>{close ? <FaHome /> : 'Home'}</Link>
      <Link to='/sidebar/credit'>{close ? <FaHome /> : 'Credit'}</Link>
      <Link to='/sidebar/dashboard'>{close ? <FaHome /> : 'Dashboard'}</Link>
      <Link to='/sidebar/debit'>{close ? <FaHome /> : 'Debit'}</Link>
      {/* <NavLink to='/Settings'>Settings</NavLink> */}
    </div>
  );
};

export default Sidebar;
