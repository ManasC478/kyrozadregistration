import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { sign, verify } from "jsonwebtoken";
// import { createUser } from "../../../lib/dbUser";

// initialize the auth
export default NextAuth({
  // configure the google provider
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        name: { label: "Business Name", type: "text" },
        image: { label: "Image", type: "text" },
      },
      async authorize(credentials) {
        console.log("in authorize nextauth");
        // throw new Error("test");
        console.log("credentials", credentials);

        // if (credentials.email && credentials.name) {
        //   return {
        //     email: credentials.email,
        //     name: credentials.name,
        //     id: credentials.id,
        //   };
        // }
        if (
          credentials.id &&
          credentials.email &&
          credentials.name &&
          credentials.image
        ) {
          return {
            id: credentials.id,
            email: credentials.email,
            name: credentials.name,
            image: credentials.image,
          };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    // A secret to use for key generation. Defaults to the top-level `secret`.
    secret: process.env.JWT_SECRET,

    // The maximum age of the NextAuth.js issued JWT in seconds.
    // Defaults to `session.maxAge`.
    maxAge: 60 * 60 * 24 * 30,

    // You can define your own encode/decode functions for signing and encryption
    // if you want to override the default behavior.
    // async encode({ secret, token, maxAge }) {
    //   console.log("in jwt encode");
    //   console.log(token);
    //   console.log(secret);
    //   console.log(maxAge);
    //   // sign the jwt token
    //   const encodedToken = sign(token, secret, { expiresIn: maxAge });
    //   console.log(encodedToken);
    //   return encodedToken;
    // },

    // async decode({ secret, token }) {
    //   const verify = jwt.verify(token, secret);
    //   return verify;
    // },
    encryption: true,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account }) {
      console.log("in signin nextauth");
      console.log("signIn account: ", account);
      console.log("user: ", user);
      // if (account.provider === "google") {
      //   try {
      //     const { name, email, image } = user;

      //     // create user using google provider
      //     await createUser(name, email, image);

      //     return true;
      //   } catch (error) {
      //     console.log(error.message);
      //     return "/a/signup";
      //   }
      // return profile.email_verified && profile.email.endsWith("@gmail.com");
      // }

      return true; // Do different verification for other providers that don't have `email_verified`
    },
    // redirect(prop) {
    //   console.log("in redirect nextauth");
    //   // console.log(prop);
    //   // if (url.startsWith(baseUrl)) return url;
    //   // // Allows relative callback URLs
    //   // else if (url.startsWith("/")) return new URL(url, baseUrl).toString();
    //   // return baseUrl;
    // },
    async jwt({ user, account, token, isNewUser }) {
      // console.log("in jwt nextauth");
      // console.log("token: ", token);
      // console.log("user: ", user);
      // console.log("account: ", account);
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      // console.log("in session nextauth");
      // console.log("token: ", token);
      // console.log("session: ", session);
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
      }
      return session;
    },
  },
  pages: {
    signIn: "/a/signin",
    error: "/500 ",
  },
});
