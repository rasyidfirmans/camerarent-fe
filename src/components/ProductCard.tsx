"use client";

import Image from "next/image";

type ProductCardProps = {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
  type: "available" | "not-available";
};

const ProductCard = (props: ProductCardProps) => {
  const { product, type } = props;
  return (
    <div
      data-type={type}
      className="flex flex-col justify-between bg-white border border-blue-light rounded-lg p-4 w-50 h-65 cursor-pointer"
    >
      <Image
        src={product.image}
        alt={product.name}
        width={200}
        height={200}
        className="w-auto h-auto border-2 border-blue rounded-lg"
      />
      <div className="flex flex-col spacing-2">
        <h2 className="text-blue font-bold text-xl">{product.name}</h2>
        <p className="text-gray-500 text-xs">Rp. {product.price}/Day</p>
      </div>
    </div>
  );
};

export default ProductCard;
