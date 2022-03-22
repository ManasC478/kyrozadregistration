import { createUserWithCredentials } from "../../../lib/dbUser";
import { createUserErrorHandler } from "../../../utils/apiErrorHandlers";

const userImageColor = [
  "red.400",
  "orange.400",
  "green.300",
  "teal.200",
  "cyan.200",
  "purple.300",
  "pink.300",
];

// create user with credentials
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
    const { name, email, password } = req.body;
    const color =
      userImageColor[Math.floor(Math.random() * (userImageColor.length - 1))];

    // check if all fields are passed in
    if (name && email && password) {
      const { user, error } = await createUserWithCredentials({
        ...req.body,
        color,
      });

      // if error in creating account return failed response
      if (error) {
        return res.status(error.status).json({
          success: false,
          status: error.status,
          message: error.message,
        });
      }

      // return successful response
      return res.status(201).json({
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
    console.log("pages/api/a/createUser: ", error.message);
    // calls error handler function to format the error nicely
    const { status, message } = createUserErrorHandler(error);
    res.status(status).json({ success: false, status, message });
  }
};
