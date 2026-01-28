import React from "react";
import ToysCard from "../cards/OurProductsCard";
import { getProducts } from "@/actions/server/products";

const Products = async () => {
  const toys = (await getProducts()) || [];
  const formatted = toys.map((toy) => ({ ...toy, _id: toy._id.toString() }));
  return (
    <div>
      <h2 className="text-4xl text-center font-bold mb-10">
        Our <span className="text-primary">Products</span>
      </h2>
      <div className="grid grid-cols-3 gap-5">
        {formatted.map((toy, index) => (
          <div key={index}>
            <ToysCard toy={toy}></ToysCard>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
