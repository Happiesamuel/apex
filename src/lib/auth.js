import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { createNotification, getUsersByEmail } from "./action";
import { format } from "date-fns";
import { formatRelativeTime } from "./utils";
import apexLogo from "@/../public/asset/apex-logo.png";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      credentials: {
        username: {
          label: "Email",
          type: "text",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      authorize: async (credentials) => {
        try {
          const existingUser = await getUsersByEmail(credentials.email);
          if (!existingUser) {
            throw new Error("User not found.");
          }
          return {
            id: existingUser["$id"],
            name: existingUser.fullName,
            email: existingUser.email,
          };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    authorized: async ({ auth, request }) => {
      return !!auth?.user;
    },
    async signIn({ user }) {
      try {
        const formattedDate = format(
          new Date(),
          "yyyy-MM-dd'T'HH:mm:ss.SSSXXX"
        );
        const existedUser = await getUsersByEmail(user.email);
        console.log(existedUser);

        if (!existedUser) {
          await createUser({
            email: user.email,
            fullName: user.name,
            countryFlag: "",
            password: "",
            welcomePay: false,
            accountNumber: generateAccountNumber(),
            totalBalance: 0,
            image: user.image,
            nationality: "",
          });
        } else {
          await createNotification({
            title: "Welcome Back",
            message: `You logged in to your Apex account ${formatRelativeTime(
              formattedDate
            )}`,
            senderName: "Apex",
            image: apexLogo.src,
            status: false,
            senderId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
            recieverId: existedUser.$id,
            recieverName: existedUser.fullName,
          });
        }
        return true;
      } catch {
        return false;
      }
    },

    async session({ session }) {
      try {
        const users = await getUsersByEmail(session.user.email);
        session.user.userId = users.$id;
      } catch (error) {
        console.error("Error fetching user data:", error);
      }

      return session;
    },
  },
  pages: {
    signIn: "/auth/sign-in",
  },
};

export const { auth, signIn, signOut, handlers } = NextAuth(authConfig);
