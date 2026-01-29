"use server";

const { dbConnect, collections } = require("@/lib/dbConnect");

const orderCollection = dbConnect(collections.ORDER);

export const createOrder = async () => {
  try {
    const user = await getServerSession(authOptions);
    if (!user) return [];
  } catch {
    
  }
};
