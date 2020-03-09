const express = require("express");
const shortid = require("shortid");

const server = express();

server.use(express.json());

// Initialize Server
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`\n** API listening on http://localhost:${PORT} **\n`);
});
