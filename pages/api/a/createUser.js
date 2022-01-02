import { connectToDatabase } from "../../../lib/mongodb";
import { isEmailInUse } from "../../../lib/dbAuth";
import { genSalt, hash } from "bcrypt";

export default async (req, res) => {
  try {
    const { email, password } = JSON.parse(req.body);

    //   check is user is already signed up and throw error
    if (await isEmailInUse(email)) {
      return res
        .status(409)
        .json({ success: false, message: "Email already in user" });
    }

    const { db } = await connectToDatabase();

    //   hash password
    const salt = await genSalt();
    const hashedPassword = await hash(password, salt);

    //   insert new user
    const user = await db
      .collection("users")
      .insertOne({ email, password: hashedPassword });

    res.status(201).json({ success: true, message: "New user created" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
