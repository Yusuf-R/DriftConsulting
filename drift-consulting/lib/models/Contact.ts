// /lib/models/Contact.ts
import mongoose, { Schema, models, Model, Document } from 'mongoose';

export interface IContact extends Document {
    name: string;
    email: string;
    projectType: 'residential' | 'hospitality' | 'institutional' | 'commercial' | 'government';
    location: string;
    scope: string;
    phone?: string;
    budget?: string;
    timeline?: string;
    status: 'new' | 'contacted' | 'in-discussion' | 'converted' | 'closed';
    notes?: string;
    source: string;
    ipAddress?: string;
    userAgent?: string;
    createdAt: Date;
    updatedAt: Date;
}

const ContactSchema = new Schema<IContact>(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            maxlength: [100, 'Name cannot exceed 100 characters'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            trim: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
        },
        projectType: {
            type: String,
            required: [true, 'Project type is required'],
            enum: {
                values: ['residential', 'hospitality', 'institutional', 'commercial', 'government'],
                message: '{VALUE} is not a valid project type',
            },
        },
        location: {
            type: String,
            required: [true, 'Location is required'],
            trim: true,
            maxlength: [200, 'Location cannot exceed 200 characters'],
        },
        scope: {
            type: String,
            required: [true, 'Project scope is required'],
            trim: true,
            maxlength: [2000, 'Scope cannot exceed 2000 characters'],
        },
        phone: {
            type: String,
            trim: true,
            maxlength: [20, 'Phone number cannot exceed 20 characters'],
        },
        budget: {
            type: String,
            trim: true,
        },
        timeline: {
            type: String,
            trim: true,
        },
        status: {
            type: String,
            enum: ['new', 'contacted', 'in-discussion', 'converted', 'closed'],
            default: 'new',
        },
        notes: {
            type: String,
            maxlength: [1000, 'Notes cannot exceed 1000 characters'],
        },
        source: {
            type: String,
            default: 'website',
        },
        ipAddress: {
            type: String,
        },
        userAgent: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

// Indexes for better query performance
ContactSchema.index({ email: 1 });
ContactSchema.index({ status: 1 });
ContactSchema.index({ createdAt: -1 });
ContactSchema.index({ projectType: 1, status: 1 });

// Virtual for formatted date
ContactSchema.virtual('formattedDate').get(function () {
    return this.createdAt.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
});

const Contact: Model<IContact> = models.Contact || mongoose.model<IContact>('Contact', ContactSchema);

export default Contact;