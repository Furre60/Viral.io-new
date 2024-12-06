
// Import required modules
const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Initialize Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_URL.split('@')[1].split(':')[0],
  api_key: process.env.CLOUDINARY_URL.split(':')[1].split('@')[0],
  api_secret: process.env.CLOUDINARY_URL.split(':')[2].split('@')[0],
});

// Set up Express server
const app = express();
const port = process.env.PORT || 3000;

// Multer setup for handling file uploads
const storage = multer.memoryStorage(); // Files will be stored in memory
const upload = multer({ storage: storage });

// Endpoint to upload profile picture to Cloudinary
app.post('/upload-profile-picture', upload.single('profile_picture'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }

  // Upload to Cloudinary
  cloudinary.uploader.upload_stream(
    { resource_type: 'auto', public_id: `profile_pics/${req.file.originalname}` },
    (error, result) => {
      if (error) {
        return res.status(500).send(error);
      }
      res.status(200).json({ message: 'File uploaded successfully', data: result });
    }
  ).end(req.file.buffer); // Send the file buffer to Cloudinary
});

// Basic route to test the server
app.get('/', (req, res) => {
  res.send('Welcome to the Cloudinary Upload API');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
