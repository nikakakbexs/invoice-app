import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import InvoiceHeader from "./components/InvoiceHeader";
import InvoiceDetails from "./components/InvoiceDetails";
import EditInvoice from "./components/EditInvoice";
import data from "./data"; 

export default function App() {
  const [invoices, setInvoices] = useState(data); 

  
  const handleDeleteInvoice = (id) => {
    const updatedInvoices = invoices.filter((invoice) => invoice.id !== id);
    setInvoices(updatedInvoices);
  };

 
  const handleMarkAsPaid = (id) => {
    const updatedInvoices = invoices.map((invoice) =>
      invoice.id === id ? { ...invoice, status: "paid" } : invoice
    );
    setInvoices(updatedInvoices);
  };

  
  const handleEditInvoice = (updatedInvoice) => {
    const updatedInvoices = invoices.map((invoice) =>
      invoice.id === updatedInvoice.id ? updatedInvoice : invoice
    );
    setInvoices(updatedInvoices);
  };

  return (
    <Router>
      <div className="lg:flex">
        <Header />
        <div className="flex-1 p-5">
          <Routes>
            {}
            <Route path="/" element={<InvoiceHeader invoices={invoices} />} />
            {}
            <Route
              path="/invoice/:id"
              element={
                <InvoiceDetails
                  invoices={invoices}
                  setInvoices={setInvoices}
                  onDelete={handleDeleteInvoice}
                  onMarkAsPaid={handleMarkAsPaid}
                />
              }
            />
            {}
            <Route
              path="/edit/:id"
              element={
                <EditInvoice
                  invoices={invoices}
                  setInvoices={handleEditInvoice}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}    