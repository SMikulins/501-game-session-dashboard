import PlayerCard from "../PlayerCard/PlayerCard"; 
import StatusBadge from "../StatusBadge/StatusBadge";
import VideoPlayer from "../VideoPlayer/VideoPlayer";

function SessionOverview({ session, onScoreChange }) {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold">Session Overview</h2>

      <div className="flex items-center flex-wrap gap-6 sm:gap-10 ">
        <p>
          <strong>Session ID:</strong> {session.id}
        </p>

        <p>
          <strong>Status:</strong> <StatusBadge status={session.status} />
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <h3>Players</h3>
        <ul className="grid md:grid-cols-2 gap-4 list-none p-0">
          {session.players.map((player) => (
            <PlayerCard
              key={player.id}
              player={player}
              onScoreChange={onScoreChange}
            />
          ))}
        </ul>
      </div>

      <VideoPlayer videoUrl={session.videoUrl} />
    </section>
  );
}

export default SessionOverview;