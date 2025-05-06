import React, { useState } from "react";
import Sort from "./Sort";
import Button from "./Button";
import InvoiceCard from "./InvoiceCard";
import Aside from "./Aside";

export default function InvoiceHeader({ invoices, onAddInvoice }) {
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState(false);

  const filteredData = invoices.filter((inv) =>
    filter === "All" ? true : inv.status.toLowerCase() === filter.toLowerCase()
  );

  return (
    <div className="relative lg:flex lg:justify-center">
      <div className="px-6 lg:px-0 lg:max-w-4xl w-full">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-bold text-[24px] text-[var(--black)] mt-7">
              Invoices
            </h1>
            <p className="mt-1 text-[var(--gray)]">
              {filteredData.length}{" "}
              {filteredData.length === 1 ? "invoice" : "invoices"}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Sort selected={filter} onSelect={setFilter} />
            <Button onClick={() => setOpen(true)}>New Invoice</Button>
          </div>
        </div>

        <div className="mt-8 lg:overflow-y-auto lg:h-[calc(100vh-165px)]">
          <InvoiceCard data={filteredData} />
        </div>
      </div>

      {open && (
        <div
          className="fixed z-10 top-[72px] bottom-0 left-0 right-0 lg:top-0 lg:bottom-0 lg:left-[103px] lg:right-0  bg-black/50 hidden md:block"
          onClick={() => setOpen(false)}
        />
      )}

      <Aside
        open={open}
        onClose={() => setOpen(false)}
        onAddInvoice={onAddInvoice}
      />
    </div>
  );
}
