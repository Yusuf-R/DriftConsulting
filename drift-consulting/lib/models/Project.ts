import mongoose, { Schema, models, Model, Document } from 'mongoose';

export interface IProject extends Document {
    title: string;
    slug: string;
    category: 'residential' | 'hospitality' | 'institutional' | 'commercial' | 'government';
    location: string;
    description: string;
    client?: string;
    duration: string;
    value: string;
    status: 'completed' | 'ongoing' | 'planned';

    // Images
    featuredImage: string;
    gallery: string[];

    // Statistics
    stats: {
        key: string;
        value: string;
    }[];

    // Case Study Details
    challenge?: string;
    approach?: string;
    outcome?: string;

    // Key Features
    features: string[];

    // Team & Partners
    teamSize?: number;
    partners?: string[];

    // Dates
    startDate?: Date;
    completionDate?: Date;

    // SEO
    metaTitle?: string;
    metaDescription?: string;

    // Display
    featured: boolean;
    order: number;
    published: boolean;

    createdAt: Date;
    updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
    {
        title: {
            type: String,
            required: [true, 'Project title is required'],
            trim: true,
            maxlength: [200, 'Title cannot exceed 200 characters'],
        },
        slug: {
            type: String,
            required: [true, 'Slug is required'],
            unique: true,
            trim: true,
            lowercase: true,
        },
        category: {
            type: String,
            required: [true, 'Category is required'],
            enum: ['residential', 'hospitality', 'institutional', 'commercial', 'government'],
        },
        location: {
            type: String,
            required: [true, 'Location is required'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            trim: true,
            maxlength: [500, 'Description cannot exceed 500 characters'],
        },
        client: {
            type: String,
            trim: true,
        },
        duration: {
            type: String,
            required: [true, 'Duration is required'],
        },
        value: {
            type: String,
            required: [true, 'Project value is required'],
        },
        status: {
            type: String,
            enum: ['completed', 'ongoing', 'planned'],
            default: 'completed',
        },
        featuredImage: {
            type: String,
            required: [true, 'Featured image is required'],
        },
        gallery: [{
            type: String,
        }],
        stats: [{
            key: { type: String, required: true },
            value: { type: String, required: true },
        }],
        challenge: {
            type: String,
            maxlength: [2000, 'Challenge cannot exceed 2000 characters'],
        },
        approach: {
            type: String,
            maxlength: [2000, 'Approach cannot exceed 2000 characters'],
        },
        outcome: {
            type: String,
            maxlength: [2000, 'Outcome cannot exceed 2000 characters'],
        },
        features: [{
            type: String,
        }],
        teamSize: {
            type: Number,
            min: 1,
        },
        partners: [{
            type: String,
        }],
        startDate: {
            type: Date,
        },
        completionDate: {
            type: Date,
        },
        metaTitle: {
            type: String,
            maxlength: [60, 'Meta title cannot exceed 60 characters'],
        },
        metaDescription: {
            type: String,
            maxlength: [160, 'Meta description cannot exceed 160 characters'],
        },
        featured: {
            type: Boolean,
            default: false,
        },
        order: {
            type: Number,
            default: 0,
        },
        published: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

// Indexes
ProjectSchema.index({ slug: 1 });
ProjectSchema.index({ category: 1, published: 1 });
ProjectSchema.index({ featured: 1, order: 1 });
ProjectSchema.index({ status: 1 });

const Project: Model<IProject> = models.Project || mongoose.model<IProject>('Project', ProjectSchema);

export default Project;