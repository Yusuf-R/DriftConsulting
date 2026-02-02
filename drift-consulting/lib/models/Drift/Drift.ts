// lib/models/Drift.ts
import mongoose, { Schema, models, Model } from 'mongoose';
import { IDrift } from '@/lib/types';

// Define schema
const DriftSchema = new Schema<IDrift>(
    {
        name: {
            type: String,
            trim: true,
            maxlength: [100, 'Name cannot exceed 100 characters'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            select: false,
        },
        role: {
            type: String,
            enum: ['superAdmin', 'admin', 'support'],
            default: 'support',
            required: [true, 'Role is required'],
        },
        image: {
            type: String,
            default: '',
        },
        provider: {
            type: String,
            enum: ['credentials', 'google'],
            default: 'credentials',
        },
        providerId: {
            type: String,
            sparse: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        lastLogin: {
            type: Date,
            default: null,
        },
        emailVerified: {
            type: Boolean,
            default: false,
        },
        resetPasswordOTP: {
            type: String,
            select: false,
        },
        resetPasswordOTPExpires: {
            type: Date,
            select: false,
        },
        resetPasswordAttempts: {
            type: Number,
            default: 0,
            select: false,
        },
    },
    {
        timestamps: true,
        toJSON: {
            transform: function (doc, ret) {
                delete ret.password;
                delete ret.resetPasswordOTP;
                delete ret.resetPasswordOTPExpires;
                delete ret.resetPasswordAttempts;
                return ret;
            },
        },
        toObject: {
            transform: function (doc, ret) {
                delete ret.password;
                delete ret.resetPasswordOTP;
                delete ret.resetPasswordOTPExpires;
                delete ret.resetPasswordAttempts;
                return ret;
            },
        },
    }
);

// Create indexes for better query performance
DriftSchema.index({ email: 1 }, { unique: true });
DriftSchema.index({ role: 1, isActive: 1 });
DriftSchema.index({ provider: 1, providerId: 1 });


// Proper model compilation check
const Drift: Model<IDrift> = models.Drift || mongoose.model<IDrift>('Drift', DriftSchema);

export default Drift;