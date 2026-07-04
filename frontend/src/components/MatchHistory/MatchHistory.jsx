import "./MatchHistory.css";

function MatchHistory({ sessions, onSelect }) {
    return (
      <section className="flex flex-col ZZgap-4">
        <h2>Match History</h2>
        <div className="relative after:sm:hidden after:pointer-events-none after:content-[''] after:block after:h-10 after:w-full after:absolute after:bottom-0 after:left-0 after:bg-linear-to-t after:from-white after:to-transparent">
          <ul className="match-list">
            {sessions.map((session) => (
              <li key={session.id}>
                <button onClick={() => onSelect(session.id)}>
                  Session #{session.id} — {session.status}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }
  
  export default MatchHistory;