import mongoose from "mongoose";

const MONGO_URI = process.env.DB_URI;

if (!MONGO_URI) {
  throw new Error("Not Found");
}

export async function dbConnect(): Promise<void> {

    if (mongoose.connection.readyState == 1) {
        return;
    }

  try {
    const db = await mongoose.connect(MONGO_URI as string);
    console.log(db, "DB connect successfully");
  } catch (error) {
    console.log(error, "connection failed ");
  }
}
