import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

// mongodb imports
import { isEmailInUse } from "../../../lib/dbAuth";

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
      },
      async authorize(credentials) {
        const user = await isEmailInUse(credentials.email);
        console.log(user);
        return user;
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
    // async encode({ secret, token, maxAge }) {},
    // async decode({ secret, token }) {},
    encryption: true,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn(prop) {
      console.log(prop);
      if (prop.account.provider === "google") {
        // return profile.email_verified && profile.email.endsWith("@gmail.com");
      }
      return true; // Do different verification for other providers that don't have `email_verified`
    },
    async jwt({ user, token, account }) {
      console.log("user", user);
      console.log("account", account);
      if (user) {
        token.id = user._id || user.id;
      }
      return token;
    },
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/a/signup",
  },
});
