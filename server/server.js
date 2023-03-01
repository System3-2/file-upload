const express = require("express");
const app = express();
const { cloudinary } = require("./utils/cloudinary");
const { Pool } = require("pg");

const pool = new Pool({
  user: "oloja",
  password: "Wardprowse26",
  host: "localhost",
  database: "image",
  port: 5432,
});

pool
  .connect()
  .then(() => {
    console.log(`connected`);
  })
  .catch((err) => {
    console.error(err);
  });

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.get("/", function (req, res) {
  res.send("hello");
});

app.post("/api/upload", async (req, res) => {
  try {
    const fileStr = req.body.data;
    const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "dev_setups",
    });
    console.log(uploadedResponse);
    res.json({ msg: "success", image: uploadedResponse.url });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log("server started at " + PORT);
});
