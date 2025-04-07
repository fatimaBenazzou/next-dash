import dbConnect from "@/lib/dbConnection";
import User from "@/models/user";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { type AuthOptions, getServerSession } from "next-auth";
export const authOptions = {
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                try {
                    if (!parsedCredentials.success) throw new Error("Invalid credentials");
                    const { email, password } = parsedCredentials.data;

                    await dbConnect();
                    const user = await User.findOne({ email });

                    if (!user) throw new Error("User not found");

                    const passwordMatch = await user.comparePassword(password);
                    if (!passwordMatch) throw new Error("Email or Password is not correct");

                    return {
                        id: user._id.toString(),
                        ...user.toUser(),
                    };
                } catch (e) {
                    console.error((e as Error).message);
                    return null;
                }
            },
        }),
    ],
    pages: {
        signIn: "/auth/login",
    },
    callbacks: {
        async jwt({ token, user, trigger }) {
            if (user) {
                if (trigger === "update") {
                    console.log("JWT token called");
                }
                token.user = {
                    // id: user.id.toString(),
                    ...user,
                };
            }

            return token;
        },
        async session({ session, token }) {
            if (token?.user) {
                session.user = {
                    ...session.user,
                    ...token.user,
                };
            }

            return session;
        },
    },
    // secret: process.env.NEXTAUTH_SECRET,
} satisfies AuthOptions;
export const getSession = async () => {
    const session = await getServerSession(authOptions);

    if (session) {
        return session.user as UserI;
    } else {
        return null;
    }
};
