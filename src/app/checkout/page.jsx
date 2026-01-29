import { getCartItem } from "@/actions/server/cart";
import CheckOut from "@/components/home/CheckOut";
import React from "react";

const checkOutPage = async () => {
  const rawCartItems = await getCartItem();
  const cartItems = JSON.parse(JSON.stringify(rawCartItems));
  return (
    <div>
      <div className="">
        <h1 className="text-3xl font-extrabold border-l-8 px-2 border-primary text-base-content ml-5">
          Checkout
        </h1>
      </div>
      <CheckOut cartItems={cartItems}></CheckOut>
    </div>
  );
};

export default checkOutPage;
