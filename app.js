require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fileUpload = require("express-fileupload");
const { saveFile, saveFiles, deleteFile } = require("./utils/gallery");

app.use(bodyParser.json());
app.use(fileUpload());

//Single File
// app.post("/cats", saveFile, (req, res, next) => {
//   res.status(200).send({ result: req.body });
// });

//Multiple Files
// app.post("/cats", saveFiles, (req, res, next) => {
//   res.status(200).send({ result: req.body });
// });

//Delete File
// app.post("/cats", (req, res, next) => {
//   deleteFile("1698854093789_02_lady__jea_3.jpg");
//   res.status(200).send({ result: req.body });
// });

app.use((err, req, res, next) => {
  err.status = err.status || 404;
  res.status(err.status).json({ con: false, msg: err.message });
});

app.use("*", (req, res) => {
  res.status(200).send({ con: true, msg: "No route with that request!" });
});

app.listen(process.env.PORT, () =>
  console.log(`We Are Running at port ${process.env.PORT}`)
);
