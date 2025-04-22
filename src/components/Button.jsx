import React from "react";

export default function Button() {
  return (
    <div>
      <button
        type="button"
        className="
          block lg:inline-block
          relative z-10
          w-auto lg:w-full
          py-4 px-4 pl-[3.5rem] lg:py-3 lg:px-3 lg:pl-[2.5rem]
          font-spartan text-xs font-bold tracking-[-0.25px] leading-none
          rounded-full
          bg-[var(--purple-500)] text-white
          hover:bg-[var(--purple-200)]
          cursor-pointer select-none
        "
      >
        <span
          className="
            absolute left-2 top-1/2 transform -translate-y-1/2
            w-6 h-6
            flex items-center justify-center
            bg-white rounded-full
          "
        >
          <img src="./assets/icon-plus.svg" alt="" className="w-3 h-3" />
        </span>
        <>
          <span className="sm:hidden">New</span>
          <span className="hidden sm:inline">New Invoices</span>
        </>
      </button>
    </div>
  );
}
