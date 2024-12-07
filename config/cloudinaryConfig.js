// config/cloudinaryConfig.js
require('dotenv').config();
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary using values from .env file
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

module.exports = cloudinary;
