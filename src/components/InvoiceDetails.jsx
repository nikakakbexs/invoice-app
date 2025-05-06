import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EditInvoice from "./EditInvoice"; 

export default function InvoiceDetails({
  invoices,
  setInvoices,
  onDelete,
  onMarkAsPaid,
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [editOpen, setEditOpen] = useState(false); 

  const invoice = invoices.find((inv) => inv.id === id);

  if (!invoice) return <p className="p-4">Invoice not found.</p>;

  console.log(invoice);
  

  const handleDelete = () => {
    const confirmed = window.confirm(`Delete invoice #${id}?`);
    if (confirmed) {
      onDelete(id);
      navigate("/");
    }
  };

  const handleMarkAsPaid = () => {
    onMarkAsPaid(id);
    navigate("/");
  };

  const handleEdit = () => {
    setEditOpen(true); 
  };

  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto bg-[var(--white)] text-[var(--black)]">
      <button
        onClick={() => navigate("/")}
        className="text-sm text-[#7C5DFA] underline"
      >
        ← Go Back
      </button>

      <div className="bg-[var(--background)] p-6 rounded-lg shadow space-y-6">
        {}
        <div className="flex justify-between items-center">
          <div
            className={`px-3 py-1 rounded text-sm font-semibold capitalize flex items-center gap-2
              ${
                invoice.status === "paid"
                  ? "bg-[#33D69F]/20 text-[#33D69F]"
                  : invoice.status === "pending"
                  ? "bg-[#FF8F00]/20 text-[#FF8F00]"
                  : "bg-[#DFE3FA]/20 text-[#373B53]"
              }`}
          >
            <span
              className={`w-2 h-2 rounded-full
              ${
                invoice.status === "paid"
                  ? "bg-[#33D69F]"
                  : invoice.status === "pending"
                  ? "bg-[#FF8F00]"
                  : "bg-[#373B53]"
              }`}
            ></span>
            {invoice.status}
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleEdit}
              className="px-4 py-2 rounded-md font-semibold text-sm bg-[#F9FAFE] text-[#7E88C3] hover:bg-[#DFE3FA]"
            >
              Edit
            </button>

            <button
              onClick={handleDelete}
              className="px-4 py-2 rounded-md font-semibold text-sm bg-[#EC5757] text-white hover:bg-red-600"
            >
              Delete
            </button>

            <button
              onClick={handleMarkAsPaid}
              className="px-4 py-2 rounded-md font-semibold text-sm bg-[#7C5DFA] text-white hover:bg-[#9277FF]"
            >
              Mark as Paid
            </button>
          </div>
        </div>

        {}
        <h1 className="text-xl font-bold">
          <span className="text-[#888EB0]">#</span>
          {invoice.id}
        </h1>
        <p className="text-[#7E88C3]">{invoice.description}</p>

        {}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h2 className="text-sm font-semibold">Bill From</h2>
            <p className="text-sm">{invoice.senderAddress.street}</p>
            <p className="text-sm">
              {invoice.senderAddress.city}, {invoice.senderAddress.postCode}
            </p>
            <p className="text-sm">{invoice.senderAddress.country}</p>
          </div>

          <div>
            <h2 className="text-sm font-semibold">Bill To</h2>
            <p className="text-sm">{invoice.clientName}</p>
            <p className="text-sm">{invoice.clientAddress.street}</p>
            <p className="text-sm">
              {invoice.clientAddress.city}, {invoice.clientAddress.postCode}
            </p>
            <p className="text-sm">{invoice.clientAddress.country}</p>
            <p className="text-sm mt-2">
              <strong>Email:</strong> {invoice.clientEmail}
            </p>
          </div>
        </div>

        {}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <h3 className="font-semibold">Invoice Date</h3>
            <p>{invoice.createdAt}</p>

          </div>
          <div>
            <h3 className="font-semibold">Payment Terms</h3>
            <p>{invoice.paymentTerms}</p>
          </div>
        </div>

        {}
        <div>
          <h2 className="text-sm font-semibold mb-2">Item List</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-[#DFE3FA]">
                <th className="py-1">Item</th>
                <th>Qty.</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, idx) => (
                <tr key={idx} className="border-t border-[#DFE3FA]">
                  <td className="py-1">{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>£{item.price.toFixed(2)}</td>
                  <td>£{item.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-right mt-4 font-bold text-lg bg-[#373B53] text-white p-4 rounded">
            Total: £{invoice.total.toFixed(2)}
          </div>
        </div>
      </div>

      {}
      <EditInvoice
        open={editOpen}
        onClose={() => setEditOpen(false)}
        invoice={invoice}
        setInvoices={setInvoices}
      />
    </div>
  );
}
