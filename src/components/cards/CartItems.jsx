"use client";
import Image from "next/image";
import React from "react";
import { HiOutlineMinus, HiOutlinePlus, HiOutlineTrash } from "react-icons/hi";

const CartItems = ({ item }) => {
  const { title, image, quantity, price, _id } = item;

  const handleDeleteItem = () => {
    alert(_id);
  };

  return (
    <div>
      <div className="card card-side bg-base-100 shadow-xl border border-base-200 p-4 flex flex-col sm:flex-row items-center gap-4 my-5">
        {/* Product Image */}
        <figure className="w-24 h-24 shrink-0">
          <Image alt={title} src={image} width={300} height={300}></Image>
        </figure>

        <div className="flex flex-col sm:flex-row justify-between w-full items-center gap-4">
          {/* Title and Price */}
          <div className="text-center sm:text-left flex-1">
            <h2 className="card-title text-base md:text-lg mb-1">{title}</h2>
            <p className="text-primary font-bold text-lg">৳{price}</p>
          </div>

          {/* Quantity Controls & Delete Button */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 bg-base-200 p-1 rounded-lg">
              {/* Minus Button */}
              <button
                className="btn btn-circle btn-xs btn-ghost"
                aria-label="Decrease quantity">
                <HiOutlineMinus size={16} />
              </button>

              <span className="font-bold text-lg min-w-5 text-center">
                {quantity}
              </span>

              {/* Plus Button */}
              <button
                className="btn btn-circle btn-xs btn-ghost"
                aria-label="Increase quantity">
                <HiOutlinePlus size={16} />
              </button>
            </div>

            {/* Delete Button */}
            <button
              onClick={handleDeleteItem}
              className="btn btn-error btn-outline btn-sm btn-circle"
              title="Remove item">
              <HiOutlineTrash size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
