import { connectToDatabase } from "../../../lib/mongodb";
import { isEmailInUse } from "../../../lib/dbAuth";
import { genSalt, hash } from "bcrypt";

export default async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = JSON.parse(req.body);

    //   check is user is already signed up and throw error
    if (await isEmailInUse(email)) {
      throw new Error("email already in use");
    }

    const { db } = await connectToDatabase();

    //   hash password
    const salt = await genSalt();
    const hashedPassword = await hash(password, salt);

    //   insert new user
    const user = await db
      .collection("users")
      .insertOne({ email, password: hashedPassword });

    res.status(201).json({ success: true, message: "new user created" });
  } catch (error) {
    console.log(error.message);
    res.status(409).json({ success: false, message: error.message });
  }
};
