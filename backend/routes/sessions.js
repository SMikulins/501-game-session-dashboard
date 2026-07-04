const express = require("express");
const db = require("../database/database");

const router = express.Router();

// GET /sessions
router.get("/", (req, res) => {
  const query = `
    SELECT id, status, videoUrl, createdAt
    FROM sessions
    ORDER BY createdAt DESC
  `;

  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch sessions" });
    }

    res.json(rows);
  });
});

// GET /sessions/:id
router.get("/:id", (req, res) => {
  const sessionId = req.params.id;

  db.get(
    `SELECT id, status, videoUrl, createdAt FROM sessions WHERE id = ?`,
    [sessionId],
    (err, session) => {
      if (err) {
        return res.status(500).json({ error: "Failed to fetch session" });
      }

      if (!session) {
        return res.status(404).json({ error: "Session not found" });
      }

      db.all(
        `SELECT id, sessionId, name, score, photoUrl FROM players WHERE sessionId = ?`,
        [sessionId],
        (err, players) => {
          if (err) {
            return res.status(500).json({ error: "Failed to fetch players" });
          }

          res.json({
            ...session,
            players,
          });
        }
      );
    }
  );
});

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

// POST /sessions
router.post("/", (req, res) => {
  const { status, videoUrl, players } = req.body;

  if (!status || !Array.isArray(players)) {
    return res.status(400).json({
      error: "Status and players are required",
    });
  }

  const sessionQuery = `
    INSERT INTO sessions (status, videoUrl, createdAt)
    VALUES (?, ?, datetime('now'))
  `;

  db.run(sessionQuery, [status, videoUrl || null], function (err) {
    if (err) {
      return res.status(500).json({
        error: "Failed to create session",
      });
    }

    const sessionId = this.lastID;

    const playerQuery = `
      INSERT INTO players (sessionId, name, score, photoUrl)
      VALUES (?, ?, ?, ?)
    `;

    players.forEach((player) => {
      db.run(playerQuery, [
        sessionId,
        player.name,
        player.score || 0,
        player.photoUrl || null,
      ]);
    });

    res.status(201).json({
      message: "Session created successfully",
      sessionId,
    });
  });
});

module.exports = router;