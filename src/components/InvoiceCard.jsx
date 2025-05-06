import React from "react";
import { Link } from "react-router-dom";

export default function InvoiceCard({ data }) {
  return (
    <div className="space-y-6 md:space-y-8 mt-6">
      {data.map((invoice) => (

        
        <div key={invoice.id}>

          <Link to={`/invoice/${invoice.id}`}>
            <div className="bg-[var(--white)] p-6 rounded-lg flex flex-col md:hidden cursor-pointer hover:ring-1 hover:ring-[var(--purple-900)] transition">
              <div className="flex justify-between items-center">
                <p className="text-[var(--black)] font-bold text-base">
                  <span className="text-[var(--gray)]">#</span>
                  {invoice.id}
                </p>
                <p className="text-[var(--gray)] font-medium">
                  {invoice.clientName}
                </p>
              </div>
              <p className="text-xs text-[var(--gray)] mt-4">
                Due{" "}
                <span className="font-medium text-[var(--black)]">
                  {new Date(invoice.paymentDue).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </p>
              <p className="text-[var(--black)] font-bold text-lg mt-[10px]">
                £{invoice.total.toFixed(2)}
              </p>
              <div className="flex justify-end -mt-6">
                <div
                  className={`inline-flex justify-center items-center w-[104px] h-[40px] px-2 py-1 rounded-md
                    ${
                      invoice.status === "paid"
                        ? "bg-[#33D69F]/20 text-[#33D69F]"
                        : invoice.status === "pending"
                        ? "bg-[#FF8F00]/20 text-[#FF8F00]"
                        : "bg-[var(--gray)]/20 text-[var(--purple-900)]"
                    }
                  `}
                >
                  <span
                    className={`block w-2 h-2 rounded-full mr-2 mt-0.5
                      ${
                        invoice.status === "paid"
                          ? "bg-[#33D69F]"
                          : invoice.status === "pending"
                          ? "bg-[#FF8F00]"
                          : "bg-[var(--purple-900)]"
                      }
                    `}
                  />
                  <p className="font-medium text-sm capitalize text-center">
                    {invoice.status}
                  </p>
                </div>
              </div>
            </div>
          </Link>

          {}
          <Link to={`/invoice/${invoice.id}`}>
            <div className="hidden md:flex bg-[var(--white)] p-6 rounded-lg items-center justify-between cursor-pointer hover:ring-1 hover:ring-[var(--purple-900)] transition">
              <p className="text-[var(--black)] font-bold text-base">
                <span className="text-[var(--gray)]">#</span>
                {invoice.id}
              </p>
              <p className="text-xs text-[var(--gray)]">
                Due{" "}
                <span className="font-medium text-[var(--gray)]">
                  {new Date(invoice.paymentDue).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </p>
              <p className="text-[var(--gray)] font-medium">
                {invoice.clientName}
              </p>
              <p className="text-[var(--black)] font-bold text-lg">
                £{invoice.total.toFixed(2)}
              </p>
              <div className="flex-shrink-0">
                <div
                  className={`inline-flex justify-center items-center w-[104px] h-[40px] px-2 py-1 rounded-md
                    ${
                      invoice.status === "paid"
                        ? "bg-[#33D69F]/20 text-[#33D69F]"
                        : invoice.status === "pending"
                        ? "bg-[#FF8F00]/20 text-[#FF8F00]"
                        : "bg-[var(--gray)]/20 text-[var(--purple-900)]"
                    }
                  `}
                >
                  <span
                    className={`block w-2 h-2 rounded-full mr-2 mt-0.5
                      ${
                        invoice.status === "paid"
                          ? "bg-[#33D69F]"
                          : invoice.status === "pending"
                          ? "bg-[#FF8F00]"
                          : "bg-[var(--purple-900)]"
                      }
                    `}
                  />
                  <p className="font-medium text-sm capitalize">
                    {invoice.status}
                  </p>
                </div>
              </div>
              <div className="flex-shrink-0">
                <img
                  src="./assets/arrow-right.svg"
                  alt="View details"
                  className="w-4 h-4"
                />
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
