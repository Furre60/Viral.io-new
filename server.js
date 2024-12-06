// server.js
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const cloudinary = require('./cloudinaryConfig'); // Import the Cloudinary config
const uploadProfilePicture = require('./uploadProfilePicture'); // Import the file upload function

const app = express();
const port = 3000;

// Enable CORS
app.use(cors());

// Multer configuration for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.static('public')); // Serve static files

// Upload route
app.post('/upload-profile-picture', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    const fileBuffer = req.file.buffer;
    const fileName = req.file.originalname;

    // Upload the image to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload_stream(
      { public_id: fileName, resource_type: 'image' },
      (error, result) => {
        if (error) {
          console.error('Error uploading to Cloudinary:', error);
          return res.status(500).json({ error: 'Error uploading to Cloudinary' });
        }

        // Send the image URL back to the client
        res.json({ url: result.secure_url });
      }
    );

    // Pipe the file buffer to Cloudinary's upload stream
    fileBuffer.pipe(cloudinaryResponse);
  } catch (error) {
    console.error('Error handling the upload:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
