import { useEffect, useState, createContext, useContext } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import fetcher from "../../utils/fetcher";
import { getStripe } from "../stripe-client";

const UserContext = createContext();

export const UserContextProvider = (props) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLoadingData, setIsloadingData] = useState(false);
  const [user, setUser] = useState(null);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    if (status === "authenticated") {
      // redirect user to dashboard if user is authenticated and is on login route
      if (isProtectedRoute(router.pathname) === "non-auth protected") {
        router.replace("/dashboard");
      }
    } else if (status === "unauthenticated") {
      // redirect to login if user is not authenticated and is on a protected route
      if (isProtectedRoute(router.pathname) === "auth protected") {
        router.replace("/a/signin");
      }
    }
  }, [status, router.pathname]);

  // every time session or status changes update user info
  useEffect(async () => {
    if (status === "authenticated") {
      setIsloadingData(true);
      try {
        const res = await fetcher(`/api/a/getUser?id=${session?.user?.id}`, {
          method: "GET",
        });

        if (res.status >= 500) {
          throw { status: res.status, message: res.message };
        }
        const formattedUser = formatUser(res.user);
        setUser(formattedUser);
        setSubscription(res.subscription);
        setIsloadingData(false);
      } catch (error) {
        console.log(
          "/lib/CustomHooks/useUser/UserContextProvider",
          error.message
        );
        throw new Error(error.message);
      }
    }
  }, [status]);

  // sorts the api responses and creates signin session if code is 2xx
  const validateResponseAndSignIn = async (res) => {
    // check for http errors
    if (res.status >= 500) {
      throw { status: res.status, message: res.message };
    } else if (res.status >= 400) {
      throw { status: res.status, message: res.message };
    } else if (res.status >= 200 && res.status < 300) {
      // login user
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
    // creates and validates user
    const res = await fetcher("/api/a/createUser", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify(values),
    });

    return await validateResponseAndSignIn(res);
  };

  // updates the user info
  const updateUser = async (values) => {
    const res = await fetcher("/api/a/updateUser", {
      method: "PATCH",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify(values),
    });

    // check for http errors
    // incomplete - can't use the validateResponseAndSignIn() because if http code is 2xx then the method will signin
    // we don't want to signin again
    if (res.status >= 500) {
      throw { status: res.status, message: res.message };
    } else if (res.status >= 400) {
      throw { status: res.status, message: res.message };
    } else if (res.status >= 200 && res.status < 300) {
    }
  };

  // creates api checkout and if successful redirects to stripe checkout page
  const createCheckout = async (data) => {
    const res = await fetcher("/api/create-checkout-session", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify({ id: session?.user?.id, ...data }),
    });

    // check for http errors
    if (res.status >= 500) {
      throw { status: res.status, message: res.message };
    } else if (res.status >= 400) {
      throw { status: res.status, message: res.message };
    } else if (res.status >= 200 && res.status < 300) {
      const stripe = await getStripe();
      stripe?.redirectToCheckout({ sessionId: res.sessionId });
    }
  };

  const value = {
    session,
    user,
    subscription,
    isLoading: status === "loading" || isLoadingData,
    signUp,
    logIn,
    signOutUser: () => {
      setUser(null);
      router.replace("/a/signin");
      return signOut();
    },
    updateUser,
    createCheckout,
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
  switch (pathname) {
    case "/a/signin":
    case "/a/signup":
      // protected for only users that are not authenticated
      return "non-auth protected";
    case "/":
    case "/subscriptions":
      // unprotected for authenticated or unauthenticated users
      return "unprotected";
    default:
      // protected for only users that are authenticated
      return "auth protected";
  }
};
