const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files (styles, scripts, images, etc.) from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Serve the home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Serve login page
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'Login.html'));
});

// Serve signup page
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'SignUp.html'));
});

// Serve other views like manage profile
app.get('/manage-profile', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'manage-profile.html'));
});

// Fallback route for 404
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', '404.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
