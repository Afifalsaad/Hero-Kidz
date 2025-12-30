import Logo from "@/components/layouts/Logo";
import React from "react";

const loading = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center min-h-screen space-y-2">
        <h2 className="text-4xl font-bold animate-pulse">Loading</h2>
        <div className="animate-ping">
          <Logo></Logo>
        </div>
      </div>
    </div>
  );
};

export default loading;
