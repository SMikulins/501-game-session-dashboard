const express = require("express");
const db = require("../database/database");

const router = express.Router();

// PATCH /sessions/:id/players/:playerId
router.patch("/:id/players/:playerId", (req, res) => {
    const { id, playerId } = req.params;
    const { score } = req.body;
  
    if (typeof score !== "number") {
      return res.status(400).json({
        error: "Score must be a number",
      });
    }
  
    const query = `
      UPDATE players
      SET score = ?
      WHERE id = ? AND sessionId = ?
    `;
  
    db.run(query, [score, playerId, id], function (err) {
      if (err) {
        return res.status(500).json({
          error: "Failed to update score",
        });
      }
  
      if (this.changes === 0) {
        return res.status(404).json({
          error: "Player not found for this session",
        });
      }
  
      res.json({
        message: "Score updated successfully",
        playerId: Number(playerId),
        sessionId: Number(id),
        score,
      });
    });
  });

module.exports = router;