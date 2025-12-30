import { getSingleProduct } from "@/actions/server/products";
import Image from "next/image";
import React from "react";

export async function generateMetadata({ params }) {
  const { id } = await params;
  console.log(id)
  const product = await getSingleProduct(id);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The product you are looking for does not exist.",
    };
  }

  const { title, bangla, image, description } = product;
  const pageTitle = `${title} | Hero Kidz`;

  return {
    title: pageTitle,
    description:
      description ||
      bangla ||
      "Check out this amazing product on Hero Kidz.",
    url: `https://yourapp.com/product/${id}`,
    image: image || "https://i.ibb.co.com/s9brDwvd",
    type: "product",
    openGraph: {
      title: pageTitle,
      description: description || bangla,
      url: `https://yourapp.com/product/${id}`,
      site_name: "Hero Kidz",
      images: [
        {
          url: image || "https://i.ibb.co.com/s9brDwvd",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      site: "@YourTwitterHandle",
      creator: "@YourTwitterHandle",
      title: pageTitle,
      description: description || bangla,
      images: [image || "https://i.ibb.co.com/s9brDwvd"],
    },
    robots: "index, follow",
    keywords: ["product", "e-commerce", "react", "next.js", "mern"],
  };
}

const SingleProduct = async ({ params }) => {
  const { id } = await params;
  const product = await getSingleProduct(id);
  console.log(id)
  const {
    title,
    bangla,
    image,
    price,
    discount,
    ratings,
    reviews,
    sold,
    description,
    info,
    qna,
  } = product;

  const discountedPrice = price - Math.round((price * discount) / 100);

  return (
    <div className="max-w-5xl mx-auto p-5 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Image */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <Image
          width={200}
          height={100}
          src={image}
          alt={title}
          className="w-full h-full object-cover"></Image>
      </div>

      {/* Info */}
      <div className="flex flex-col space-y-4">
        <div>
          <h1 className="text-2xl text-primary font-bold">{title}</h1>
          <p className="text-gray-500">{bangla}</p>
        </div>

        <div className="flex items-center gap-3 text-sm text-gray-600">
          <span>⭐ {ratings}</span>
          <span>{reviews} reviews</span>
          <span>Sold {sold}</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-3xl font-bold text-primary">
            ৳{discountedPrice}
          </span>
          {discount > 0 && (
            <span className="line-through  text-gray-400">৳{price}</span>
          )}
          {discount > 0 && (
            <span className="bg-primary text-white text-xs px-2 py-1 rounded">
              {discount}% OFF
            </span>
          )}
        </div>

        {/* Info bullets */}
        <ul className="space-y-1 text-gray-600">
          {info?.map((item, idx) => (
            <li key={idx}>✔ {item}</li>
          ))}
        </ul>

        {/* Button */}
        <button className="w-full md:w-1/2 bg-primary text-white py-3 rounded-xl hover:bg-orange-650 transition">
          Buy Now
        </button>
      </div>

      {/* Description + Q&A */}
      <div className="md:col-span-2 space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-gray-700 whitespace-pre-line">{description}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Q & A</h2>
          <div className="space-y-3">
            {qna?.map((item, idx) => (
              <div key={idx} className="border p-3 rounded-lg">
                <p className="font-medium">{item.question}</p>
                <p className="text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
