import PlayerCard from "../PlayerCard/PlayerCard";

function SessionOverview({ session, onScoreChange }) {
  return (
    <section>
      <h2>Session Overview</h2>

      <p>
        <strong>Session ID:</strong> {session.id}
      </p>

      <p>
        <strong>Status:</strong> {session.status}
      </p>

      <h3>Players</h3>

      <ul>
        {session.players.map((player) => (
          <PlayerCard
            key={player.id}
            player={player}
            onScoreChange={onScoreChange}
          />
        ))}
      </ul>
    </section>
  );
}

export default SessionOverview;