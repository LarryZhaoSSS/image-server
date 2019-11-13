const express = require("express");
const multer = require("multer");
const cors = require("cors");
const upload = multer({ dest: "yyy/" });

const app = express();

app.post("/upload", cors(), upload.single("file"), function(req, res, next) {
  console.log(req.file);
  res.send("here");
});
app.get("/", cors(), function(req, res, next) {
  res.json({ key: "hello" });
});
app.get("/preview/:key", cors(), function(req, res, next) {
  console.log(req.params.key);
  res.sendFile(
    `yyy/${req.params.key}`,
    {
      root: __dirname,
      headers: {
        "Content-Type": "image/jpeg"
      }
    },
    error => {
      if (error) {
        res.status(404).send("Not found");
      }
    }
  );
});
var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log(port);
  console.log("Example app listening on port 3000!");
});
