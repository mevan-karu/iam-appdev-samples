const express = require('express');

const app = express();
app.use(express.json());

// Protected API endpoint
app.get('/api/hello', (req, res) => {
  // Access authenticated user information from req.user
  res.json({ message: 'Hello from protected endpoint.' });
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});