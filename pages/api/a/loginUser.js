import { isEmailInUse, validatePassword, loginUser } from "../../../lib/dbUser";
import { loginUserErrorHandler } from "../../../utils/apiErrorHandlers";

export default async (req, res) => {
  // if (req.method !== "POST")
  //   return res.status(405).json({
  //     success: false,
  //     status: 405,
  //     message: "Request method not accepted.",
  //   });
  try {
    // const { email, password } = JSON.parse(req.body);
    console.log("loguser");
    const { email, password } = req.body;
    console.log(req.body);

    //   check is user is already signed up and throw error
    // const user = await isEmailInUse(email);
    // if (!user) {
    //   return res
    //     .status(401)
    //     .json({ success: false, message: "Email not found" });
    // } else if (!(await validatePassword(password, user.password))) {
    //   return res
    //     .status(403)
    //     .json({ success: false, message: "Incorrect password" });
    // }

    // res.status(200).json({ success: true, message: "User validated", user });

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
    const { status, message } = loginUserErrorHandler(error);
    res.status(status).json({ success: false, status, message });
  }
};
