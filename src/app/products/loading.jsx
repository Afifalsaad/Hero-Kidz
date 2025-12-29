import ProductCardSkeleton from "@/components/skeletons/ToysSkeleton";
import React from "react";

const Loading = () => {
  return (
    <div className="grid grid-cols-3 gap-5">
      {[...Array(8)].map((_, index) => (
        <ProductCardSkeleton key={index}></ProductCardSkeleton>
      ))}
    </div>
  );
};

export default Loading;
