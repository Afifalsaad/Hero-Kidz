import { getCartItem } from "@/actions/server/cart";
import CartItems from "@/components/cards/CartItems";
import Cart from "@/components/home/Cart";
import React from "react";

const CartPage = async () => {
  const rawCartItems = await getCartItem();
  const cartItems = JSON.parse(JSON.stringify(rawCartItems));
  return (
    <div className="">
      <div className="mb-8 border-b border-base-200 pb-5">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-extrabold text-base-content">
            Your Shopping Cart
          </h1>
          <div className="badge badge-primary badge-lg text-white font-semibold">
            {cartItems.length} Items
          </div>
        </div>
        <p className="text-base-content/60 text-sm">
          Click checkout button to complete the order.
        </p>
      </div>

      <Cart cartItems={cartItems}></Cart>
    </div>
  );
};

export default CartPage;
