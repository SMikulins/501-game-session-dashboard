import "./MatchHistory.css";

function MatchHistory({ sessions, onSelect }) {
    return (
      <section className="flex flex-col gap-6">
        <h2 className="text-2xl font-bold">Match History</h2>
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