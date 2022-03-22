import dbConnect from "./mongodb/mongodbConnect";
import { User } from "../models";
import { compare, genSalt, hash } from "bcrypt";

// cached user object
let state_user = null;

// validate if email is already there in database
export const isEmailInUse = async (email) => {
  try {
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

// create the user with user credentials
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

    // update cached user
    state_user = user;

    return { user };
  } catch (error) {
    console.log("lib/dbUser/createUserWithCredentials: ", error.message);
    throw new Error(error.message);
  }
};

// validate user credentials with database before user login
export const loginUser = async ({ email, password }) => {
  try {
    //   check is user is already signed up and throw error
    const user = await isEmailInUse(email);
    if (!user) {
      return { error: { status: 404, message: "Email not found." } };
    } else if (!(await validatePassword(password, user.password))) {
      return { error: { status: 403, message: "Incorrect password." } };
    }

    // update cached user
    state_user = user;

    return { user };
  } catch (error) {
    console.log("lib/dbUser/loginUser: ", error.message);
    throw new Error(error.message);
  }
};

// update user data
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

// fetch user data
export const getUser = async (id) => {
  try {
    // returned cached data if there
    if (state_user) {
      return state_user;
    }

    await dbConnect();

    // fetch user
    const user = await User.findById(id);
    state_user = user;

    return state_user;
  } catch (error) {
    console.log("lib/dbUser/getUser: ", error.message);
    throw new Error(error.message);
  }
};
