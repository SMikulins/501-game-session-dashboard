const express = require("express");
const db = require("../database/database");

const router = express.Router();

// GET /sessions
router.get("/", (req, res) => {
  const query = `
    SELECT 
      id,
      status,
      videoUrl,
      createdAt
    FROM sessions
    ORDER BY createdAt DESC
  `;

  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({
        error: "Failed to fetch sessions",
      });
    }

    res.json(rows);
  });
});

module.exports = router;