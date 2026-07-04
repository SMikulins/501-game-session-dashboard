import { useEffect, useState } from "react";
import { getSessionById, getSessions, updatePlayerScore } from "./services/api";
import MatchHistory from "./components/MatchHistory/MatchHistory";
import SessionOverview from "./components/SessionOverview/SessionOverview";
import "./styles/App.css";

function App() {
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);

  useEffect(() => {
    async function loadInitialData() {
      try {
        const sessionsData = await getSessions();
        setSessions(sessionsData);
  
        if (sessionsData.length > 0) {
          const firstSession = await getSessionById(sessionsData[0].id);
          setSelectedSession(firstSession);
        }
      } catch (error) {
        console.error(error);
      }
    }
  
    loadInitialData();
  }, []);
  
  useEffect(() => {
    if (!selectedSession) return;
  
    const intervalId = setInterval(async () => {
      try {
        const updatedSession = await getSessionById(selectedSession.id);
        setSelectedSession(updatedSession);
      } catch (error) {
        console.error(error);
      }
    }, 5000);
  
    return () => clearInterval(intervalId);
  }, [selectedSession?.id]);

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