"use server";

import { authOptions } from "@/lib/authOptions";
import { dbConnect, collections } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { cache } from "react";

const cartCollection = dbConnect(collections.CART);

// export const dynamic = "force-dynamic";

export const handleCart = async ({ product, inc = true }) => {
  const user = await getServerSession(authOptions);
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

export const getCartItem = cache(async () => {
  try {
    const user = await getServerSession(authOptions);
    if (!user) return [];

    const query = { email: user?.email };
    const result = await cartCollection.find(query).toArray();
    return result;
  } catch (err) {
    console.log(err);
  }
});

export const deleteCartItem = async (id) => {
  try {
    const user = await getServerSession(authOptions);
    if (!user) return [];

    if (id.length != 24) {
      return { success: false };
    }
    const query = { _id: new ObjectId(id) };
    const result = await cartCollection.deleteOne(query);

    if (Boolean(result.deletedCount)) {
      revalidatePath("/cart");
    }

    return { success: Boolean(result.deletedCount) };
  } catch {}
};

export const increaseItemDb = async (id, quantity) => {
  try {
    const user = await getServerSession(authOptions);
    if (!user) return [];

    if (quantity >= 10) {
      return {
        success: false,
        message: "You can't buy more than 10 items at a time",
      };
    }

    const updatedData = {
      $inc: {
        quantity: 1,
      },
    };

    const query = { _id: new ObjectId(id) };
    const result = await cartCollection.updateOne(query, updatedData);

    return { success: Boolean(result.modifiedCount) };
  } catch {}
};

export const decreaseItemDb = async (id, quantity) => {
  try {
    const user = await getServerSession(authOptions);
    if (!user) return [];

    if (quantity <= 1) {
      return {
        success: false,
        message: "Cart Items can't be empty",
      };
    }

    const updatedData = {
      $inc: {
        quantity: -1,
      },
    };

    const query = { _id: new ObjectId(id) };
    const result = await cartCollection.updateOne(query, updatedData);

    return { success: Boolean(result.modifiedCount) };
  } catch {}
};

export const clearCart = async () => {
  try {
    const user = await getServerSession(authOptions);
    if (!user) return [];

    const query = { email: user?.email };
    const result = await cartCollection.deleteMany(query);
    return result;
  } catch {}
};
