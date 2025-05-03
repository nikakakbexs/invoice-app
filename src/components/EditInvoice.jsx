import React, { useState, useEffect } from "react";

export default function EditInvoice({ open, onClose, invoice, setInvoices }) {
  const [form, setForm] = useState(null);

  useEffect(() => {
    if (invoice) {
      setForm({ ...invoice });
    }
  }, [invoice]);

  if (!open || !form) return null;

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddressChange = (type, field, value) => {
    setForm((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: value,
      },
    }));
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...form.items];
    updatedItems[index][field] =
      field === "name" ? value : parseFloat(value) || 0;

    if (field === "quantity" || field === "price") {
      updatedItems[index].total =
        (updatedItems[index].quantity || 0) * (updatedItems[index].price || 0);
    }

    setForm((prev) => ({
      ...prev,
      items: updatedItems,
    }));
  };

  const calculateTotal = () => {
    return form.items.reduce((sum, item) => sum + item.total, 0);
  };

  const handleSave = () => {
    const updatedInvoices = (prev) =>
      prev.map((inv) =>
        inv.id === form.id ? { ...form, total: calculateTotal() } : inv
      );

    setInvoices(updatedInvoices);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-start items-stretch pointer-events-none">
      {/* Sidebar Panel */}
      <div
        className={`bg-white w-full max-w-xl h-full p-6 overflow-y-auto shadow-2xl transform transition-transform duration-300 ease-in-out pointer-events-auto
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <h2 className="text-xl font-bold mb-6 text-[#0C0E16]">
          Edit Invoice #{form.id}
        </h2>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1 text-[#7E88C3]">
            Description
          </label>
          <input
            type="text"
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="w-full p-2 border border-gray-light rounded"
          />
        </div>

        {/* Sender Address */}
        <h3 className="text-sm font-semibold text-[#7E88C3] mt-6 mb-2">
          Sender Address
        </h3>
        {["street", "city", "postCode", "country"].map((field) => (
          <div className="mb-2" key={field}>
            <label className="block text-xs mb-1 capitalize text-gray-dark">
              {field}
            </label>
            <input
              type="text"
              value={form.senderAddress[field]}
              onChange={(e) =>
                handleAddressChange("senderAddress", field, e.target.value)
              }
              className="w-full p-2 border border-gray-light rounded"
            />
          </div>
        ))}

        {/* Client Info */}
        <h3 className="text-sm font-semibold text-[#7E88C3] mt-6 mb-2">
          Client Info
        </h3>
        <div className="mb-2">
          <label className="block text-xs mb-1">Client Name</label>
          <input
            type="text"
            value={form.clientName}
            onChange={(e) => handleChange("clientName", e.target.value)}
            className="w-full p-2 border border-gray-light rounded"
          />
        </div>
        <div className="mb-2">
          <label className="block text-xs mb-1">Client Email</label>
          <input
            type="email"
            value={form.clientEmail}
            onChange={(e) => handleChange("clientEmail", e.target.value)}
            className="w-full p-2 border border-gray-light rounded"
          />
        </div>

        {/* Client Address */}
        {["street", "city", "postCode", "country"].map((field) => (
          <div className="mb-2" key={field}>
            <label className="block text-xs mb-1 capitalize">
              Client {field}
            </label>
            <input
              type="text"
              value={form.clientAddress[field]}
              onChange={(e) =>
                handleAddressChange("clientAddress", field, e.target.value)
              }
              className="w-full p-2 border border-gray-light rounded"
            />
          </div>
        ))}

        {/* Payment Terms */}
        <div className="mt-4 mb-4">
          <label className="block text-sm font-semibold mb-1 text-[#7E88C3]">
            Payment Terms
          </label>
          <input
            type="number"
            value={form.paymentTerms}
            onChange={(e) =>
              handleChange("paymentTerms", parseInt(e.target.value))
            }
            className="w-full p-2 border border-gray-light rounded"
          />
        </div>

        {/* Items */}
        <h3 className="text-sm font-semibold mb-2 text-[#7E88C3]">Items</h3>
        {form.items.map((item, idx) => (
          <div
            key={idx}
            className="grid grid-cols-4 gap-2 items-end mb-3 border-b pb-2"
          >
            <input
              type="text"
              placeholder="Item Name"
              value={item.name}
              onChange={(e) => handleItemChange(idx, "name", e.target.value)}
              className="col-span-2 p-2 border border-gray-light rounded"
            />
            <input
              type="number"
              placeholder="Qty"
              value={item.quantity}
              onChange={(e) =>
                handleItemChange(idx, "quantity", e.target.value)
              }
              className="p-2 border border-gray-light rounded"
            />
            <input
              type="number"
              placeholder="Price"
              value={item.price}
              onChange={(e) => handleItemChange(idx, "price", e.target.value)}
              className="p-2 border border-gray-light rounded"
            />
          </div>
        ))}

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-[#DFE3FA] text-[#7E88C3] hover:bg-[#C5CAE9]"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-md bg-[#7C5DFA] text-white hover:bg-[#9277FF]"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
