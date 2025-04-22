import React from "react";

export default function Header() {
  const handleTheme = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div
      className={`
        flex items-center justify-between
        bg-[#373B53] w-full h-[72px]

        lg:flex-col lg:justify-between lg:items-center
        lg:w-[103px] lg:h-screen lg:px-0 lg:rounded-r-3xl
      `}
    >
 
      <img
        src="./assets/logo.svg"
        alt="logo"
        className={`
          h-[72px] w-[72px] object-contain
          lg:h-[103px] lg:w-[103px]
        `}
      />

    
      <div
        className={`
          flex items-center space-x-6 h-full pr-4
          
          lg:flex-col
          lg:space-x-0 lg:space-y-6
          lg:pr-0
          lg:h-auto
          lg:w-full      
          lg:pb-4
        `}
      >
        <img
          onClick={handleTheme}
          src="./assets/moon.png"
          alt="theme toggle"
          className="h-6 w-auto cursor-pointer"
        />

        <div
          className={`
            bg-[#494E6E]
            w-px h-full
            lg:w-full lg:h-px
          `}
        />

        <div className="h-8 w-8 bg-black rounded-full" />
      </div>
    </div>
  );
}
