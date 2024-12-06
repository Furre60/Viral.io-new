// server/uploadProfilePicture.js
const cloudinary = require('./cloudinaryConfig');

// Function to upload the profile picture to Cloudinary
function uploadProfilePicture(file) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(file, { folder: 'profile_pics' }, function(error, result) {
      if (error) {
        reject(error);
      } else {
        resolve(result.url);  // The URL of the uploaded image
      }
    });
  });
}

module.exports = uploadProfilePicture;
