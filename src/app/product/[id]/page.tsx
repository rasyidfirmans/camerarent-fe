"use client";

import Image from "next/image";
import { use } from "react";
import { useState } from "react";
import Button from "@/components/Button";

const ProductPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const product = {
    id: id,
    name: "Sample Product",
    price: 100000,
    image: "/images/test-foto.jpg",
    stock: 20,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consectetur, nunc at commodo facilisis, enim erat facilisis ligula, nec tincidunt nisi nisl euismod nisi. Donec vel consectetur est. Nullam in quam ac leo aliquet facilisis.",
  };
  const [quantity, setQuantity] = useState(1);
  const type = product.stock > 0 ? "available" : "not-available";

  return (
    <div
      data-type={type}
      className="flex flex-row justify-between mx-16 mt-24 h-screen min-h-screen"
    >
      <div className="product-image w-1/4 h-fit ">
        <Image
          src={product.image}
          alt={product.name}
          width={500}
          height={500}
          className={`w-full h-auto border-4 border-primary-blue rounded-lg ${
            type === "not-available" ? "grayscale" : ""
          }`}
        />
      </div>
      <div className="product-detail flex flex-col space-y-12 w-1/2 mx-8">
        <div>
          <h1 className="product-name text-4xl text-primary-blue font-bold">
            {product.name}
          </h1>
          <h2 className="text-xl font-normal text-gray-400">
            Rent from{" "}
            <span className="product-price font-medium text-primary-yellow">
              Rp. {product.price}
            </span>{" "}
            /Day
          </h2>
        </div>
        <div>
          <h4 className="text-m font-medium text-primary-yellow border-b-2 border-primary-yellow my-2">
            Description
          </h4>
          <p className="description text-gray-500 text-sm text-justify">
            {product.description}
          </p>
        </div>
      </div>
      <div className="add-to-cart p-4 rounded-md border border-primary-blue bg-white w-1/4 h-fit">
        <form action="submit" className="flex flex-col space-y-2">
          <h3 className="text-xl font-bold text-primary-yellow">
            Set Date and Quantity
          </h3>
          <div className="flex flex-col space-y-2 border-b-1 border-primary-blue pb-4">
            <div className="start-date flex flex-row justify-between items-center">
              <label htmlFor="start-date" className="text-sm text-gray-500">
                Start Date
              </label>
              <input
                type="date"
                id="start-date"
                name="start-date"
                className="w-1/2 border border-primary-yellow text-primary-yellow rounded-md text-sm px-2 py-1"
              />
            </div>
            <div className="end-date flex flex-row justify-between items-center">
              <label htmlFor="end-date" className="text-sm text-gray-500">
                End Date
              </label>
              <input
                type="date"
                id="end-date"
                name="end-date"
                className="w-1/2 border border-primary-yellow text-primary-yellow rounded-md text-sm px-2 py-1"
              />
            </div>
          </div>
          <div className="flex flex-row justify-between items-center">
            <h4 className="text-sm text-gray-500">Stock</h4>
            <h4 className="text-sm text-primary-blue">{product.stock}</h4>
          </div>
          <div className="flex flex-row justify-between items-center">
            <h4 className="text-sm text-gray-500">Quantity</h4>
            <div className="flex flex-row justify-center items-center space-x-2 rounded-2xl border border-primary-blue">
              <button
                type="button"
                className="px-2 py-1 text-primary-blue"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12h12"
                  />
                </svg>
              </button>
              <span className="text-sm text-primary-blue text-center w-4">
                {quantity}
              </span>
              <button
                type="button"
                className="px-2 py-1 text-primary-blue"
                onClick={() =>
                  setQuantity((q: number) => Math.min(product.stock, q + 1))
                }
                disabled={quantity >= product.stock}
                aria-label="Increase quantity"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m6-6H6"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex flex-row justify-between items-center border-b border-primary-blue pb-2">
            <h4 className="text-sm text-gray-500">Total</h4>
            <h4 className="text-md text-primary-blue font-bold">
              Rp. {product.price * quantity},-
            </h4>
          </div>
          <div>
            <Button
              type="submit"
              variant="bg-primary-blue w-full h-11 text-white rounded-lg font-bold border-2 border-primary-blue hover:border-secondary-blue hover:bg-secondary-blue"
            >
              Add to Cart
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductPage;
