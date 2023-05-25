import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { useBankContext } from '../BankContext/BankAppContext';
import Navbar from './Navbar';
import {BiCopy} from "react-icons/bi"


const Tooltip = ({ text }) => {
  return <div className=" glass2 w-full tooltip">{text}</div>;
};
const Login = () => {
  const {
    handleChangeLogin,
    handleLogin,
    email,
    password,
    confirmFields,
    buttonLoader,
    type,
    msg,
  } = useBankContext();


  const [isCopiedEmail, setIsCopiedEmail]= useState(false)
  const [isCopiedPassword, setIsCopiedPassword]= useState(false)



  const handleCopy = (setVal, val)=> (e) => {

    //To clear any existing popup
    setIsCopiedPassword(false)
    setIsCopiedEmail(false)

//Write to clipboard
    navigator.clipboard.writeText(val);
    setVal(true);
    // Reset the "isCopied" state after a certain duration (e.g., 2 seconds)
    setTimeout(() => {
      setVal(false);
    }, 2000);
  }
  return (
    <div className='min-h-screen  Apps flex flex-col'>
      <Navbar background='bg-black  opacity-80' />
      <div className='h-screen flex flex-col  justify-center items-center'>
        
        <div className="  glass2 relative cap flex justify-center items-end flex-col gap-2 p-4 mb-3 w-10/12 sm:w-8/12 md:w-5/12 lg:w-4/12 rounded">
          <h1 className='text-xl text-green-700 border-b border-gray-300  '>Test Credentials</h1>

         <div className='flex gap-3  items-center '>
           {isCopiedEmail && <Tooltip text="Email copied to clipboard! ✅" />}

           <p className='text-sm'>Email : tests@gmail.com</p>
           <BiCopy className='text-green-600 cursor-pointer' onClick={handleCopy( setIsCopiedEmail, 'tests@gmail.com')}/>
         </div>
         <div className='flex gap-3 items-center '>

           {isCopiedPassword && <Tooltip text="Password copied to clipboard! ✅" />}
           <p className='text-sm' >Password: 123456</p>
           <BiCopy className='text-green-600 cursor-pointer' onClick={handleCopy(setIsCopiedPassword,'123456')}/>
         </div>
        </div>
        
        <div className='w-10/12 sm:w-8/12 md:w-5/12 lg:w-4/12 flex flex-col max-w-2xl  gap-1  transition ease-in-out duration-500'>
          <form
            className='py-6 px-8 cap  bg-contain rounded-xl shadow-2xl animate-slideIn flex flex-col gap-2 lg:gap-4 items-center glass2 '
            onSubmit={handleLogin}
          >
            <p className='text-xl text-gray-800'> Login</p>

            {type ? (
              <p className='text-red-800 animate-slideIn p-2 '>{msg}</p>
            ) : null}

            <input
              type='email'
              placeholder='Enter Email'
              name='email'
              className="input-styles"
              value={email}
              onChange={handleChangeLogin}
            />

            <input
              type='password'
              placeholder='Enter Password'
              name='password'
              className="input-styles"
              value={password}
              onChange={handleChangeLogin}
            />

            <button
              className={` ${
                confirmFields ? 'bg-green-200' : ' bg-green-700 '
              } text-white cap text-xs  w-full md:text-base rounded-lg text-center p-3 text-white transition ease-linear duration-1000`}
              disabled={confirmFields}
            >
              {buttonLoader ? 'Verifying...' : 'Login'}
            </button>
            {/* <Link className='text-sm' to='/resetPassword'>
            Forgot Password{' '}
          </Link> */}

            <p className=' flex gap-3 text-sm text-gray-800'>
              Need An Account {''}{' '}
              <Link className='text-green-600 text-sm' to='/register'>
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;


//
// import React from "react";
// import { Link } from "react-router-dom";
// import { useBankContext } from "../BankContext/BankAppContext";
// import Navbar from "./Navbar";
//
// const Login = () => {
//   const {
//     handleChangeLogin,
//     handleLogin,
//     email,
//     password,
//     confirmFields,
//     buttonLoader,
//     type,
//     msg,
//   } = useBankContext();
//
//   return (
//       <>
//         <Navbar background="bg-black opacity-80" />
//         <section className="section-book">
//           <div className="row">
//             <div className="book">
//               <div className="book__form">
//                 <form onSubmit={handleLogin} className="form">
//                   <div className="mb-2">
//                     <h2 className="text-center text-xl">Login</h2>
//                   </div>
//                   {type ? (
//                       <p className="text-red-800 text-center animate-slideIn p-2 ">
//                         {msg}
//                       </p>
//                   ) : null}
//                   <div className="form__group">
//                     <input
//                         type="email"
//                         placeholder="john@example.com"
//                         name="email"
//                         className="form__input"
//                         value={email}
//                         onChange={handleChangeLogin}
//                         required
//                     />
//                     <label htmlFor="email" className="form__label">
//                       Email
//                     </label>
//                   </div>
//                   <div className="form__group">
//                     <input
//                         type="password"
//                         placeholder="Enter Password"
//                         name="password"
//                         className="form__input"
//                         value={password}
//                         onChange={handleChangeLogin}
//                         required
//                     />
//                     <label htmlFor="password" className="form__label">
//                       Password
//                     </label>
//                   </div>
//
//                   <div class="form-group u-margin-bottom-small">
//                     <section className="form__btn">
//                       <div class="form__radio-group">
//                         <input
//                             type="radio"
//                             name="tours"
//                             id="small"
//                             class="form__radio-input"
//                         />
//                         <label htmlFor="small" class="form__radio-label">
//                           <span class="form__radio-button">First</span>
//                         </label>
//                       </div>
//                       <div class="form__radio-group">
//                         <input
//                             type="radio"
//                             name="tours"
//                             id="large"
//                             class="form__radio-input"
//                         />
//                         <label htmlFor="large" class="form__radio-label">
//                           <span class="form__radio-button">Small</span>
//                         </label>
//                       </div>
//                     </section>
//                   </div>
//
//                   <section className="text-center mb-6">
//                     <button
//                         className={` ${
//                             confirmFields ? "bg-green-200" : " bg-green-700 "
//                         } text-white text-xs  w-4/12 md:text-base rounded-lg text-center py-2 transition ease-linear duration-1000`}
//                         disabled={confirmFields}
//                     >
//                       {buttonLoader ? "Verifying..." : "Login"}
//                     </button>
//                   </section>
//
//
//                   <section className="text-center">
//                     <p className="gap-3 text-center text-sm text-gray-800">
//                       Need An Account {""}{" "}
//                       <Link className="text-blue-600 text-sm" to="/create">
//                         Sign up
//                       </Link>
//                     </p>
//                   </section>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </section>
//       </>
//   );
// };
//
// export default Login;

// <div className="min-h-screen  Apps flex flex-col">
//   <div className="h-screen flex flex-col  justify-center items-center">
//     <div className="w-10/12 sm:w-8/12 md:w-5/12 lg:w-4/12 flex flex-col max-w-2xl  gap-1  transition ease-in-out duration-500">
//       <form
//         className="py-6 px-8 cap  bg-contain rounded-xl shadow-2xl animate-slideIn flex flex-col gap-2 lg:gap-4 items-center glass2 "
//         onSubmit={handleLogin}
//       >
//         <p className="text-xl text-gray-800"> Login</p>

//         <input
//           type="email"
//           placeholder="john@example.com"
//           name="email"
//           className="my-2 block w-full py-2 px-2 focus:outline-none text-black rounded-lg focus:ring-2 border-green-500 focus:ring-green-500 focus:border-transparent text-sm"
//           value={email}
//           onChange={handleChangeLogin}
//         />

//         <input
//           type="password"
//           placeholder="Enter Password"
//           name="password"
//           className="my-2 block w-full py-2 px-2  focus:outline-none border-green-500 text-black rounded-lg focus:ring-2 focus:ring-green-500 text-sm focus:border-transparent"
//           value={password}
//           onChange={handleChangeLogin}
//         />

//         <button
//           className={` ${
//             confirmFields ? "bg-green-200" : " bg-green-700 "
//           } text-white text-xs  w-4/12 md:text-base rounded-lg text-center py-2 transition ease-linear duration-1000`}
//           disabled={confirmFields}
//         >
//           {buttonLoader ? "Verifying..." : "Login"}
//         </button>
//         {/* <Link className='text-sm' to='/resetPassword'>
//           Forgot Password{' '}
//         </Link> */}
//       </form>
//     </div>
//   </div>
// </div>;