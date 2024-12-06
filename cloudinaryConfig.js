const cloudinary = require('./cloudinaryConfig');

function uploadProfilePicture(file) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(file, { folder: 'profile_pics' }, function(error, result) {
      if (error) {
        reject(error);
      } else {
        resolve(result.url);  // This is the URL of the uploaded image
      }
    });
  });
}
