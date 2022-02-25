import { useEffect, useState, createContext, useContext } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import useSWR, { mutate } from "swr";
import { useRouter } from "next/router";
import fetcher from "../../utils/fetcher";

const UserContext = createContext();

export const UserContextProvider = (props) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (status === "authenticated") {
      // redirect user to dashboard if user is authenticated and is on login route
      if (!isProtectedRoute(router.pathname)) {
        router.replace("/dashboard");
      }
    } else if (status === "unauthenticated") {
      // redirect to login if user is not authenticated and is on a protected route
      if (isProtectedRoute(router.pathname)) {
        router.replace("/a/signin");
      }
    }
  }, [status, router.pathname]);

  // every time session or status changes update user info
  useEffect(async () => {
    if (status === "authenticated") {
      try {
        const res = await fetcher(`/api/a/getUser?id=${session?.user?.id}`, {
          method: "GET",
        });

        if (res.status >= 500) {
          throw { status: res.status, message: res.message };
        }
        const formattedUser = formatUser(res.user);
        setUser(formattedUser);
      } catch (error) {
        console.log(
          "/lib/CustomHooks/useUser/UserContextProvider",
          error.message
        );
        throw new Error(error.message);
      }
    }
  }, [status]);

  const validateResponseAndSignIn = async (res) => {
    console.log("res: ", res);
    // check for http errors
    if (res.status >= 500) {
      throw { status: res.status, message: res.message };
    } else if (res.status >= 400) {
      throw { status: res.status, message: res.message };
    } else if (res.status >= 200 && res.status < 300) {
      // login user
      console.log("in signin");
      return await signIn("credentials", {
        redirect: false,
        ...res.user,
      });
    }
  };

  // signs in the user
  const logIn = async (values) => {
    // validate login with database
    const res = await fetcher("/api/a/loginUser", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify(values),
    });

    return await validateResponseAndSignIn(res);
  };

  // creates and signs in the user
  const signUp = async (values) => {
    // validate the login with database
    const res = await fetcher("/api/a/createUser", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify(values),
    });

    return await validateResponseAndSignIn(res);
  };

  const updateUser = async (values) => {
    const res = await fetcher("/api/a/updateUser", {
      method: "PATCH",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify(values),
    });

    // check for http errors
    if (res.status >= 500) {
      throw { status: res.status, message: res.message };
    } else if (res.status >= 400) {
      throw { status: res.status, message: res.message };
    } else if (res.status >= 200 && res.status < 300) {
      const formattedUser = formatUser(res.user);
      setUser(formattedUser);
      console.log(
        "/lib/CustomHooks/useUser/updateUser - updated user ",
        res.user
      );
    }
  };

  const value = {
    session,
    user,
    status,
    signUp,
    logIn,
    signOutUser: () => {
      setUser(null);
      router.replace("/a/signin");
      return signOut();
    },
    updateUser,
  };

  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error(`useUser must be used within a UserContextProvider.`);
  }
  return context;
};

// formats raw user object
const formatUser = (user) => {
  return {
    name: user?.name,
    email: user?.email,
    createdAt: user?.createdAt,
    number: user?.number,
    phoneCode: user?.phoneCode,
    url: user?.url,
    category: user?.category,
    image: user?.image,
    imageColor: user?.imageColor,
  };
};

const isProtectedRoute = (pathname) => {
  return (
    pathname !== "/" && pathname !== "/a/signin" && pathname !== "/a/signup"
  );
};
