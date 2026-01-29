"use server";

import { getServerSession } from "next-auth";
import { clearCart, getCartItem } from "./cart";
import { authOptions } from "@/lib/authOptions";

const { dbConnect, collections } = require("@/lib/dbConnect");

const orderCollection = dbConnect(collections.ORDER);

export const createOrder = async (payload) => {
  try {
    const user = await getServerSession(authOptions);
    if (!user) return [];

    const cart = await getCartItem();

    const newOrder = {
      //   item: cart,
      ...payload,
      createdAt: new Date().toISOString(),
    };

    const result = await orderCollection.insertOne(newOrder);

    if (Boolean(result.insertedId)) {
      const result = await clearCart();
    }

    return {
      success: result.insertedId.toString(),
    };
  } catch {}
};
