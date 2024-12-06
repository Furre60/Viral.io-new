// server/server.js
const express = require('express');
const multer = require('multer');
const uploadProfilePicture = require('./uploadProfilePicture'); // Import the function

const app = express();
const port = 3000;

// Set up Multer middleware to handle file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.static('public')); // Serve static files (e.g., HTML, CSS, JS)

// Define the route for uploading profile picture
app.post('/upload-profile-picture', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    const fileBuffer = req.file.buffer;
    const fileName = req.file.originalname;

    // Upload the image to Cloudinary
    const cloudinaryUrl = await uploadProfilePicture(fileBuffer);
    
    // Send back the Cloudinary image URL to the client
    res.json({ url: cloudinaryUrl });
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    res.status(500).json({ error: 'Error uploading profile picture.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
