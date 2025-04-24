import React from "react";
import "./App.css";
import Header from "./components/Header";
import InvoiceHeader from "./components/InvoiceHeader";

export default function App() {
  return (
    <div className="lg:flex ">
      <Header />
      <div className="flex-1 p-5">
        <InvoiceHeader />
      </div>
    </div>
  );
}
