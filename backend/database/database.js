const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./game.db", (err) => {
  if (err) {
    console.error("Database connection failed:", err.message);
  } else {
    console.log("Connected to SQLite database");
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      status TEXT NOT NULL,
      videoUrl TEXT,
      createdAt TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS players (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sessionId INTEGER NOT NULL,
      name TEXT NOT NULL,
      score INTEGER DEFAULT 0,
      photoUrl TEXT,
      FOREIGN KEY (sessionId) REFERENCES sessions(id)
    )
  `);

  db.get("SELECT COUNT(*) AS count FROM sessions", (err, row) => {
    if (err) {
      console.error(err.message);
      return;
    }

    if (row.count === 0) {
      db.run(`
        INSERT INTO sessions (status, videoUrl, createdAt)
        VALUES 
        ('active', '/videos/game-1.mp4', datetime('now')),
        ('completed', '/videos/game-2.mp4', datetime('now')),
        ('completed', '/videos/game-3.mp4', datetime('now'))
      `);

      db.run(`
        INSERT INTO players (sessionId, name, score, photoUrl)
        VALUES
        (1, 'Alice Carter', 12, '/photos/alice.jpg'),
        (1, 'Ben Smith', 8, '/photos/ben.jpg'),
        (2, 'Mia Johnson', 20, '/photos/mia.jpg'),
        (2, 'Noah Brown', 16, '/photos/noah.jpg'),
        (3, 'Lily Wilson', 14, '/photos/lily.jpg'),
        (3, 'Oscar Taylor', 18, '/photos/oscar.jpg')
      `);

      console.log("Sample data inserted");
    }
  });
});

module.exports = db;