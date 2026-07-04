import { useEffect, useState } from "react";
import { getSessionById, getSessions, updatePlayerScore } from "./services/api";
import MatchHistory from "./components/MatchHistory/MatchHistory";
import SessionOverview from "./components/SessionOverview/SessionOverview";
import "./styles/App.css";

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
    <>
      <h1 style={{ textAlign: "center" }}>
        Game Session Dashboard
      </h1>
  
      <div className="dashboard">
  
        <div className="panel">
          <MatchHistory
            sessions={sessions}
            onSelect={handleSelectSession}
          />
        </div>
  
        <div className="panel">
          {selectedSession && (
            <SessionOverview
              session={selectedSession}
              onScoreChange={handleScoreChange}
            />
          )}
        </div>
  
      </div>
    </>
  );
}

export default App;