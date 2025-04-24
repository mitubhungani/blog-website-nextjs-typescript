// lib/auth.ts
import { dbConnect } from "@/lib/db";
import UserModel from "@/model/userModel/userModel";
import bcrypt from "bcryptjs";

export async function addUser(
  username: string,
  email: string,
  password: string
) {
  // ensure database is connected
  try {
    await dbConnect();

    // check for existing user
    const existing = await UserModel.findOne({ email });
    if (existing) {
      throw new Error("User already exists");
    }

    // hash & create
    const hashed = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
      username,
      email,
      password: hashed,
    });

    return user;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error in signupUser:", error.message);
      throw new Error(error.message); // rethrow the error with a message
    } else {
      console.error("Unknown error in signupUser:", error);
      throw new Error("An unknown error occurred during signup.");
    }
  }
}
