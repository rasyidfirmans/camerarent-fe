"use client";

import React from "react";
import Image from "next/image";
import Button from "../../Button";
import { Trash2, SquarePen } from "lucide-react";

const productDummy = [
  {
    id: 1,
    name: "Product A",
    category: "Category 1",
    description: "Description for Product A",
    stock: 10,
    image: "/images/test-foto.jpg",
    price: 100000,
  },
  {
    id: 2,
    name: "Product B",
    category: "Category 2",
    description: "Description for Product B",
    stock: 5,
    image: "/images/test-foto.jpg",
    price: 200000,
  },
  {
    id: 3,
    name: "Product C",
    category: "Category 3",
    description: "Description for Product C",
    stock: 0,
    image: "/images/test-foto.jpg",
    price: 150000,
  },
  {
    id: 4,
    name: "Product D",
    category: "Category 1",
    description: "Description for Product D",
    stock: 8,
    image: "/images/test-foto.jpg",
    price: 120000,
  },
  {
    id: 5,
    name: "Product E",
    category: "Category 2",
    description: "Description for Product E",
    stock: 3,
    image: "/images/test-foto.jpg",
    price: 180000,
  },
  {
    id: 6,
    name: "Product F",
    category: "Category 3",
    description: "Description for Product F",
    stock: 0,
    image: "/images/test-foto.jpg",
    price: 220000,
  },
  {
    id: 7,
    name: "Product G",
    category: "Category 1",
    description: "Description for Product G",
    stock: 12,
    image: "/images/test-foto.jpg",
    price: 130000,
  },
  {
    id: 8,
    name: "Product H",
    category: "Category 2",
    description: "Description for Product H",
    stock: 6,
    image: "/images/test-foto.jpg",
    price: 160000,
  },
  {
    id: 9,
    name: "Product I",
    category: "Category 3",
    description: "Description for Product I",
    stock: 4,
    image: "/images/test-foto.jpg",
    price: 140000,
  },
  {
    id: 10,
    name: "Product J",
    category: "Category 1",
    description: "Description for Product J",
    stock: 2,
    image: "/images/test-foto.jpg",
    price: 170000,
  },
];

const ProductTable = () => {
  return (
    <table className="w-[55rem] sm:w-[65rem] md:w-[70rem] xl:w-full h-[85%] text-left text-sm md:text-base table-auto min-w-max border-collapse rounded-xl">
      <thead className="w-full block rounded-t-xl bg-primary-blue/5">
        <tr className="w-full flex items-center p-3 md:p-5">
          <th className="w-[10%]">Image</th>
          <th className="w-[20%]">Product</th>
          <th className="w-[10%]">Category</th>
          <th className="w-[10%]">Price</th>
          <th className="w-[10%] text-center">Stock</th>
          <th className="w-[25%]">Description</th>
          <th className="w-[10%] text-center">Action</th>
        </tr>
      </thead>
      <tbody className="block h-full overflow-y-auto">
        {productDummy.map((data, index) => (
          <React.Fragment key={index}>
            <tr className="flex items-center w-full px-3 py-1 md:px-5 md:py-3">
              <td className="w-[10%]">
                <Image
                  src={data.image}
                  alt={data.name}
                  width={64}
                  height={64}
                  className={`w-16 h-16 object-cover rounded ${
                    data.stock === 0 ? "grayscale" : ""
                  }`}
                />
              </td>
              <td className="w-[20%]">{data.name}</td>
              <td className="w-[10%]">{data.category}</td>
              <td className="w-[10%]">
                {data.price.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                })}
              </td>
              <td
                className={`w-[10%] text-center font-semibold ${
                  data.stock === 0 ? "text-red-500" : "text-green-600"
                }`}
              >
                {data.stock}
              </td>
              <td className="w-[25%]">{data.description}</td>
              <td className="w-[12%] text-right">
                <div className="flex rounded items-center justify-center">
                  <Button
                    type="button"
                    onClick={() => {}}
                    variant="flex w-1/2 item-center justify-center bg-yellow-400 rounded-l-lg hover:bg-yellow-500 text-white gap-2 p-2"
                  >
                    <SquarePen />
                    <p>Edit</p>
                  </Button>
                  <Button
                    type="button"
                    onClick={() => {}}
                    variant="flex w-1/2 item-center justify-center bg-red-400 rounded-r-lg hover:bg-red-500 text-white gap-2 p-2"
                  >
                    <Trash2 />
                    <p>Delete</p>
                  </Button>
                </div>
              </td>
            </tr>
            {productDummy.length - 1 !== index && (
              <tr className="block w-full h-0.25 sm:h-0.5 bg-slate-200"></tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
