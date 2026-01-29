"use client";
import React, { useMemo, useState } from "react";
import CartItems from "../cards/CartItems";
import Link from "next/link";

const Cart = ({ cartItems = [] }) => {
  const [items, setItems] = useState(cartItems);

  const totalItem = useMemo(
    () => items.reduce((acm, item) => acm + item.quantity, 0),
    [items]
  );

  const totalPrice = useMemo(
    () => items.reduce((acm, item) => acm + item.price * item.quantity, 0),
    [items]
  );

  const removeItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item._id != id));
  };

  const updateQuantity = (id, q) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item._id == id ? { ...item, quantity: q } : item
      )
    );
  };

  const deliveryCharge = items.length > 0 ? 60 : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-2">
          {items.length > 0 ? (
            items.map((item) => (
              <CartItems
                key={item._id}
                item={item}
                removeItem={removeItem}
                updateQuantity={updateQuantity}
              />
            ))
          ) : (
            <div className=" p-20 rounded-3xl text-center">
              <p className="text-xl opacity-50 font-semibold">
                Your cart is empty.
              </p>
            </div>
          )}
        </div>

        <div className="lg:col-span-1 sticky">
          <div className="card bg-base-100 shadow-2xl border border-base-200 sticky top-24">
            <div className="card-body p-6">
              <h2 className="card-title text-2xl font-bold mb-4 border-b pb-3">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6 max-h-72 overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-between items-start gap-4 text-sm border-b border-base-100 pb-3">
                    <div className="flex-1">
                      <p className="font-semibold text-base-content line-clamp-2 leading-tight mb-1">
                        {item.title}
                      </p>
                      <p className="text-xs text-primary font-medium">
                        Qty: {item.quantity} × ৳{item.price}
                      </p>
                    </div>
                    <span className="font-bold text-base-content whitespace-nowrap">
                      ৳{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* Calculation Summary */}
              <div className="space-y-3">
                <div className="flex justify-between text-base-content/70">
                  <span>Total Items:</span>
                  <span className="font-semibold">{totalItem}</span>
                </div>

                <div className="flex justify-between text-base-content/70">
                  <span>Delivery Charge:</span>
                  <span className="font-semibold text-success">
                    ৳{deliveryCharge}
                  </span>
                </div>

                <div className="divider my-1"></div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-lg font-semibold">Total Amount:</span>
                  <span className="text-3xl font-black text-primary">
                    ৳{totalPrice + deliveryCharge}
                  </span>
                </div>
              </div>

              {/* Confirm Order Button */}
              <div className="card-actions mt-8">
                <Link href={"/checkout"}>
                  <button
                    className="btn btn-primary text-white text-md hover:scale-[1.02] active:scale-[0.98] transition-all"
                    disabled={items.length === 0}
                    onClick={() =>
                      console.log("Confirming order for: ", items)
                    }>
                    Confirm Order
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
