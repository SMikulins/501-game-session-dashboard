import { useEffect, useState } from "react";
import { getSessionById, getSessions, updatePlayerScore } from "./services/api";
import MatchHistory from "./components/MatchHistory/MatchHistory";
import SessionOverview from "./components/SessionOverview/SessionOverview";
import "./styles/App.css";

function App() {
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadInitialData() {
      try {
        setLoading(true);
  
        const sessionsData = await getSessions();
        setSessions(sessionsData);
  
        if (sessionsData.length > 0) {
          const firstSession = await getSessionById(sessionsData[0].id);
          setSelectedSession(firstSession);
        }
      } catch (error) {
        setError("Something went wrong while loading sessions.");
        console.error(error);
      } finally {
        setLoading(false);
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

  if (loading) {
    return <p>Loading dashboard...</p>;
  }
  
  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <>
      <h1>
        Game Session Dashboard
      </h1>
  
      <div className="dashboard">
  
        <div className="panel col-span-1 sm:col-span-4">
          <MatchHistory
            sessions={sessions}
            onSelect={handleSelectSession}
          />
        </div>
  
        <div className="panel col-span-1 sm:col-span-8">
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