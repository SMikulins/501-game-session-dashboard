import "./MatchHistory.css";

function MatchHistory({ sessions, onSelect }) {
    return (
      <section>
        <h2>Match History</h2>
  
        <ul className="match-list">
          {sessions.map((session) => (
            <li key={session.id}>
              <button onClick={() => onSelect(session.id)}>
                Session #{session.id} — {session.status}
              </button>
            </li>
          ))}
        </ul>
      </section>
    );
  }
  
  export default MatchHistory;