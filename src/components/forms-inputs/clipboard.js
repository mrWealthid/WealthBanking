import React, {useState} from 'react';
import {BiCopy} from "react-icons/bi";
import PropTypes from "prop-types";
import {FaCheck} from "react-icons/fa";

const Tooltip = ({text}) => {
    return <div className=" glass2 w-full tooltip">{text}</div>;
};
function Clipboard({text, msg, showMessage, color}) {
    const [value, setValue] = useState(false)

    let timer;
    const handleCopier = () => {
        clearTimeout(timer)
        setValue(true)
        navigator.clipboard.writeText(text).then(() => {
            timer = setTimeout(() => {
                setValue(false);
            }, 2000);
            }
        );

    }

    return (
        <div className='flex gap-3  items-center '>
            {!value ? <BiCopy className={`${color} cursor-pointer`}
                              onClick={handleCopier}/> :
                <FaCheck className={`${color} cursor-pointer`}
                         onClick={handleCopier}/>}
            {value && showMessage && <Tooltip text={msg}/>}
        </div>
    );
}

Clipboard.propTypes = {
    text: PropTypes.string,
    msg: PropTypes.string,
    showMessage: PropTypes.bool,
    color: PropTypes.string,

}

Clipboard.defaultProps = {
    showMessage: true,
    color: 'text-green-600'
}

export default Clipboard;