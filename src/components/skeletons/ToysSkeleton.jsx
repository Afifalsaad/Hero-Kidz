import React from "react";

const ProductCardSkeleton = () => {
  return (
    <div className="max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse flex flex-col">
      {/* Image Skeleton */}
      <div className="w-full h-56 bg-gray-300"></div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 space-y-3">
        {/* Title */}
        <div className="h-5 bg-gray-300 rounded w-3/4"></div>

        {/* Bangla subtitle */}
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>

        {/* Rating */}
        <div className="flex gap-2">
          <div className="h-4 bg-gray-200 rounded w-16"></div>
          <div className="h-4 bg-gray-200 rounded w-20"></div>
          <div className="h-4 bg-gray-200 rounded w-14"></div>
        </div>

        {/* Price */}
        <div className="flex gap-3">
          <div className="h-6 bg-gray-300 rounded w-20"></div>
          <div className="h-4 bg-gray-200 rounded w-14"></div>
        </div>

        {/* Info list */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-11/12"></div>
          <div className="h-4 bg-gray-200 rounded w-10/12"></div>
          <div className="h-4 bg-gray-200 rounded w-9/12"></div>
        </div>

        {/* Buttons */}
        <div className="mt-auto flex gap-3 pt-3">
          <div className="flex-1 h-10 bg-gray-300 rounded-lg"></div>
          <div className="flex-1 h-10 bg-gray-300 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
