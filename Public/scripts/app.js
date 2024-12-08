const express = require('express');
const multer = require('multer');
const cloudinary = require('./config/cloudinaryConfig'); // Cloudinary configuration
const User = require('./src/models/userModel'); // User model to store profile info
const { checkAuthenticated } = require('./src/middleware/authMiddleware'); // Authentication check

const app = express();
const upload = multer(); // Multer middleware for file uploads

// Route to handle profile picture upload
app.post('/upload-profile-picture', checkAuthenticated, upload.single('profilePicture'), async (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded');

  try {
    const result = await cloudinary.uploader.upload(req.file.buffer, {
      folder: 'profile_pictures',
      use_filename: true,
      unique_filename: false,
    });

    const user = await User.findById(req.user.id); // Assuming req.user.id contains the logged-in user's ID
    user.profilePicture = result.secure_url; // Save the Cloudinary URL
    await user.save();

    res.status(200).json({
      message: 'Profile picture uploaded successfully',
      imageUrl: result.secure_url,
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).send('Error uploading image');
  }
});
