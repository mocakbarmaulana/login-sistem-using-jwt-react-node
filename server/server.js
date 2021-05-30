require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Routes
app.use("/user", require("./routes/UserRouter"));

// Connected to mongodb
const MONGO_URI = `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0-shard-00-00.syfgb.mongodb.net:27017,cluster0-shard-00-01.syfgb.mongodb.net:27017,cluster0-shard-00-02.syfgb.mongodb.net:27017/${process.env.MONGODB_NAME}?ssl=true&replicaSet=atlas-s5da2v-shard-0&authSource=admin&retryWrites=true&w=majority`;
mongoose.connect(
  MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) throw err;
    console.log("Connected to mongodb..");
  }
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
