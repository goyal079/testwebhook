require("dotenv").config(); // enables loading .env vars
const express = require("express");
const app = express();
const { Magic } = require("@magic-sdk/admin");
const cors = require("cors");

// Initiating Magic instance for server-side methods
const magic = new Magic(process.env.MAGIC_SECRET_KEY);

// Allow requests from client-side
app.use(cors({ origin: process.env.CLIENT_URL }));

app.post("/api/login", async (req, res) => {
  try {
    const didToken = req.headers.authorization.slice(7);
    await magic.token.validate(didToken);
    res.status(200).json({ authenticated: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const listener = app.listen(process.env.PORT || 8080, () =>
  console.log("Listening on port " + listener.address().port)
);
