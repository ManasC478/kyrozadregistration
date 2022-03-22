import { loginUser } from "../../../lib/dbUser";
import { loginUserErrorHandler } from "../../../utils/apiErrorHandlers";

export default async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({
      success: false,
      status: 405,
      message: "Request method not accepted.",
    });
  }
  try {
    // const { email, password } = JSON.parse(req.body);
    const { email, password } = req.body;

    // check if all fields are passed in
    if (email && password) {
      const { user, error } = await loginUser({ email, password });

      // if error in creating account return failed response
      if (error) {
        return res.status(error.status).json({
          success: false,
          status: error.status,
          message: error.message,
        });
      }

      // return successful response
      return res.status(200).json({
        success: true,
        status: 201,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          image: user.image,
        },
      });
    }

    // if not all fields passed in then return failed response
    res.status(400).json({
      success: false,
      status: 400,
      message: "Request made with empty fields.",
    });
  } catch (error) {
    console.log("pages/api/a/loginUser: ", error.message);
    // calls error handler function to format the error nicely
    const { status, message } = loginUserErrorHandler(error);
    res.status(status).json({ success: false, status, message });
  }
};
