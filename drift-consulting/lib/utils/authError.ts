// lib/utils/authErrors.ts

export const AUTH_ERRORS = {
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
    LOGIN_EMAIL_RATE_LIMIT_EXCEEDED: {
        title: "Account Locked",
        message: "This account is temporarily locked due to multiple failed login attempts. Please try again later.",
        duration: 7000,
    },
    LOGIN_IP_RATE_LIMIT_EXCEEDED: {
        title: "Too Many Login Attempts",
        message: "Too many login attempts from your location. Please try again later.",
        duration: 7000,
    },
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

    // Default
    DEFAULT: {
        title: "Authentication Error",
        message: "Something went wrong. Please try again.",
        duration: 4000,
    },
};

export function getAuthError(errorCode: string | null) {
    if (!errorCode) return AUTH_ERRORS.DEFAULT;
    return AUTH_ERRORS[errorCode as keyof typeof AUTH_ERRORS] || AUTH_ERRORS.DEFAULT;
}