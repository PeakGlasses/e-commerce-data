/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
const path = require("path");
const cors = require("cors");

module.exports = express();

// Middleware
module.exports.use(cors());
module.exports.use(express.json());

// Serve React frontend
module.exports.use(express.static(path.join(__dirname, "../../public")));

// Example route
module.exports.get("/api/hello", (req: any, res: any) => {
  res.json({ message: "Hello from Express API! 🚀" });
});

// Catch-all to serve React frontend on any route
module.exports.get("*", (req: any, res: any) => {
  res.sendFile(path.join(__dirname, "../../public", "index.html"));
});
