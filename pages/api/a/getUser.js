import { getUser } from "../../../lib/dbUser";

export default async (req, res) => {
  if (req.method !== "GET") return;

  try {
    const user = await getUser(req.query.id || null);

    res.status(200).json({ succes: true, status: 200, user });
  } catch (error) {
    console.log("pages/api/a/getUser: ", error.message);
    res
      .status(500)
      .json({ success: false, status: 500, message: error.message });
  }
};
