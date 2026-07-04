import "./PlayerCard.css";

function PlayerCard({ player, onScoreChange }) {
  return (
    <li className="player-card">
      <img src={player.photoUrl} alt={player.name} />

      <div className="player-info">
        <h4>{player.name}</h4>

        <p className="player-score">Score: {player.score}</p>

        <div className="score-actions">
          <button onClick={() => onScoreChange(player.id, player.score + 1)}>
            +1
          </button>

          <button onClick={() => onScoreChange(player.id, player.score - 1)}>
            -1
          </button>
        </div>
      </div>
    </li>
  );
}

export default PlayerCard;