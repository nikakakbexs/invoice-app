import React from 'react'

export default function Input({className}) {
  return (
    <div>
      <input 
        type="text"
        className={`
    border border-[var(--gray)]
    rounded-sm
    focus:outline-none
    focus:border-[var(--purple-200)]
     focus:border-2
    pl-5 mt-2 w-full text-[var(--black)] font-bold  pt-2 pb-2
    ${className}
  `}
      />
    </div>
  );
}
