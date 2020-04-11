const express = require("express");
const connectDB = require("./config/db");

const path = require("path");

const app = express();

//Connect Database
connectDB();

// Init middleware
app.use(express.json({ exteded: false }));

// Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/post"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // set static folder

  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.senFile(path.resolve(__dirname, "client", "nuild", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
