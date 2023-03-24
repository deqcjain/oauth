const express = require("express");
const cors = require("cors");
var axios =require('axios')

const CLIENT_ID = "137236bb1d91f4e96e2b";
const CLIENT_SECRET = "7f519504df4c14e3f06e5577ec65e0b916ed9faf";
const GITHUB_URL = "https://github.com/login/oauth/access_token";

const app = express();
app.use(cors({ credentials: true, origin: true }));

app.get("/oauth/redirect", (req, res) => {
  axios({
    method: "POST",
    url: `${GITHUB_URL}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${req.query.code}`,
    headers: {
      Accept: "application/json",
    },
  }).then((response) => {
    res.redirect(
      `http://localhost:3000?access_token=${response.data.access_token}`
    );
  });
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});