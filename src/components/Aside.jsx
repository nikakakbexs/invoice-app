import React, { useState } from "react";
import Input from "./Input";

export default function Aside({ open, onClose }) {
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState(0);
  const total = qty * price;

  return (
    <form>
      <aside
        className={` lg:rounded-r-3xl md:rounded-r-3xl fixed z-20
        top-[72px] bottom-0          
         left-0 w-full                
         md:w-3/4 md:left-0          
         lg:left-[103px] lg:w-1/2 lg:top-0 lg:bottom-0 
         bg-[var(--white)] shadow-xl
         flex flex-col overflow-y-auto
         transform transition-transform duration-300 ease-in-out
         ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <button
          type="button"
          onClick={onClose}
          className="flex items-center gap-2 p-4 w-full text-[var(--black)]"
        >
          <img
            src="./assets/arrow-left.svg"
            alt="Go back"
            className="w-4 h-4"
          />
          <span className="font-semibold">Go Back</span>
        </button>

        <div className="pl-4 pr-4">
          <h1 className="font-bold text-2xl text-[var(--black)]">
            New invoice
          </h1>
          <p className="text-[var(--purple-500)] font-bold mt-5">Bill From</p>
          <p className="text-[var(--gray)] mt-5 text-xs">Street Address</p>
          <Input />

          <div className="flex gap-4 mt-4">
            <div>
              <p className="text-[var(--gray)]">City</p>
              <Input />
            </div>
            <div>
              <p className="text-[var(--gray)]">Post Code</p>
              <Input />
            </div>
          </div>

          <p className="text-[var(--gray)] mt-4">Country</p>
          <Input />

          <p className="text-[var(--purple-500)] font-bold mt-5">Bill To</p>
          <p className="text-[var(--gray)] mt-4">Client’s Name</p>
          <Input />
          <p className="text-[var(--gray)] mt-4">Client’s Email</p>
          <Input />
          <p className="text-[var(--gray)] mt-4">Street Address</p>
          <Input />

          <div className="flex gap-4 mt-4">
            <div>
              <p className="text-[var(--gray)]">City</p>
              <Input />
            </div>
            <div>
              <p className="text-[var(--gray)]">Post Code</p>
              <Input />
            </div>
          </div>

          <p className="text-[var(--gray)] mt-4">Country</p>
          <Input />
          <p className="text-[var(--gray)] mt-5">Invoice Date</p>
          <Input />
          <p className="text-[var(--gray)] mt-4">Payment Terms</p>
          <Input />
          <p className="text-[var(--gray)] mt-4">Project Description</p>
          <Input />
          <p className="text-[var(--gray)] mt-6 font-bold text-xl">Item List</p>
          <p className="text-[var(--gray)] mt-4">Item Name</p>
          <Input />

          <div className="flex items-end gap-2 mt-4">
            <div className="flex flex-col">
              <p className="text-[var(--gray)]">Qty.</p>
              <Input
                type="number"
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
                className="text-center"
              />
            </div>

            <div className="flex flex-col">
              <p className="text-[var(--gray)]">Price</p>
              <Input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="text-right bg-red-700"
              />
            </div>

            <div className="flex flex-col">
              <p className="text-[var(--gray)]">Total</p>
              <p className="font-bold text-lg text-[var(--gray)]">
                {total.toFixed(2)}
              </p>
            </div>
            <img src="./assets/bin.svg" alt="" />
          </div>
        </div>
      </aside>
    </form>
  );
}
