import { getUser } from "../../../lib/dbUser";
import { getUserSubscription } from "../../../lib/mongodb/mongodb-stripe-admin";

export default async (req, res) => {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({
      success: false,
      status: 405,
      message: "Request method not accepted.",
    });
  }

  try {
    // fetches user and user's subscription data
    const user = await getUser(req.query.id || null);
    const subscription = await getUserSubscription(req.query.id || null);

    res.status(200).json({ success: true, status: 200, user, subscription });
  } catch (error) {
    console.log("pages/api/a/getUser: ", error.message);
    res
      .status(500)
      .json({ success: false, status: 500, message: error.message });
  }
};
