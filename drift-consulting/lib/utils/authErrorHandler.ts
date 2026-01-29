// lib/utils/authErrorHandler.ts

export interface AuthError {
    code: string;
    title: string;
    message: string;
    duration: number;
    timeRemaining?: string;
}

export function parseAuthError(errorString: string | undefined): AuthError {
    if (!errorString) {
        return {
            code: "UNKNOWN",
            title: "Error",
            message: "An unknown error occurred.",
            duration: 4000,
        };
    }

    // Check if error contains time remaining (for rate limits)
    const rateLimitMatch = errorString.match(/RATE_LIMIT_(EMAIL|IP):(.+)/);
    if (rateLimitMatch) {
        const type = rateLimitMatch[1];
        const timeRemaining = rateLimitMatch[2];

        return {
            code: `RATE_LIMIT_${type}`,
            title: type === "EMAIL" ? "Account Locked" : "Too Many Attempts",
            message: type === "EMAIL"
                ? `This account is temporarily locked due to multiple failed login attempts. Please try again in ${timeRemaining}.`
                : `Too many login attempts from your location. Please try again in ${timeRemaining}.`,
            duration: 7000,
            timeRemaining,
        };
    }

    // Map error codes to user-friendly messages
    const errorMap: Record<string, Omit<AuthError, 'code'>> = {
        // Signup errors
        SIGNUP_RATE_LIMIT_EXCEEDED: {
            title: "Too Many Signup Attempts",
            message: "You've exceeded the signup limit. Please try again later.",
            duration: 7000,
        },
        USER_ALREADY_EXISTS: {
            title: "Account Already Exists",
            message: "An account with this email already exists. Please login instead.",
            duration: 5000,
        },
        SIGNUP_FAILED: {
            title: "Signup Failed",
            message: "Unable to create your account. Please try again.",
            duration: 4000,
        },
        SIGNUP_ERROR: {
            title: "Signup Error",
            message: "An error occurred during signup. Please try again.",
            duration: 4000,
        },

        // Login errors
        INVALID_CREDENTIALS: {
            title: "Invalid Credentials",
            message: "Invalid email or password. Please check and try again.",
            duration: 4000,
        },
        ACCOUNT_DEACTIVATED: {
            title: "Account Deactivated",
            message: "Your account has been deactivated. Please contact support.",
            duration: 5000,
        },
        USE_GOOGLE_SIGNIN: {
            title: "Use Google Sign In",
            message: "This account uses Google authentication. Please sign in with Google.",
            duration: 5000,
        },
        LOGIN_ERROR: {
            title: "Login Failed",
            message: "An error occurred during login. Please try again.",
            duration: 4000,
        },

        // NextAuth default error
        CredentialsSignin: {
            title: "Authentication Failed",
            message: "Invalid credentials. Please try again.",
            duration: 4000,
        },
    };

    const error = errorMap[errorString] || {
        title: "Error",
        message: errorString,
        duration: 4000,
    };

    return {
        code: errorString,
        ...error,
    };
}