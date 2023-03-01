const express = require("express");
const app = express();
const { cloudinary } = require("./utils/cloudinary");


app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.get("/images", async function (req, res) {
  const resources = await cloudinary.v2.search
    .expression("resource_type:image")
    .sort_by("public_id", "desc")
    .execute()
  
    const result = resources.resources;
      res.send(result);
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
