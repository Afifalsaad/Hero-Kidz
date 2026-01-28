"use client";
import { handleCart } from "@/actions/server/cart";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaCartArrowDown } from "react-icons/fa";
import Swal from "sweetalert2";

const CartButton = ({ product }) => {
  const session = useSession();
  const isLogin = session?.status == "authenticated";
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const pathName = usePathname();

  const addToCart = async () => {
    setIsLoading(true);
    if (isLogin) {
      const result = await handleCart({ product, inc: true });
      if (result.success) {
        Swal.fire("Added To Cart", product.title, "success");
      } else {
        Swal.fire("Opps", "Something went wrong", "error");
      }
      setIsLoading(false);
    } else {
      router.push(`/login?callbackUrl=${pathName}`);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        disabled={session.status == "loading" || isLoading}
        onClick={addToCart}
        className="btn btn-primary text-white py-3 hover:cursor-pointer flex items-center justify-center gap-2">
        <FaCartArrowDown /> Add to Cart
      </button>
    </div>
  );
};

export default CartButton;
