const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Store URLs
const urlDatabase = {};
let idCounter = 0;

app.post('/shorten', (req, res) => {
  const originalUrl = req.body.url;
  const shortId = (idCounter++).toString(36); // Simple base-36 encoding
  urlDatabase[shortId] = originalUrl;

  res.json({ shortUrl: `http://localhost:/${shortId}` });
});

app.get('/:id', (req, res) => {
  const originalUrl = urlDatabase[req.params.id];
  if (originalUrl) {
    res.redirect(originalUrl);
  } else {
    res.status(404).send('Not Found');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
