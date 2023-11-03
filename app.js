require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");

mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`);
app.use(bodyParser.json());
app.use(fileUpload());

const categoryRouter = require("./routes/category");
const subcatRouter = require("./routes/subcat");
const childcatRouter = require("./routes/childcat");

app.use("/cats", categoryRouter);
app.use("/subcats", subcatRouter);
app.use("/childcats", childcatRouter);

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
