const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const jobRoutes = require("./routes/job");
const applicationRoutes = require("./routes/application");
const authRoutes = require("./routes/auth");
const testRoutes = require("./routes/test");
const app = express();   // ✅ app created BEFORE using it

app.use(cors());
app.use(express.json());
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", testRoutes);
app.use("/api/users", require("./routes/user"));
app.use("/api/resume", require("./routes/resume"));
app.use("/api/admin", require("./routes/admin"));
app.get("/", (req, res) => {
  res.send("Smart Placement API Running");
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch((err) => console.log(err));
