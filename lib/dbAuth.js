import { connectToDatabase } from "./mongodb";

export const isEmailInUse = async (email) => {
  try {
    const { db } = await connectToDatabase();
    const user = await db.collection("users").findOne({ email });

    return user;
  } catch (error) {
    console.log(error.message);
  }
};
