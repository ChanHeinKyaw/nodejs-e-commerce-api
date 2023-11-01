const bodyParser = require("body-parser");
const express = require("express");
const app = express();

app.use(bodyParser.json());

let users = [
  { id: "1", name: "Mg Mg", email: "mgmg@gmail.com" },
  { id: "2", name: "Ag Ag", eAail: "agag@gmail.com" },
];

app.get("/", (req, res) => {
  res.status(200).json({ One: "Good" });
});

app.get("/user", (req, res) => {
  res.status(200).json({ id: "1", name: "Mg Mg", email: "mgmg@gmail.com" });
});

app.get("/users", (req, res) => {
  res.status(200).json({ users: users });
});

app.get("/user/:id", (req, res) => {
  const user = users.find((user) => user.id === req.params.id);
  res.status(200).json({ user: user });
});

app.get("/user/:id/:name", (req, res) => {
  res.status(200).json({ id: req.params.id, name: req.params.name });
});

app.post("/user", (req, res) => {
  users.push(req.body);
  res.status(200).json({ users: users });
});

app.patch("/user/:id", (req, res) => {
  const user = users.find((user) => user.id === req.params.id);
  user.name = req.body.name;
  user.email = req.body.email;

  res.status(200).json({ users: users });
});

app.delete("/user/:id", (req, res) => {
  users = users.filter((user) => user.id != req.params.id);

  res.status(200).json({ users: users });
});

app.listen(3000, () => console.log("We Are Running at port 3000"));
