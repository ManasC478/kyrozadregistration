// all the below functions filter the errors from the api endpoints and returns a nicely formatted js object
// with http code and message
export const createUserErrorHandler = (error) => {
  if (
    error.message.includes("user name required") ||
    error.message.includes("user email required") ||
    error.message.includes("user password required")
  ) {
    return { status: 400, message: "Not all fields submitted." };
  } else if (error.message.includes("not an email")) {
    return { status: 400, message: "Not valid email." };
  } else if (error.message.includes("maximum name length is 25 characters")) {
    return { status: 400, message: "Maximum name length is 25 characters" };
  }
  return { status: 500, message: error.message };
};

export const loginUserErrorHandler = (error) => {
  return { status: 500, message: error.message };
};

export const updateUserErrorHandler = (error) => {
  if (error.message.includes("User not found.")) {
    return { status: 400, message: "User not found." };
  } else if (
    error.message.includes("User not authenticated.") ||
    error.message.includes("Cannot read property 'user' of null")
  ) {
    return { status: 401, message: "User not authenticated." };
  }

  return { status: 500, message: error.message };
};
