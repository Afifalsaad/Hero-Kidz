"use server";

import { collections, dbConnect } from "@/lib/dbConnect";
import bcryptjs from "bcryptjs";

export const postUser = async (payload) => {
  const { email, password, name } = payload;

  // validate with info
  if (!email || !password) return null;

  // check if user isExist
  const isExist = await dbConnect(collections.USER).findOne({ email });
  if (isExist) {
    return null;
  }

  //   create user
  const newUser = {
    provider: "credentials",
    name,
    email,
    password: await bcryptjs.hash(password, 10),
    role: "user",
  };

  //   save user to DB
  const result = await dbConnect(collections.USER).insertOne(newUser);
  if (result.acknowledged) {
    return {
      ...result,
      insertedId: result.insertedId.toString(),
    };
  }
};
