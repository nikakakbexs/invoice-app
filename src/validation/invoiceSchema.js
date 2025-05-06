import * as Yup from "yup";

export const invoiceSchema = Yup.object().shape({

  fromStreet: Yup.string().required("Street address is required"),
  fromCity: Yup.string().required("City is required"),
  fromPostCode: Yup.string().required("Post code is required"),
  fromCountry: Yup.string().required("Country is required"),


  toName: Yup.string().required("Client name is required"),
  toEmail: Yup.string()
    .email("Invalid email format")
    .required("Client email is required"),
  toStreet: Yup.string().required("Street address is required"),
  toCity: Yup.string().required("City is required"),
  toPostCode: Yup.string().required("Post code is required"),
  toCountry: Yup.string().required("Country is required"),

  
  invoiceDate: Yup.date()
    .required("Invoice date is required")
    .typeError("Please enter a valid date")
    .min(new Date(), "Date cannot be in the past"), 
  paymentTerms: Yup.string().required("Payment terms are required"),
  projectDescription: Yup.string().required("Project description is required"),

  items: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required("Item name is required"),
        qty: Yup.number()
          .typeError("Quantity must be a number")
          .positive("Quantity must be positive")
          .required("Quantity is required"),
        price: Yup.number()
          .typeError("Price must be a number")
          .positive("Price must be positive")
          .required("Price is required"),
        total: Yup.number(),
      })
    )
    .min(1, "At least one item is required"),
});
