import PlayerCard from "../PlayerCard/PlayerCard"; 
import StatusBadge from "../StatusBadge/StatusBadge";
import VideoPlayer from "../VideoPlayer/VideoPlayer";

function SessionOverview({ session, onScoreChange }) {
  return (
    <section>
      <h2>Session Overview</h2>

      <p>
        <strong>Session ID:</strong> {session.id}
      </p>

      <p>
        <strong>Status:</strong> <StatusBadge status={session.status} />
      </p>

      <h3>Players</h3>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {session.players.map((player) => (
          <PlayerCard
            key={player.id}
            player={player}
            onScoreChange={onScoreChange}
          />
        ))}
      </ul>

      <VideoPlayer videoUrl={session.videoUrl} />
    </section>
  );
}

export default SessionOverview;