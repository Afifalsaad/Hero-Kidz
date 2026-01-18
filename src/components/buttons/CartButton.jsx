"use client";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const CartButton = ({ product }) => {
  const session = useSession();
  const isLogin = session?.status == "authenticated";
  const router = useRouter();
  const pathName = usePathname();

  const addToCart = () => {
    if (isLogin) {
      alert(product._id);
    } else {
      router.push(`/login?callbackUrl=${pathName}`);
    }
  };

  return (
    <div>
      <button
        onClick={addToCart}
        className="w-full md:w-1/2 bg-primary text-white py-3 rounded-xl hover:bg-orange-650 transition hover:cursor-pointer">
        Add to Cart
      </button>
    </div>
  );
};

export default CartButton;
