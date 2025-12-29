import React from "react";

const SingleProductSkeleton = () => {
  return (
    <div className="max-w-5xl mx-auto p-5 grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
      <div className="h-96 bg-gray-300 rounded-2xl"></div>

      <div className="space-y-4">
        <div className="h-6 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>

        <div className="flex gap-3">
          <div className="h-4 bg-gray-200 rounded w-16"></div>
          <div className="h-4 bg-gray-200 rounded w-20"></div>
        </div>

        <div className="h-8 bg-gray-300 rounded w-32"></div>

        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-11/12"></div>
          <div className="h-4 bg-gray-200 rounded w-10/12"></div>
        </div>

        <div className="h-12 bg-gray-300 rounded-xl w-1/2"></div>
      </div>

      <div className="md:col-span-2 space-y-4">
        <div className="h-5 bg-gray-300 rounded w-40"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-11/12"></div>

        <div className="h-5 bg-gray-300 rounded w-32 mt-6"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-10/12"></div>
      </div>
    </div>
  );
};

export default SingleProductSkeleton;
