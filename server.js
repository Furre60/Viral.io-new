const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_URL.split('@')[1].split(':')[0],
  api_key: process.env.CLOUDINARY_URL.split(':')[1].split('@')[0],
  api_secret: process.env.CLOUDINARY_URL.split(':')[2].split('@')[0],
});

const app = express();
const port = process.env.PORT || 3000;

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post('/upload-profile-picture', upload.single('profile_picture'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }

  cloudinary.uploader.upload_stream(
    { resource_type: 'auto', public_id: `profile_pics/${req.file.originalname}` },
    (error, result) => {
      if (error) {
        return res.status(500).send(error);
      }
      res.status(200).json({ message: 'File uploaded successfully', data: result });
    }
  ).end(req.file.buffer);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
