// lib/models/RateLimit.ts
import mongoose from "mongoose";

const RateLimitSchema = new mongoose.Schema({
    identifier: {
        type: String,
        required: true,
        index: true,
    },
    type: {
        type: String,
        enum: ['signup', 'login'],
        required: true,
    },
    attempts: {
        type: Number,
        default: 0,
    },
    lastAttempt: {
        type: Date,
        default: Date.now,
    },
    lockedUntil: {
        type: Date,
        default: null,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400, // Auto-delete after 24 hours
    },
});

RateLimitSchema.index({ identifier: 1, type: 1 }, { unique: true });

export default mongoose.models.RateLimit || mongoose.model("RateLimit", RateLimitSchema);