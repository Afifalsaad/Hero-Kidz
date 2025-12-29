import Image from "next/image";
import Link from "next/link";
import React from "react";

const ToysCard = ({ toy }) => {
  const {
    title,
    bangla,
    image,
    price,
    discount,
    ratings,
    reviews,
    sold,
    info,
  } = toy;

  const discountedPrice = price - Math.round((price * discount) / 100);

  return (
    <div className="max-w-sm bg-white rounded-2xl shadow-lg hover:shadow-xl transition overflow-hidden flex flex-col h-142">
      {/* Image */}
      <div className="relative">
        <Image
          src={image}
          alt={title}
          className="w-full h-56 object-cover"
          width={200} height={100}></Image>
        {discount > 0 && (
          <span className="absolute top-3 left-3 bg-primary text-white text-xs font-semibold px-2 py-1 rounded">
            {discount}% OFF
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h2 className="text-lg font-bold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-500 mb-2">{bangla}</p>

        {/* Rating */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <span>⭐ {ratings}</span>
          <span>({reviews} reviews)</span>
          <span>• Sold {sold}</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl font-bold text-sky-600">
            ৳{discountedPrice}
          </span>
          {discount > 0 && (
            <span className="text-sm line-through text-gray-400">৳{price}</span>
          )}
        </div>

        {/* Info */}
        <ul className="text-sm text-gray-600 mb-4 space-y-1">
          {info.slice(0, 4).map((item, idx) => (
            <li key={idx}>✔ {item}</li>
          ))}
        </ul>

        {/* Buttons */}
        <div className="mt-auto flex gap-3">
          <Link href={`products/${toy._id}`} className="flex-1 btn btn-primary btn-outline py-2 rounded-lg transition">
            See Details
          </Link>
          <button className="flex-1 btn btn-primary py-2 rounded-lg hover:bg-orange-700 transition">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToysCard;
