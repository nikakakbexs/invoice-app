import React, { useState, useRef, useEffect } from "react";

export default function Sort({ selected, onSelect }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const options = ["All", "Draft", "Pending", "Paid"];

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative inline-block text-sm" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-2 text-[var(--black)] font-medium"
      >

        <span className="sm:hidden">Filter</span>
        <span className="hidden sm:inline">Filter by status</span>
        <img
          src={open ? "./assets/arrow-up.svg" : "./assets/arrowDown.svg"}
          alt=""
          className="w-4 h-4"
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 z-20 bg-[var(--white)] rounded-lg shadow-lg border border-gray-200">
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => {
                onSelect(opt);
                setOpen(false);
              }}
              className="flex items-center px-2 py-1 cursor-pointer"
            >
              <div
                className={`w-4 h-4 rounded-sm mr-2 ${
                  selected === opt
                    ? "bg-[var(--purple-500)]"
                    : "border-2 border-[var(--purple-500)]"
                }`}
              />
              <span className="text-[var(--black)]">{opt}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
