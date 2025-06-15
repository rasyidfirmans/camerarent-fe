"use client";

import { useState } from "react";

import Button from "../../Button";
import { Plus, Camera, Aperture, Grid2X2 } from "lucide-react";

const categoryNavigation = [
  {
    id: 1,
    stock: 100,
    catecory: "Camera",
  },
  {
    id: 2,
    stock: 50,
    catecory: "Lens",
  },
  {
    id: 3,
    stock: 75,
    catecory: "Accessories",
  },
];

const productNavigation = [
  {
    id: 1,
    name: "All Products",
  },
  {
    id: 2,
    name: "Available",
  },
  {
    id: 3,
    name: "Not Available",
  },
];

const Header = () => {
  const [activeNav, setActiveNav] = useState(productNavigation[0].id);
  const [isFocused, setIsFocused] = useState(0);
  return (
    <>
      <section className="w-full flex flex-col gap-y-4 bg-white rounded-xl">
        <div>
          <h1 className="text-md sm:text-lg md:text-xl font-bold text-secondary-blue">
            Product Dashboard
          </h1>
        </div>
        <div className="w-full h-full flex flex-col items-center justify-center sm:flex-row gap-4">
          {categoryNavigation.map((item, index) => (
            <Button
              key={index}
              type="button"
              variant={`product-overview w-full flex flex-row items-center justify-between gap-2 p-4 bg-white rounded-xl shadow-md transition-all duration-200 ${
                isFocused === item.id
                  ? "border-3 border-primary-yellow"
                  : "border-3 border-transparent"
              }`}
              onClick={() =>
                isFocused === item.id ? setIsFocused(0) : setIsFocused(item.id)
              }
            >
              <span>
                {item.catecory === "Camera" && (
                  <Camera className="h-15 w-15 text-primary-yellow " />
                )}
                {item.catecory === "Lens" && (
                  <Aperture className="h-15 w-15 text-primary-yellow" />
                )}
                {item.catecory === "Accessories" && (
                  <Grid2X2 className="h-15 w-15 text-primary-yellow" />
                )}
              </span>
              <div className="flex flex-col item-center justify-center">
                <h1 className="stock text-4xl text-center text-primary-yellow font-bold">
                  {item.stock}
                </h1>
                <h4 className="category text-md text-center text-black font-medium">
                  {item.catecory}
                </h4>
              </div>
            </Button>
          ))}
        </div>
        <div className="w-full h-0.5 bg-slate-200"></div>
        <div className="w-full flex items-center justify-between">
          <ul className="flex items-center gap-x-5 sm:gap-x-8">
            {productNavigation.map((item, index) => (
              <li
                key={index}
                className={`relative ${
                  activeNav === item.id
                    ? "text-primary-yellow"
                    : "text-secondary-blue hover:text-secondary-blue/50"
                } text-sm font-semibold cursor-pointer transition-all duration-200 ease-in-out`}
                onClick={() => setActiveNav(item.id)}
              >
                {item.name}
                <div
                  className={`absolute left-0 -bottom-2 h-0.5 bg-primary-yellow transition-all duration-300 ease-in-out ${
                    activeNav === item.id ? "w-full" : "w-0"
                  }`}
                ></div>
              </li>
            ))}
          </ul>
          <Button
            type="button"
            variant="h-11 bg-primary-blue hover:border-secondary-blue items-center justify-center text-white font-semibold text-sm px-4 py-6 rounded-xl flex gap-x-2"
            onClick={() => {
              /* handle add new product */
            }}
          >
            <Plus />
            <p>Add New Product</p>
          </Button>
        </div>
      </section>
    </>
  );
};

export default Header;
