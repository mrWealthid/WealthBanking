import React, {useState} from 'react';
import {BiCopy} from "react-icons/bi";
import PropTypes from "prop-types";

const Tooltip = ({text}) => {
    return <div className=" glass2 w-full tooltip">{text}</div>;
};
function Clipboard({text, msg}) {
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
            <BiCopy className='text-green-600 cursor-pointer'
                    onClick={handleCopier}/>
            {value && <Tooltip text={msg}/>}
        </div>
    );
}

Clipboard.propTypes = {
    text: PropTypes.string,
    msg: PropTypes.string

}

export default Clipboard;