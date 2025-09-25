// urlShortener.js
const express = require("express");
const crypto = require("crypto");

const app = express();
const PORT = 3000;

app.use(express.json());

const urls = {}; // in-memory store: shortCode -> original URL

// Generate a short code
function generateCode() {
  return crypto.randomBytes(3).toString("hex"); // 6-char code
}

// Create a short URL
app.post("/shorten", (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: "Missing URL" });
  }

  const code = generateCode();
  urls[code] = url;

  res.json({ shortUrl: `http://localhost:${PORT}/${code}` });
});

// Redirect to original URL
app.get("/:code", (req, res) => {
  const originalUrl = urls[req.params.code];
  if (originalUrl) {
    res.redirect(originalUrl);
  } else {
    res.status(404).json({ error: "URL not found" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 URL Shortener running at http://localhost:${PORT}`);
});
