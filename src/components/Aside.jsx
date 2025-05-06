import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { invoiceSchema } from "../validation/invoiceSchema";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

export default function Aside({ open, onClose, onAddInvoice }) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    reset,
  } = useForm({
    resolver: yupResolver(invoiceSchema),
    defaultValues: {
      items: [{ id: 1, name: "", qty: 1, price: 0, total: 0 }],
    },
  });

  const [items, setItems] = useState([
    { id: 1, name: "", qty: 1, price: 0, total: 0 },
  ]);

  const addNewItem = () => {
    const newItem = { id: Date.now(), name: "", qty: 1, price: 0, total: 0 };
    setItems([...items, newItem]);
    const currentItems = getValues("items") || [];
    setValue("items", [...currentItems, newItem]);
  };

  const deleteItem = (id) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
      const currentItems = getValues("items").filter((item) => item.id !== id);
      setValue("items", currentItems);
    }
  };

  const updateItem = (id, field, value) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        if (field === "qty" || field === "price") {
          updatedItem.total = Number(
            (updatedItem.qty * updatedItem.price).toFixed(2)
          );
        }
        return updatedItem;
      }
      return item;
    });

    setItems(updatedItems);
    setValue("items", updatedItems);
  };

  const generateInvoiceId = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    let result = "";

    for (let i = 0; i < 2; i++) {
      result += letters.charAt(Math.floor(Math.random() * letters.length));
    }

    for (let i = 0; i < 4; i++) {
      result += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }

    return result;
  };

  const calculatePaymentDue = (date, terms) => {
    const dueDate = new Date(date);
    dueDate.setDate(dueDate.getDate() + Number(terms));
    return dueDate.toISOString().split("T")[0];
  };

  const onSubmit = (data) => {
    const newInvoice = {
      id: generateInvoiceId(),
      createdAt: new Date(data.invoiceDate).toISOString().split("T")[0],
      paymentDue: calculatePaymentDue(data.invoiceDate, data.paymentTerms),
      description: data.projectDescription,
      paymentTerms: Number(data.paymentTerms),
      clientName: data.toName,
      clientEmail: data.toEmail,
      status: "pending",
      senderAddress: {
        street: data.fromStreet,
        city: data.fromCity,
        postCode: data.fromPostCode,
        country: data.fromCountry,
      },
      clientAddress: {
        street: data.toStreet,
        city: data.toCity,
        postCode: data.toPostCode,
        country: data.toCountry,
      },
      items: items.map((item) => ({
        name: item.name,
        quantity: Number(item.qty),
        price: Number(item.price),
        total: Number(item.total),
      })),
      total: parseFloat(
        items.reduce((sum, item) => sum + Number(item.total), 0).toFixed(2)
      ),
    };

    onAddInvoice(newInvoice);
    onClose();
    navigate("/");
  };

  const saveAsDraft = () => {
    const formData = getValues();
    const draftInvoice = {
      id: generateInvoiceId(),
      createdAt: new Date().toISOString().split("T")[0],
      paymentDue: calculatePaymentDue(
        formData.invoiceDate || new Date().toISOString().split("T")[0],
        formData.paymentTerms || 1
      ),
      description: formData.projectDescription || "",
      paymentTerms: Number(formData.paymentTerms) || 1,
      clientName: formData.toName || "",
      clientEmail: formData.toEmail || "",
      status: "draft",
      senderAddress: {
        street: formData.fromStreet || "",
        city: formData.fromCity || "",
        postCode: formData.fromPostCode || "",
        country: formData.fromCountry || "",
      },
      clientAddress: {
        street: formData.toStreet || "",
        city: formData.toCity || "",
        postCode: formData.toPostCode || "",
        country: formData.toCountry || "",
      },
      items: items.map((item) => ({
        name: item.name || "",
        quantity: Number(item.qty || 0),
        price: Number(item.price || 0),
        total: Number((item.qty * item.price).toFixed(2)) || 0,
      })),
      total: Number(
        items.reduce((sum, item) => sum + item.qty * item.price, 0).toFixed(2)
      ),
    };

    console.log("Draft Invoice:", draftInvoice);
    onAddInvoice(draftInvoice);
    onClose();
    navigate("/");
  };

  const handleDiscard = () => {
    reset();
    setItems([{ id: 1, name: "", qty: 1, price: 0, total: 0 }]);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <aside
        className={`lg:rounded-r-3xl md:rounded-r-3xl fixed z-20
        top-[72px] bottom-0          
        left-0 w-full pb-6              
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

          <div>
            <p className="text-[var(--gray)] mt-5 text-xs">Street Address</p>
            <Input
              {...register("fromStreet")}
              className={errors.fromStreet ? "border-[var(--red-700)]" : ""}
            />
            {errors.fromStreet && (
              <p className="text-[var(--red-700)] text-xs">
                {errors.fromStreet.message}
              </p>
            )}
          </div>

          <div className="flex gap-4 mt-4">
            <div className="flex-1">
              <p className="text-[var(--gray)]">City</p>
              <Input
                {...register("fromCity")}
                className={errors.fromCity ? "border-[var(--red-700)]" : ""}
              />
              {errors.fromCity && (
                <p className="text-[var(--red-700)] text-xs">
                  {errors.fromCity.message}
                </p>
              )}
            </div>
            <div className="flex-1">
              <p className="text-[var(--gray)]">Post Code</p>
              <Input
                {...register("fromPostCode")}
                className={errors.fromPostCode ? "border-[var(--red-700)]" : ""}
              />
              {errors.fromPostCode && (
                <p className="text-[var(--red-700)] text-xs">
                  {errors.fromPostCode.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <p className="text-[var(--gray)] mt-4">Country</p>
            <Input
              {...register("fromCountry")}
              className={errors.fromCountry ? "border-[var(--red-700)]" : ""}
            />
            {errors.fromCountry && (
              <p className="text-[var(--red-700)] text-xs">
                {errors.fromCountry.message}
              </p>
            )}
          </div>

          <p className="text-[var(--purple-500)] font-bold mt-5">Bill To</p>

          <div>
            <p className="text-[var(--gray)] mt-4">Client's Name</p>
            <Input
              {...register("toName")}
              className={errors.toName ? "border-[var(--red-700)]" : ""}
            />
            {errors.toName && (
              <p className="text-[var(--red-700)] text-xs">
                {errors.toName.message}
              </p>
            )}
          </div>

          <div>
            <p className="text-[var(--gray)] mt-4">Client's Email</p>
            <Input
              {...register("toEmail")}
              className={errors.toEmail ? "border-[var(--red-700)]" : ""}
            />
            {errors.toEmail && (
              <p className="text-[var(--red-700)] text-xs">
                {errors.toEmail.message}
              </p>
            )}
          </div>

          <div>
            <p className="text-[var(--gray)] mt-4">Street Address</p>
            <Input
              {...register("toStreet")}
              className={errors.toStreet ? "border-[var(--red-700)]" : ""}
            />
            {errors.toStreet && (
              <p className="text-[var(--red-700)] text-xs">
                {errors.toStreet.message}
              </p>
            )}
          </div>

          <div className="flex gap-4 mt-4">
            <div className="flex-1">
              <p className="text-[var(--gray)]">City</p>
              <Input
                {...register("toCity")}
                className={errors.toCity ? "border-[var(--red-700)]" : ""}
              />
              {errors.toCity && (
                <p className="text-[var(--red-700)] text-xs">
                  {errors.toCity.message}
                </p>
              )}
            </div>
            <div className="flex-1">
              <p className="text-[var(--gray)]">Post Code</p>
              <Input
                {...register("toPostCode")}
                className={errors.toPostCode ? "border-[var(--red-700)]" : ""}
              />
              {errors.toPostCode && (
                <p className="text-[var(--red-700)] text-xs">
                  {errors.toPostCode.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <p className="text-[var(--gray)] mt-4">Country</p>
            <Input
              {...register("toCountry")}
              className={errors.toCountry ? "border-[var(--red-700)]" : ""}
            />
            {errors.toCountry && (
              <p className="text-[var(--red-700)] text-xs">
                {errors.toCountry.message}
              </p>
            )}
          </div>
          <div>
            <p className="text-[var(--gray)] mt-5">Invoice Date</p>
            <Input
              type="date"
              {...register("invoiceDate")}
              className={errors.invoiceDate ? "border-[var(--red-700)]" : ""}
            />
            {errors.invoiceDate && (
              <p className="text-[var(--red-700)] text-xs">
                {errors.invoiceDate.message}
              </p>
            )}
          </div>

          <div>
            <p className="text-[var(--gray)] mt-4 ">Payment Terms</p>
            <select
              className="text-[var(--purple-500)] mt-3"
              id="category"
              {...register("paymentTerms")}
            >
              <option value="">Select one</option>
              <option value="7">7d</option>
              <option value="15">15d</option>
              <option value="30">30</option>
                    
            </select>
            {errors.paymentTerms && (
              <p className="text-[var(--red-700)] text-xs">
                {errors.paymentTerms.message}
              </p>
            )}
          </div>

          <div>
            <p className="text-[var(--gray)] mt-4">Project Description</p>
            <Input
              {...register("projectDescription")}
              className={
                errors.projectDescription ? "border-[var(--red-700)]" : ""
              }
            />
            {errors.projectDescription && (
              <p className="text-[var(--red-700)] text-xs">
                {errors.projectDescription.message}
              </p>
            )}
          </div>
          <p className="text-[var(--gray)] mt-6 font-bold text-xl">Item List</p>
          {errors.items && (
            <p className="text-[var(--red-700)] text-xs">
              {errors.items.message}
            </p>
          )}

          {items.map((item, index) => (
            <div key={item.id}>
              <p className="text-[var(--gray)] mt-4">Item Name</p>
              <Input
                value={item.name}
                onChange={(e) => updateItem(item.id, "name", e.target.value)}
                className={
                  errors.items?.[index]?.name ? "border-[var(--red-700)]" : ""
                }
              />
              {errors.items?.[index]?.name && (
                <p className="text-[var(--red-700)] text-xs">
                  {errors.items[index].name.message}
                </p>
              )}

              <div className="flex items-center gap-2 mt-4">
                <div className="flex flex-col">
                  <p className="text-[var(--gray)]">Qty.</p>
                  <Input
                    type="text"
                    value={item.qty}
                    onChange={(e) =>
                      updateItem(item.id, "qty", Number(e.target.value))
                    }
                    className={
                      errors.items?.[index]?.qty
                        ? "border-[var(--red-700)]"
                        : ""
                    }
                  />
                  {errors.items?.[index]?.qty && (
                    <p className="text-[var(--red-700)] text-xs">
                      {errors.items[index].qty.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col">
                  <p className="text-[var(--gray)]">Price</p>
                  <Input
                    type="text"
                    value={item.price}
                    onChange={(e) =>
                      updateItem(item.id, "price", Number(e.target.value))
                    }
                    className={
                      errors.items?.[index]?.price
                        ? "border-[var(--red-700)]"
                        : ""
                    }
                  />
                  {errors.items?.[index]?.price && (
                    <p className="text-[var(--red-700)] text-xs absolute mt-20">
                      {errors.items[index].price.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col">
                  <p className="text-[var(--gray)]">Total</p>
                  <Input
                    disabled
                    className="bg-none border-none w-[100px] text-[var(--gray)] !pl-0"
                    type="text"
                    value={item.total}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => deleteItem(item.id)}
                  className="mt-8"
                >
                  <img
                    src="./assets/bin.svg"
                    alt="Delete item"
                    className="w-7 h-7"
                  />
                </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addNewItem}
            className="w-full mt-8 text-[var(--gray)] bg-[var(--background)] p-3.5 rounded-xl"
          >
            Add new item
          </button>
          <Footer
            onDiscard={handleDiscard}
            onSaveDraft={saveAsDraft}
            onSubmit={handleSubmit(onSubmit)}
          />
        </div>
      </aside>
    </form>
  );
}
