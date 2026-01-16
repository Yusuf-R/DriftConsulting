import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Generate optimized Cloudinary image URL
 * @param publicId - Cloudinary public ID or full URL
 * @param options - Transformation options
 */
export function getCloudinaryUrl(
    publicId: string,
    options: {
        width?: number;
        height?: number;
        crop?: 'fill' | 'fit' | 'scale' | 'limit';
        quality?: 'auto' | number;
        format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png';
        gravity?: 'auto' | 'face' | 'center';
        aspectRatio?: string;
    } = {}
): string {
    const {
        width,
        height,
        crop = 'fill',
        quality = 'auto',
        format = 'auto',
        gravity = 'auto',
        aspectRatio,
    } = options;

    const transformations: string[] = [];

    if (width) transformations.push(`w_${width}`);
    if (height) transformations.push(`h_${height}`);
    if (aspectRatio) transformations.push(`ar_${aspectRatio}`);
    transformations.push(`c_${crop}`);
    transformations.push(`q_${quality}`);
    transformations.push(`f_${format}`);
    transformations.push(`g_${gravity}`);

    // Add performance optimizations
    transformations.push('dpr_auto'); // Device pixel ratio
    transformations.push('fl_progressive'); // Progressive loading

    const transformation = transformations.join(',');

    return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${transformation}/${publicId}`;
}

/**
 * Get responsive image srcset for Cloudinary images
 */
export function getResponsiveSrcSet(publicId: string, widths: number[] = [640, 768, 1024, 1280, 1536, 1920]) {
    return widths
        .map((width) => {
            const url = getCloudinaryUrl(publicId, { width, quality: 'auto', format: 'auto' });
            return `${url} ${width}w`;
        })
        .join(', ');
}

/**
 * Upload image to Cloudinary
 * (For admin dashboard or content management)
 */
export async function uploadToCloudinary(
    file: File | string,
    folder: string = 'construction-projects'
): Promise<{ url: string; publicId: string }> {
    try {
        const result = await cloudinary.uploader.upload(
            typeof file === 'string' ? file : await fileToBase64(file),
            {
                folder,
                resource_type: 'auto',
                overwrite: false,
                unique_filename: true,
            }
        );

        return {
            url: result.secure_url,
            publicId: result.public_id,
        };
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        throw new Error('Failed to upload image');
    }
}

/**
 * Convert File to base64
 */
async function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
}

/**
 * Delete image from Cloudinary
 */
export async function deleteFromCloudinary(publicId: string): Promise<boolean> {
    try {
        await cloudinary.uploader.destroy(publicId);
        return true;
    } catch (error) {
        console.error('Cloudinary delete error:', error);
        return false;
    }
}

/**
 * Cloudinary image loader for Next.js Image component
 */
export const cloudinaryLoader = ({ src, width, quality }: { src: string; width: number; quality?: number }) => {
    // If src is already a full URL, extract the public ID
    let publicId = src;

    if (src.includes('cloudinary.com')) {
        const parts = src.split('/upload/');
        if (parts.length > 1) {
            publicId = parts[1].split('/').slice(1).join('/');
        }
    }

    return getCloudinaryUrl(publicId, {
        width,
        quality: quality || 'auto',
        format: 'auto',
    });
};