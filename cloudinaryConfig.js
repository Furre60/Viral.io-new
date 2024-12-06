// cloudinaryConfig.js
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: 'dosbc3syf',
  api_key: '151686182797663',
  api_secret: 'YOUR_API_SECRET', // Replace with your actual API secret
});

module.exports = cloudinary;
