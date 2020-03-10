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
  } else if (!name || !bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide a name and bio for the user" });
  } else {
    res.status(500).json({
      errorMessage: "There was an error while saving the user to the database"
    });
  }
});

server.get("/api/users", (req, res) => {
  if (!users) {
    res
      .status(500)
      .json({ errorMessage: "The users information could not be retrieved." });
  } else {
    res.status(200).json(users);
  }
});

// Working on GET by Id
server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find(x => x.id === id);

  if (!id) {
    res
      .status(500)
      .json({ errorMessage: "The users information could not be retrieved." });
  } else if (user === undefined) {
    res.status(400).json({ errorMessage: "Could not find user." });
  } else {
    res.status(200).json(user);
  }
});

// Initialize Server
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`\n** API listening on http://localhost:${PORT} **\n`);
});
