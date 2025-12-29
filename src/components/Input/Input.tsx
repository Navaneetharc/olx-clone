import React from 'react';

interface InputProps {
  value: string | number;
  setInput: (value: string) => void; 
  placeholder: string;
  type?: string;
}

const Input: React.FC<InputProps> = ({ value, setInput, placeholder, type = "text" }) => {
  return (
    <div className='relative w-full group'>
      <input
        type={type}
        value={value}
        onChange={(e) => setInput(e.target.value)}
        placeholder=" " 
        className='block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#002f34] peer'
        required
      />
      <label
        className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-left bg-white px-2 peer-focus:px-2 peer-focus:text-[#002f34] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 pointer-events-none"
      >
        {placeholder}
      </label>
    </div>
  )
}

export default Input;