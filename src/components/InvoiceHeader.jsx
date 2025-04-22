import React from "react";
import data from "../data";
import Sort from "./Sort";
import Button from "./Button";

export default function InvoiceHeader() {
  const count = data.length;

  return (
    <div className="px-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-bold text-[24px] text-[var(--black)] leading-[100%] mt-3">
            Invoices
          </h1>
          <p className="mt-1 text-[var(--gray)]">
            {count} {count === 1 ? "invoice" : "invoices"}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Sort />

          <Button></Button>
        </div>
      </div>
    </div>
  );
}
