"use client";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { FaCartArrowDown } from "react-icons/fa";

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
        className="btn btn-primary md:w-1/2 text-white py-3  hover:cursor-pointer flex items-center justify-center gap-2">
        <FaCartArrowDown /> Add to Cart
      </button>
    </div>
  );
};

export default CartButton;
