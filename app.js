const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const swagger = require("./swagger");

const bookRoutes = require("./routes/bookRoutes");
const memberRoutes = require("./routes/memberRoutes");

dotenv.config();

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Handle the root URL
app.get("/", (req, res) => {
  res.send("Welcome to the Library API!");
});

// Use routes
app.use("/api/books", bookRoutes);
app.use("/api/members", memberRoutes);

// Setup Swagger
swagger(app);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
