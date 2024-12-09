import { v2 as cloudinary } from 'cloudinary';

// Cloudinary Configuration
cloudinary.config({ 
    cloud_name: 'dosbc3syf', 
    api_key: '151686182797663', 
    api_secret: 'FdG-kKrlU7JbpMzmlkp_zzkirFI'  // Your actual API secret
});

// Upload an image from a URL (example)
export async function uploadImage(imageUrl) {
    try {
        const uploadResult = await cloudinary.uploader.upload(imageUrl, {
            public_id: 'shoes'  // The public ID for your uploaded image
        });
        console.log('Upload Result:', uploadResult);
        return uploadResult;
    } catch (error) {
        console.error('Error uploading image:', error);
    }
}

// Optimize delivery (Auto-format and quality adjustment)
export function getOptimizedUrl(publicId) {
    return cloudinary.url(publicId, {
        fetch_format: 'auto',  // Automatically choose format based on the browser
        quality: 'auto'        // Automatically adjust quality based on connection
    });
}

// Transform the image: auto-crop to square with specific width and height
export function getAutoCroppedUrl(publicId) {
    return cloudinary.url(publicId, {
        crop: 'auto',       // Automatically crop the image
        gravity: 'auto',    // Automatically choose the center of the image
        width: 500,         // Width of the image
        height: 500         // Height of the image (square)
    });
}
