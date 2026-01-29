"use client";

import { useMemo, useState } from "react";

const CheckOut = ({ cartItems }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneNum: "",
    address: "",
    deliveryInfo: "",
  });

  const totalItem = useMemo(
    () => cartItems.reduce((acm, item) => acm + item.quantity, 0),
    [cartItems]
  );

  const totalPrice = useMemo(
    () => cartItems.reduce((acm, item) => acm + item.price * item.quantity, 0),
    [cartItems]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("checkout data", form);
  };

  const deliveryCharge = cartItems.length > 0 ? 60 : 0;
  return (
    <div>
      <h2 className="text-lg my-5 ml-5">Delivery Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Form */}
        <div className="col-span-8">
          <form onSubmit={handleSubmit} className="p-6 max-w-4xl mx-auto">
            <div className="grid sm:grid-cols-2 gap-10">
              <div className="relative flex items-center">
                <label className="text-[13px] bg-white text-black font-medium absolute px-2 -top-2.5 left-4.5">
                  Name
                </label>
                <input
                  name="name"
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter your name"
                  className="px-4 py-3.5 pr-8 text-black font-medium w-full text-sm border-2 border-gray-200 focus:border-blue-500 rounded-sm outline-none"
                />
              </div>

              <div className="relative flex items-center">
                <label className="text-[13px] bg-white font-medium absolute px-2 -top-2.5 left-4.5">
                  Phone No
                </label>
                <input
                  name="phoneNum"
                  onChange={handleChange}
                  type="number"
                  placeholder="Enter phone no."
                  className="px-4 py-3.5 pr-8 font-medium w-full text-sm border-2 border-gray-200 focus:border-blue-500 rounded-sm outline-none"
                />
              </div>

              <div className="relative flex items-center">
                <label className="text-[13px] bg-white font-medium absolute px-2 -top-2.5 left-4.5">
                  Address
                </label>
                <input
                  onChange={handleChange}
                  name="address"
                  type="text"
                  placeholder="Enter address"
                  className="px-4 py-3.5 pr-8 font-medium w-full text-sm border-2 border-gray-200 focus:border-blue-500 rounded-sm outline-none"
                />
              </div>

              <div className="relative items-center">
                <label className="text-[13px] bg-white font-medium absolute px-2 -top-2.5 left-4.5">
                  Email
                </label>
                <input
                  onChange={handleChange}
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  className="px-4 py-3.5 pr-8 font-medium w-full text-sm border-2 border-gray-200 focus:border-blue-500 rounded-sm outline-none"
                />
              </div>

              <div className="relative flex items-center sm:col-span-2">
                <label className="text-[13px] bg-white font-medium absolute px-2 -top-2.5 left-4.5">
                  Delivery Description
                </label>
                <textarea
                  onChange={handleChange}
                  name="deliveryInfo"
                  type="text"
                  rows={5}
                  placeholder="Enter description"
                  className="px-4 py-3.5 pr-8 font-medium w-full text-sm border-2 border-gray-200 focus:border-blue-500 rounded-sm outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-10 px-6 py-2.5 w-full text-sm font-medium bg-primary text-white rounded-sm hover:bg-orange-700 transition-all cursor-pointer">
              Submit
            </button>
          </form>
        </div>

        {/* Summary */}
        <div className="col-span-4 md:sticky bottom-6">
          <div className="card bg-base-100 shadow-2xl border border-base-200 sticky top-24">
            <div className="card-body p-6">
              <h2 className="card-title text-2xl font-bold mb-4 border-b pb-3">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6 max-h-72 overflow-y-auto pr-2 custom-scrollbar">
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-between cartItems-start gap-4 text-sm border-b border-base-100 pb-3">
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
                  <span>Total cartItems:</span>
                  <span className="font-semibold">{totalItem}</span>
                </div>

                <div className="flex justify-between text-base-content/70">
                  <span>Delivery Charge:</span>
                  <span className="font-semibold text-success">
                    ৳{deliveryCharge}
                  </span>
                </div>

                <div className="divider my-1"></div>

                <div className="flex justify-between cartItems-center pt-2">
                  <span className="text-lg font-semibold">Total Amount:</span>
                  <span className="text-3xl font-black text-primary">
                    ৳{totalPrice + deliveryCharge}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
