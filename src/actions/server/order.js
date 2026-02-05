"use server";

import { getServerSession } from "next-auth";
import { clearCart, getCartItem } from "./cart";
import { authOptions } from "@/lib/authOptions";
import { sendEmail } from "@/lib/sendEmail";
import { orderInvoiceTemplate } from "@/lib/orderinvoice";

const { dbConnect, collections } = require("@/lib/dbConnect");

const orderCollection = dbConnect(collections.ORDER);

export const createOrder = async (payload) => {
  try {
    const user = await getServerSession(authOptions);
    console.log(user.email);
    if (!user) return [];

    const cart = await getCartItem();

    const newOrder = {
      item: cart,
      ...payload,
      createdAt: new Date().toISOString(),
    };

    const result = await orderCollection.insertOne(newOrder);

    if (Boolean(result.insertedId)) {
      const result = await clearCart();
    }

    const totalPrice = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    await sendEmail({
      to: user.email,
      subject: "Your Order Invoice - Hero Kidz",
      html: orderInvoiceTemplate({
        orderId: result.insertedId.toString(),
        items: cart,
        totalPrice,
      }),
    });

    return {
      success: result.insertedId.toString(),
    };
  } catch (error) {
    console.log(error);
  }
};
