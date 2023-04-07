import React from 'react'

const CustomButton = ({  btnType, title, styles, handleClick}) => {
  return (
    <button
      type={btnType}
      className={`font-epilogue fot=semibold text-[16px] leading-[26px] text-white mi-h-[52px] px-4 rounded-[10px] ${styles}`}
      onClick={handleClick}
    >
      {title}
    </button>
  )
}

export default CustomButton
