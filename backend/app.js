const express = require("express");
const cors = require("cors");
const db = require("./database/database");
const sessionsRoutes = require("./routes/sessions");

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

app.use("/sessions", sessionsRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Game Session Dashboard API is running",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});