// server.js
const express = require('express');
const path = require('path');
const cloudinary = require('./config/cloudinaryConfig'); // Import Cloudinary config
const app = express();
const port = 3000;

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Example route for uploading an image to Cloudinary
app.post('/upload', (req, res) => {
  const file = req.files.file; // Assuming you're using a middleware like `express-fileupload` for file uploads
  cloudinary.uploader.upload(file.tempFilePath, (error, result) => {
    if (error) {
      return res.status(500).send('Upload failed');
    }
    res.status(200).send(`File uploaded successfully: ${result.url}`);
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
