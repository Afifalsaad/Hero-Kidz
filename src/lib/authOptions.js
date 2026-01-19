import { loginUser } from "@/actions/server/auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { collections, dbConnect } from "./dbConnect";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials, req) {
        const user = await loginUser(credentials);
        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log({ user, account, profile, email, credentials });

      const isExists = await dbConnect(collections.USER).findOne({
        email: user.email,
        // provider: account?.provider,
      });
      if (isExists) {
        return true;
      }

      const newUser = {
        provider: account?.provider,
        name: user.name,
        email: user.email,
        image: user.image,
        role: "user",
      };

      const result = await dbConnect(collections.USER).insertOne(newUser);

      return result.acknowledged;
    },
    // async redirect({ url, baseUrl }) {
    //   return baseUrl
    // },
    async session({ session, token, user }) {
      if (token) {
        session.role = token?.role;
        session.email = token?.email;
      }
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log("from jwt test", account);
      if (user) {
        const dbUser = await dbConnect(collections.USER).findOne({
          email: user.email,
        });
        token.role = dbUser?.role;
        token.email = dbUser?.email;
      }
      return token;
    },
  },
};
