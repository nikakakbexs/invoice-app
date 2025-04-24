import React, { useState } from "react";
import data from "../data";
import Sort from "./Sort";
import Button from "./Button";
import InvoiceCard from "./InvoiceCard";

export default function InvoiceHeader() {
  const [filter, setFilter] = useState("All");
  const filteredData = data.filter((inv) =>
    filter === "All" ? true : inv.status.toLowerCase() === filter.toLowerCase()
  );

  return (
    <div className="lg:flex lg:justify-center">
      <div className="px-6 lg:px-0 lg:max-w-4xl w-full">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-bold text-[24px] text-[var(--black)] leading-[100%] mt-7">
              Invoices
            </h1>
            <p className="mt-1 text-[var(--gray)]">
              {filteredData.length}{" "}
              {filteredData.length === 1 ? "invoice" : "invoices"}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Sort selected={filter} onSelect={setFilter} />
            <Button>New Invoice</Button>
          </div>
        </div>

        <div className="mt-8 lg:overflow-y-auto lg:h-[calc(100vh-153px)]">
          <InvoiceCard data={filteredData} />
        </div>
      </div>
    </div>
  );
}
