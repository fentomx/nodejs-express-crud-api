const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: "url not found",
    method: req.method,
    path: req.originalUrl,
  });
});

module.exports = app;
