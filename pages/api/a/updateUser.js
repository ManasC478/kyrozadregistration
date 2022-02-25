import { updateUser } from "../../../lib/dbUser";
import { updateUserErrorHandler } from "../../../utils/apiErrorHandlers";

// const ObjectID = require("mongodb").ObjectID;
import { getSession } from "next-auth/react";

export default async (req, res) => {
  if (req.method !== "PATCH") return;
  try {
    const session = await getSession({ req });
    let { name, number, url, phoneCode, category } = req.body;
    number = number || null;
    url = url || null;
    name = name || null;

    // check if session, phone, or category are null
    if (!session?.user?.id || !phoneCode || !category) {
      throw new Error("User not authenticated.");
    }

    // update user
    const user = await updateUser(session.user.id, {
      name,
      number,
      url,
      phoneCode,
      category,
    });

    // return successful response
    res.status(200).json({ success: true, status: 200, user });
  } catch (error) {
    console.log(error.message);
    const { status, message } = updateUserErrorHandler(error);
    res.status(status).json({ success: false, status, message });
  }
};
