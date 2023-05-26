import React, {useState} from 'react';
import {FaEye, FaEyeSlash} from "react-icons/all";
import PropTypes from "prop-types";

const PasswordInput = ({control,changeHandler }) =>  {
    const [showPassword, setShowPassword]= useState(false)

    const togglePassword =()=> {
        setShowPassword(!showPassword)
    }
    return (
    <div className='bg-white rounded-lg overflow-hidden  w-full my-2 border flex items-center'>
        <input
            type={showPassword ? 'text' : 'password'}
            placeholder='Enter Password'
            name='password'
            className=" py-4 pl-4 w-11/12 text-sm focus:ring-0 border-none "
            value={control}
            onChange={changeHandler}
        />

        {!showPassword ? <FaEyeSlash className='text-green-600 cursor-pointer' onClick={togglePassword}/>
            : <FaEye className='text-green-600 cursor-pointer' onClick={togglePassword}/>
        }
    </div>


)};

PasswordInput.propTypes = {
    control: PropTypes.string,
    changeHandler: PropTypes.func

}


export default PasswordInput;