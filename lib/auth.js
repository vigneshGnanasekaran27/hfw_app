import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./prisma";
import EmailProvider from "next-auth/providers/email";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    EmailProvider({
      maxAge: 10 * 60, // 10 minutes
      sendVerificationRequest: async ({ identifier, url, provider, token }) => {
        // Use the token as the OTP (6 digits)
        const otp = token;
        await resend.emails.send({
          from: process.env.EMAIL_FROM,
          to: identifier,
          subject: "Your OTP Code",
          html: `<p>Your OTP code is <b>${otp}</b>. It is valid for 10 minutes.</p>`
        });
      },
      generateVerificationToken: async () => {
        // Generate a 6-digit numeric OTP
        return Math.floor(100000 + Math.random() * 900000).toString();
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      console.log("session", session);
      console.log("token", token);
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};

export default NextAuth(authOptions); 