import { useEffect, useState } from "react";
import { getSessions } from "./services/api";

function App() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    getSessions()
      .then((data) => setSessions(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <main>
      <h1>Game Session Dashboard</h1>

      <ul>
        {sessions.map((session) => (
          <li key={session.id}>
            Session #{session.id} — {session.status}
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;