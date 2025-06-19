import React from "react";
import { createPortal } from "react-dom";
import { ScanLine, X, ReceiptText } from "lucide-react";
import Button from "../../Button";
import Image from "next/image";

type Product = {
  product: {
    name: string;
    image: string;
    price: number;
    amount: number;
  };
};

type OederDetailProps = {
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
  isOpen: boolean;
  onClose: () => void;
};

const OederDetail = (props: OederDetailProps) => {
  const {
    transactionId,
    transactionDate,
    rentStartDate,
    rentEndDate,
    deliveryOptions,
    productlist,
    note,
    paymentMethod,
    totalPrice,
    discount,
    deliveryFee,
    transactionStatus,
    isOpen,
    onClose,
  } = props;

  if (!isOpen) return null;
  if (typeof window === "undefined" || !document.body) return null;

  return createPortal(
    <div className="fixed inset-0 w-full h-full z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <section className="transaction-popup w-[60%] h-[80%] bg-white/10 backdrop-blur-md rounded-xl p-4 border border-slate-300 relative">
        <div className="w-full h-full flex flex-col gap-8 bg-white rounded-xl p-5">
          <div className="header flex justify-between items-center border-b-4 border-primary-yellow pb-2">
            <div className="flex flex-row items-center gap-4 text-2xl font-bold">
              <ScanLine className="text-primary-blue" />
              <h1 className="text-primary-yellow">Transaction Details</h1>
            </div>
            <Button
              type="button"
              variant="text-2xl text-gray-500"
              onClick={onClose}
            >
              <X />
            </Button>
          </div>
          <div className="flex flex-row gap-4 overflow-hidden">
            <div className="transaction-container flex flex-col p-2 gap-6 w-3/4 h-full overflow-y-scroll">
              <div className="transaction-status flex flex-col rounded-xl bg-white p-4 shadow-md">
                <div className="flex items-center justify-between mb-2 pb-2 border-b-2 border-primary-yellow">
                  <h2 className="font-bold">Transaction Status</h2>
                  <h2
                    className={`rounded-full px-4 text-white ${
                      transactionStatus === "Accepted"
                        ? "bg-sky-500"
                        : transactionStatus === "Pending"
                        ? "bg-yellow-500"
                        : transactionStatus === "Rejected"
                        ? "bg-red-500"
                        : "bg-green-500"
                    }`}
                  >
                    {transactionStatus}
                  </h2>
                </div>
                <div className="flex items-center justify-between pb-2 text-md">
                  <h3 className="text-gray-600">Transaction ID</h3>
                  <p className="">{transactionId}</p>
                </div>
                <div className="flex items-center justify-between pb-2 text-md">
                  <h3 className="text-gray-600">Transaction Date</h3>
                  <p className="">{transactionDate}</p>
                </div>
                <div className="flex items-center justify-between pb-2 text-md">
                  <h3 className="text-gray-600">Rent Period</h3>
                  <p className="">
                    {rentStartDate} to {rentEndDate}
                  </p>
                </div>
                <div className="flex items-center justify-between pb-2 text-md">
                  <h3 className="text-gray-600">Delivery</h3>
                  <p className="">{deliveryOptions}</p>
                </div>
              </div>
              <div className="product-detail flex flex-col rounded-xl bg-white p-4 shadow-md">
                <div className="flex items-center justify-between mb-2 pb-2 border-b-2 border-primary-yellow">
                  <h2 className="font-bold">Product Detail</h2>
                </div>
                <div className="flex flex-col gap-2">
                  {productlist.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center p-2 text-md gap-4 rounded-xl shadow-md"
                    >
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        width={75}
                        height={75}
                        className="rounded-md"
                      />
                      <div>
                        <h3 className="text-primary-blue font-bold text-xl">
                          {item.product.name}
                        </h3>
                        <p className="text-xs text-gray-600">
                          {item.product.amount} x{" "}
                          {item.product.price.toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="note flex flex-col rounded-xl bg-white p-4 shadow-md">
                <div className="flex items-center justify-between mb-2 pb-2 border-b-2 border-primary-yellow">
                  <h2 className="font-bold">Note</h2>
                </div>
                <p className="text-gray-600 mt-2">{note}</p>
              </div>
              <div className="payment flex flex-col rounded-xl bg-white p-4 shadow-md">
                <div className="flex items-center justify-between mb-2 pb-2 border-b-2 border-primary-yellow">
                  <h2 className="font-bold">Payment</h2>
                </div>
                <div className="flex items-center justify-between pb-2 text-md">
                  <h3 className="text-gray-600">Payment Method</h3>
                  <p className="">{paymentMethod}</p>
                </div>
                <div className="flex items-center justify-between pb-2 text-md">
                  <h3 className="text-gray-600">Subtotal Product Price</h3>
                  <p className="">
                    {totalPrice.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </p>
                </div>
                <div className="flex items-center justify-between pb-2 text-md">
                  <h3 className="text-gray-600">Discount</h3>
                  <p className="text-red-600">
                    -
                    {(totalPrice * discount).toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </p>
                </div>
                <div className="flex items-center justify-between pb-2 text-md">
                  <h3 className="text-gray-600">Delivery Fee</h3>
                  <p className="">
                    {deliveryFee.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </p>
                </div>
                <div className="flex items-center justify-between py-2 text-lg font-bold mt-2 border-t-2 border-gray-600">
                  <h3 className="">Total Transaction</h3>
                  <p className="text-primary-yellow">
                    {(
                      totalPrice -
                      totalPrice * discount +
                      deliveryFee
                    ).toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </p>
                </div>
              </div>
            </div>
            <div className="button-container flex flex-col gap-2 w-1/4 h-full">
              <Button
                type="button"
                onClick={() => window.open("/images/test-foto.jpg", "_blank")}
                variant="flex flex-row items-center justify-center gap-2 bg-primary-blue text-white font-bold py-3 px-4 rounded-lg"
              >
                <ReceiptText />
                Show Payment Proof
              </Button>
              <Button
                type="button"
                variant="flex items-center justify-center bg-sky-500 p-2 rounded-lg text-white font-bold"
              >
                Accept Transaction
              </Button>
              <Button
                type="button"
                variant="flex items-center justify-center bg-green-500 p-2 rounded-lg text-white font-bold"
              >
                Complete Transaction
              </Button>
              <Button
                type="button"
                variant="flex items-center justify-center bg-red-500 p-2 rounded-lg text-white font-bold"
              >
                Reject Transaction
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>,
    document.body
  );
};

export default OederDetail;
