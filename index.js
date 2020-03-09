//Imports and initializing
const express = require("express");
const shortid = require("shortid");

const server = express();

server.use(express.json());

//Stores users
let users = [];

//Endpoints
server.get("/", (req, res) => {
  res.status(200).json({ api: "running..." });
});

server.post("/api/users", (req, res) => {
  const { name, bio } = req.body;

  if (name && bio) {
    const newUser = req.body;
    newUser.id = shortid.generate();

    users.push(newUser);

    res.status(201).json(newUser);
  } else {
    res
      .status(400)
      .json({ errorMessage: "Please provide a name and bio for the user" });
  }
});

server.get("/api/users", (req, res) => {
  res.status(200).json(users);
});

// Initialize Server
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`\n** API listening on http://localhost:${PORT} **\n`);
});
