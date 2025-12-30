"use client";
import Link from "next/link";
import React from "react";
import { BiSolidError } from "react-icons/bi";

const error = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center min-h-screen space-y-2">
        <BiSolidError size={100} className="text-primary" />
        <h2 className="font-bold text-3xl">Page Not Found</h2>
        <Link href={"/"} className="btn btn-primary">
          Go To Home
        </Link>
      </div>
    </div>
  );
};

export default error;
