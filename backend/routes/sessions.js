const express = require("express");
const db = require("../database/database");

const router = express.Router();

// GET /sessions/:id
router.get("/:id", (req, res) => {
    const sessionId = req.params.id;
  
    const sessionQuery = `
      SELECT 
        id,
        status,
        videoUrl,
        createdAt
      FROM sessions
      WHERE id = ?
    `;
  
    const playersQuery = `
      SELECT 
        id,
        sessionId,
        name,
        score,
        photoUrl
      FROM players
      WHERE sessionId = ?
    `;
  
    db.get(sessionQuery, [sessionId], (err, session) => {
      if (err) {
        return res.status(500).json({
          error: "Failed to fetch session",
        });
      }
  
      if (!session) {
        return res.status(404).json({
          error: "Session not found",
        });
      }
  
      db.all(playersQuery, [sessionId], (err, players) => {
        if (err) {
          return res.status(500).json({
            error: "Failed to fetch players",
          });
        }
  
        res.json({
          ...session,
          players,
        });
      });
    });
  });

module.exports = router;