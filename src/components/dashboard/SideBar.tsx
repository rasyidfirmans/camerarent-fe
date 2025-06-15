"use client";
import { useState } from "react";
import Button from "../Button";
import { Truck, Box } from "lucide-react";

const adminnavigation = [
  {
    id: 1,
    name: "Products",
  },
  {
    id: 2,
    name: "Orders",
  },
];

const SideBar = () => {
  const [activeNav, setActiveNav] = useState(adminnavigation[0].id);

  return (
    <nav className="w-full h-full flex flex-col gap-5 bg-white rounded-xl p-5">
      <div className="text-xl font-bold mb-2 text-primary-blue border-b-2 border-gray-200 pb-2">
        <h1>Admin Panel</h1>
      </div>
      <ul className="w-full h-full flex flex-col gap-2">
        {adminnavigation.map((nav) => (
          <li key={nav.id}>
            <Button
              type="button"
              variant={`w-full text-left px-2 py-2 font-medium border-3 rounded ${
                activeNav === nav.id
                  ? "bg-primary-blue text-white border-transparent hover:bg-secondary-blue"
                  : "bg-white text-primary-blue border-primary-blue hover:bg-gray-100"
              }`}
              onClick={() => setActiveNav(nav.id)}
            >
              {nav.id === 1 ? (
                <Box className="inline mr-2" />
              ) : (
                <Truck className="inline mr-2" />
              )}
              {nav.name}
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SideBar;
