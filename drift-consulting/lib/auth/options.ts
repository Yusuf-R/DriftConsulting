// lib/auth/options.ts
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import dbClient from "@/lib/mongoDB/index";
import Drift from "@/lib/models/Drift/Drift";

interface loginCredential {
    email: string;
    password: string;
}

interface googleUser {
    id: string;
    role: string;
    name: string;
    email: string;
    image: string;
    provider: string;
    providerId: string;
    adminRole: string;
}

interface googleProfile {
    email: string;
    name: string;
    sub: string;
    picture: string;
}

interface googleAccount {
    provider: string;
    providerAccountId: string;
}

const options = {
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
            }
        }),

        // This is ONLY for creating sessions after successful API validation
        Credentials({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials: loginCredential) => {
                try {
                    await dbClient.connect();

                    // Just fetch the user - validation already done in API route
                    const user = await Drift.findOne({
                        email: credentials.email.toLowerCase()
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
        strategy: "jwt",
        maxAge: 90 * 24 * 60 * 60,
        updateAge: 24 * 60 * 60,
    },
    callbacks: {
        async signIn({ user, account, profile }: { user: googleUser, account: googleAccount, profile: googleProfile }) {
            if (account?.provider === "google") {
                try {
                    await dbClient.connect();

                    let existingUser = await Drift.findOne({
                        email: profile?.email?.toLowerCase()
                    });

                    if (!existingUser) {
                        existingUser = await Drift.create({
                            email: profile?.email?.toLowerCase(),
                            name: profile?.name || "",
                            image: profile?.picture || user.image,
                            provider: "google",
                            providerId: profile?.sub,
                            role: "support",
                            isActive: true,
                            lastLogin: new Date(),
                        });
                    } else {
                        existingUser.lastLogin = new Date();
                        if (!existingUser.provider || existingUser.provider === "credentials") {
                            existingUser.provider = "google";
                            existingUser.providerId = profile?.sub;
                        }
                        if (!existingUser.image && profile?.picture) {
                            existingUser.image = profile.picture;
                        }
                        await existingUser.save();
                    }

                    user.id = existingUser._id.toString();
                    user.role = existingUser.role;

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

        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role || "support";
                token.email = user.email;
            }
            return token;
        },

        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id as string;
                session.user.role = token.role as string;
                session.user.email = token.email as string;
            }
            return session;
        },
    },
    events: {
        async signIn({ user, isNewUser }) {
            console.log(`User signed in: ${user.email}, New user: ${isNewUser}`);
        },
    },
};

export default options;