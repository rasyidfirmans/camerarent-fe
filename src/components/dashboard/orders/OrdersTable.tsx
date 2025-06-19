"use client";
import React, { useState } from "react";
import OrderDetail from "./OrderDetail";
import Button from "../../Button";

// Define the Product and TransactionData types for dummy data and popup state
export type Product = {
  product: {
    name: string;
    image: string;
    price: number;
    amount: number;
  };
};

export type TransactionData = {
  transactionId: string;
  transactionDate: string;
  rentStartDate: string;
  rentEndDate: string;
  deliveryOptions: string;
  productlist: Product[];
  note: string;
  paymentMethod: string;
  totalPrice: number;
  discount: number;
  deliveryFee: number;
  transactionStatus: "Accepted" | "Pending" | "Rejected" | "Completed";
  proofOfPayment: string;
};

const dummyData: TransactionData[] = [
  {
    transactionId: "INV12345",
    transactionDate: "2023-10-01",
    rentStartDate: "2023-10-02",
    rentEndDate: "2023-10-05",
    deliveryOptions: "Pickup at Store",
    productlist: [
      {
        product: {
          name: "Canon EOS 5D Mark IV",
          image: "/images/product_details/dummy_camera.png",
          price: 350000,
          amount: 2,
        },
      },
      {
        product: {
          name: "Nikon D850",
          image: "/images/product_details/dummy_camera.png",
          price: 300000,
          amount: 1,
        },
      },
      {
        product: {
          name: "Fujifilm X-T4",
          image: "/images/product_details/dummy_camera.png",
          price: 250000,
          amount: 1,
        },
      },
    ],
    note: "Handle with care.",
    paymentMethod: "Bank Transfer",
    totalPrice: 1600000,
    discount: 0.1,
    deliveryFee: 0,
    transactionStatus: "Accepted",
    proofOfPayment: "/images/test-foto.png",
  },
  {
    transactionId: "INV12346",
    transactionDate: "2023-10-02",
    rentStartDate: "2023-10-03",
    rentEndDate: "2023-10-06",
    deliveryOptions: "Pickup at Store",
    productlist: [
      {
        product: {
          name: "Sony A7 III",
          image: "/images/product_details/dummy_camera.png",
          price: 400000,
          amount: 1,
        },
      },
      {
        product: {
          name: "Panasonic Lumix GH5",
          image: "/images/product_details/dummy_camera.png",
          price: 200000,
          amount: 2,
        },
      },
    ],
    note: "No scratches.",
    paymentMethod: "Bank Transfer",
    totalPrice: 800000,
    discount: 0,
    deliveryFee: 0,
    transactionStatus: "Pending",
    proofOfPayment: "/images/test-foto.png",
  },
];

const OrdersTable = () => {
  const [selected, setSelected] = useState<TransactionData | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (data: TransactionData) => {
    setSelected(data);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelected(null);
  };

  return (
    <>
      <table className="w-[55rem] sm:w-[65rem] md:w-[70rem] xl:w-full h-[85%] text-left text-sm md:text-base table-auto min-w-max border-collapse rounded-xl">
        <thead className="w-full block rounded-t-xl bg-primary-blue/5">
          <tr className="w-full flex items-start p-3 md:p-5">
            <th className="w-[30%]">Product</th>
            <th className="w-[15%]">Date</th>
            <th className="w-[20%]">Invoice ID</th>
            <th className="w-[15%]">Total</th>
            <th className="w-[10%]">Status</th>
            <th className="w-[10%] text-right">Action</th>
          </tr>
        </thead>
        <tbody className="block h-full overflow-y-auto">
          {dummyData.map((data, index) => (
            <React.Fragment key={index}>
              <tr className="flex items-center w-full px-3 py-1 md:px-5 md:py-3">
                <td className="w-[30%]">{data.productlist[0].product.name}</td>
                <td className="w-[15%]">{data.transactionDate}</td>
                <td className="w-[20%]">{data.transactionId}</td>
                <td className="w-[15%]">
                  {data.totalPrice.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  })}
                </td>
                <td
                  className={`w-[10%] font-semibold ${
                    data.transactionStatus === "Accepted"
                      ? "text-sky-500"
                      : data.transactionStatus === "Pending"
                      ? "text-yellow-500"
                      : data.transactionStatus === "Rejected"
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {data.transactionStatus}
                </td>
                <td className="w-[10%] text-right">
                  <Button
                    type="button"
                    variant="text-white bg-secondary-yellow hover:bg-primary-yellow active:bg-primary-yellow py-2 px-3 rounded-lg cursor-pointer transition-all duration-200 ease-in-out"
                    onClick={() => handleOpen(data)}
                  >
                    Details
                  </Button>
                </td>
              </tr>
              {dummyData.length - 1 !== index && (
                <tr className="block w-full h-0.25 sm:h-0.5 bg-slate-200"></tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      {selected && (
        <OrderDetail {...selected} isOpen={isOpen} onClose={handleClose} />
      )}
    </>
  );
};

export default OrdersTable;
