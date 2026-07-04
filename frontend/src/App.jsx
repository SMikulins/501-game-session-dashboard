import { useEffect, useState } from "react";
import { getSessionById, getSessions, updatePlayerScore } from "./services/api";
import MatchHistory from "./components/MatchHistory/MatchHistory";
import PlayerCard from "./components/PlayerCard/PlayerCard";

function App() {
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);

  useEffect(() => {
    getSessions()
      .then((data) => {
        setSessions(data);

        if (data.length > 0) {
          return getSessionById(data[0].id);
        }
      })
      .then((sessionData) => {
        if (sessionData) {
          setSelectedSession(sessionData);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  function handleSelectSession(sessionId) {
    getSessionById(sessionId)
      .then((data) => setSelectedSession(data))
      .catch((error) => console.error(error));
  }

  async function handleScoreChange(playerId, newScore) {
    try {
      await updatePlayerScore(selectedSession.id, playerId, newScore);

      const updatedSession = await getSessionById(selectedSession.id);
      setSelectedSession(updatedSession);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main>
      <h1>Game Session Dashboard</h1>

      <MatchHistory
        sessions={sessions}
        onSelect={handleSelectSession}
      />

      {selectedSession && (
        <section>
          <h2>Session Overview</h2>

          <p>
            <strong>Session ID:</strong> {selectedSession.id}
          </p>

          <p>
            <strong>Status:</strong> {selectedSession.status}
          </p>

          <h3>Players</h3>

          <ul>
            {selectedSession.players.map((player) => (
              <PlayerCard key={player.id} player={player} onScoreChange={handleScoreChange} />
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}

export default App;