import dbConnect from "./mongodb/mongodbConnect";
import { User } from "../models";
import { getToken } from "next-auth/jwt";
// import { connectToDatabase } from "./mongodb/mongodbConnect";
import { compare, genSalt, hash } from "bcrypt";

let state_user = null;

// Close the given change stream after the given amount of time
// function closeChangeStream(timeInMs = 60000, changeStream) {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             console.log("Closing the change stream");
//             changeStream.close();
//             resolve();
//         }, timeInMs)
//     })
// };

// monitor any updates to db user in order to update state user
const monitorUserUpdates = () => {
  try {
    // stream change event emitter
    User.watch([
      {
        $match: {
          operationType: "update",
          "fullDocument._id": state_user?.id,
        },
      },
    ]).on("change", (data) => {
      console.log(
        "inside User stream change. fullDocument: ",
        data.fullDocument
      );
      state_user = data.fullDocument;
    });
  } catch (error) {
    console.log("lib/dbUser/monitorUserUpdates: ", error.message);
    throw new Error(error.message);
  }
};

export const isEmailInUse = async (email) => {
  try {
    // const { db } = await connectToDatabase();
    // const user = await db.collection("users").findOne({ email });
    await dbConnect();
    const user = await User.findOne({ email }).exec();

    return user;
  } catch (error) {
    console.log("lib/dbUser/isEmailInUse: ", error.message);
    throw new Error(error.message);
  }
};

// compare hashed password with inputed password
export const validatePassword = async (password, hashedPassword) => {
  try {
    return await compare(password, hashedPassword);
  } catch (error) {
    console.log(error.message);
  }
};

// insert user into user collection
const insertUser = async (user) => {
  try {
    await dbConnect();

    return await User.create(user);
  } catch (error) {
    console.log("lib/dbUser/insertUser: ", error.message);
    throw new Error(error.message);
  }
};

export const createUserWithCredentials = async ({
  name,
  email,
  password,
  color,
}) => {
  try {
    //   check is user is already signed up and throw error
    if (await isEmailInUse(email)) {
      return { error: { status: 409, message: "Email is already in use." } };
    }

    //   hash password
    const salt = await genSalt();
    const hashedPassword = await hash(password, salt);

    //   insert new user
    const user = await insertUser({
      name,
      email,
      password: hashedPassword,
      number: null,
      url: null,
      phoneCode: null,
      category: null,
      image: "default",
      signinProvider: "credentials",
      pricePlan: null,
      imageColor: color,
    });

    state_user = user;

    return { user };
  } catch (error) {
    console.log("lib/dbUser/createUserWithCredentials: ", error.message);
    throw new Error(error.message);
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    //   check is user is already signed up and throw error
    const user = await isEmailInUse(email);
    if (!user) {
      return { error: { status: 404, message: "Email not found." } };
    } else if (!(await validatePassword(password, user.password))) {
      return { error: { status: 403, message: "Incorrect password." } };
    }

    state_user = user;

    return { user };
  } catch (error) {
    console.log("lib/dbUser/loginUser: ", error.message);
    throw new Error(error.message);
  }
};

export const updateUser = async (
  id,
  { name, number, url, phoneCode, category }
) => {
  try {
    await dbConnect();

    // fetch the user doc and update
    const doc = await User.findById(id);
    if (!doc) {
      throw new Error("User not found.");
    }
    doc.name = name;
    doc.number = number;
    doc.url = url;
    doc.phoneCode = phoneCode;
    doc.category = category;

    // save changes
    return await doc.save();
  } catch (error) {
    console.log("lib/dbUser/updateUser: ", error.message);
    throw new Error(error.message);
  }
};

export const getUser = async (id) => {
  try {
    if (state_user) {
      return state_user;
    }

    await dbConnect();

    // fetch user
    const user = await User.findById(id);
    state_user = user;
    monitorUserUpdates();

    return state_user;
  } catch (error) {
    console.log("lib/dbUser/getUser: ", error.message);
    throw new Error(error.message);
  }
};
