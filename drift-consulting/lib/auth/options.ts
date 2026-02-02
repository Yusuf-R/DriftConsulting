// lib/auth/options.ts
import type { NextAuthConfig } from "next-auth";
import type { User, Account, Profile } from "next-auth";
import type { JWT } from "next-auth/jwt";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import dbClient from "@/lib/mongoDB/index";
import Drift from "@/lib/models/Drift/Drift";

const options: NextAuthConfig = {
    secret: process.env.AUTH_SECRET,
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID!,
            clientSecret: process.env.AUTH_GOOGLE_SECRET!,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            },
            // httpOptions: {
            //     timeout: 1200000,
            // },
        }),

        Credentials({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                try {
                    if (!credentials?.email || !credentials?.password) {
                        return null;
                    }

                    await dbClient.connect();

                    const user = await Drift.findOne({
                        email: (credentials.email as string).toLowerCase()
                    });

                    if (!user) {
                        return null;
                    }

                    return {
                        id: user._id.toString(),
                        email: user.email,
                        name: user.name,
                        role: user.role.toLowerCase(),
                    };
                } catch (error) {
                    console.error("Session creation error:", error);
                    return null;
                } finally {
                    await dbClient.close();
                }
            }
        }),
    ],
    pages: {
        signIn: '/admin/auth/login',
        error: '/admin/auth/error',
    },
    session: {
        strategy: "jwt" as const,
        maxAge: 90 * 24 * 60 * 60,
        updateAge: 24 * 60 * 60,
    },
    callbacks: {
        async signIn({user, account, profile}: {
            user: User;
            account?: Account | null | undefined;
            profile?: Profile;
        }) {
            if (account?.provider === "google") {
                try {
                    await dbClient.connect();

                    let existingUser = await Drift.findOne({
                        email: (profile?.email || user.email)?.toLowerCase()
                    });

                    if (!existingUser) {
                        existingUser = await Drift.create({
                            email: (profile?.email || user.email)?.toLowerCase(),
                            name: profile?.name || user.name || "",
                            image: (profile as any)?.picture || user.image,
                            provider: "google",
                            emailVerified: true,
                            providerId: (profile as any)?.sub,
                            role: "support",
                            isActive: true,
                            lastLogin: new Date(),
                        });
                    } else {
                        existingUser.lastLogin = new Date();
                        if (!existingUser.provider || existingUser.provider === "credentials") {
                            existingUser.provider = "google";
                            existingUser.providerId = (profile as any)?.sub;
                        }
                        if (!existingUser.image && (profile as any)?.picture) {
                            existingUser.image = (profile as any).picture;
                        }
                        await existingUser.save();
                    }

                    // Extend user object
                    (user as any).id = existingUser._id.toString();
                    (user as any).role = existingUser.role;

                    return true;
                } catch (error) {
                    console.error("Google sign-in error:", error);
                    return false;
                } finally {
                    await dbClient.close();
                }
            }
            return true;
        },

        async jwt({token, user}: {
            token: JWT;
            user: User;
        }) {
            if (user) {
                // Fix 2: Add check for user.id and provide fallback
                token.id = user.id || "";
                token.role = (user as any).role || "support";
                token.email = user.email || "";
            }
            return token;
        },

        async session({session, token}: {
            session: any;
            token: JWT;
        }) {
            if (token && session.user) {
                session.user.id = token.id as string;
                session.user.role = token.role;
                session.user.email = token.email as string;
            }
            return session;
        },
    }
};

export default options;