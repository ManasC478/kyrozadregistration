import { updateUser } from "../../../lib/dbUser";
import { updateUserErrorHandler } from "../../../utils/apiErrorHandlers";

// const ObjectID = require("mongodb").ObjectID;
import { getSession } from "next-auth/react";

export default async (req, res) => {
  if (req.method !== "PATCH") {
    res.setHeader("Allow", "PATCH");
    return res.status(405).json({
      success: false,
      status: 405,
      message: "Request method not accepted.",
    });
  }
  try {
    // get user session data from nextauth
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
    // calls error handler function to format the error nicely
    const { status, message } = updateUserErrorHandler(error);
    res.status(status).json({ success: false, status, message });
  }
};
