const express = require("express");
const fetch = require("node-fetch");
const app = express();

const CLIENT_ID = "YOUR_GITHUB_CLIENT_ID";
const CLIENT_SECRET = "YOUR_GITHUB_CLIENT_SECRET";
const REDIRECT_URI = "YOUR_BACKEND_URL/callback";

app.get("/callback", async (req, res) => {
  const code = req.query.code;
  if (!code) {
    return res.status(400).send("Missing code parameter");
  }

  // Exchange code for access token
  const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code: code,
    }),
  });

  const tokenData = await tokenResponse.json();
  if (tokenData.error) {
    return res.status(400).send(tokenData.error_description);
  }

  // Redirect back to the web page with the token
  res.redirect(`YOUR_FRONTEND_URL?token=${tokenData.access_token}`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
