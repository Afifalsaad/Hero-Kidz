"use client";
import {
  decreaseItemDb,
  deleteCartItem,
  increaseItemDb,
} from "@/actions/server/cart";
import Image from "next/image";
import React, { useState } from "react";
import { HiOutlineMinus, HiOutlinePlus, HiOutlineTrash } from "react-icons/hi";
import Swal from "sweetalert2";

const CartItems = ({ item, removeItem, updateQuantity }) => {
  const { title, image, quantity, price, _id } = item;
  const [loading, setLoading] = useState(false);

  const handleDeleteItem = () => {
    Swal.fire({
      title: "Remove item?",
      text: "This product will be removed from your cart.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Remove",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const result = await deleteCartItem(_id);
        if (result.success) {
          removeItem(_id);
          Swal.fire("Removed!", "", "success");
        }
      }
    });
  };

  const increaseQuantity = async () => {
    setLoading(true);
    const result = await increaseItemDb(_id, quantity);
    if (result.success) updateQuantity(_id, quantity + 1);
    setLoading(false);
  };

  const decreaseQuantity = async () => {
    setLoading(true);
    const result = await decreaseItemDb(_id, quantity);
    if (result.success) updateQuantity(_id, quantity - 1);
    setLoading(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 my-4">
      {/* PRODUCT CARD */}
      <div className="lg:col-span-3">
        <div className="flex items-center gap-4 bg-base-100 border border-base-200 rounded-xl p-4 shadow-sm hover:shadow-md transition">
          <figure className="w-24 h-24 shrink-0">
            <Image alt={title} src={image} width={300} height={300}></Image>
          </figure>

          <div className="flex-1">
            <h3 className="font-medium leading-tight line-clamp-2">{title}</h3>
            <p className="text-primary font-semibold mt-1">৳{price}</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={decreaseQuantity}
              disabled={quantity === 1 || loading}
              className="btn btn-xs btn-ghost">
              <HiOutlineMinus />
            </button>

            <span className="font-semibold w-6 text-center">{quantity}</span>

            <button
              onClick={increaseQuantity}
              disabled={quantity === 10 || loading}
              className="btn btn-xs btn-ghost">
              <HiOutlinePlus />
            </button>
          </div>

          <p className="font-semibold min-w-20 text-right">
            ৳{price * quantity}
          </p>

          <button
            onClick={handleDeleteItem}
            className="btn btn-xs btn-ghost text-error">
            <HiOutlineTrash size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
