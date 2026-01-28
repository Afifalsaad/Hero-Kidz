"use server";

import { authOptions } from "@/lib/authOptions";
import { dbConnect, collections } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";

const cartCollection = dbConnect(collections.CART);

export const handleCart = async ({ product, inc = true }) => {
  const user = await getServerSession(authOptions);
  console.log(user);
  if (!user) return { message: "Please Login" };

  const query = { email: user?.email, productId: product?._id };

  const isAdded = await cartCollection.findOne(query);
  if (isAdded) {
    // Update cart
    const updatedData = {
      $inc: {
        quantity: inc ? 1 : -1,
      },
    };
    const result = await cartCollection.updateOne(query, updatedData);
    return { success: Boolean(result.modifiedCount) };
  } else {
    // insert to cart
    const newData = {
      productId: product?._id,
      email: user?.email,
      title: product?.title,
      quantity: 1,
      image: product?.image,
      price:
        product?.price - Math.round((product?.price * product?.discount) / 100),
      username: user?.name,
    };

    const result = await cartCollection.insertOne(newData);
    return { success: result.acknowledged };
  }
};
