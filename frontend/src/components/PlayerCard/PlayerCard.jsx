function PlayerCard({ player, onScoreChange }) {
    return (
      <li>
        <img
          src={player.photoUrl}
          alt={player.name}
          width="80"
          height="80"
        />
  
        <div>
          <h4>{player.name}</h4>
          <p>Score: {player.score}</p>
  
          <button onClick={() => onScoreChange(player.id, player.score + 1)}>
            +1
          </button>
  
          <button onClick={() => onScoreChange(player.id, player.score - 1)}>
            -1
          </button>
        </div>
      </li>
    );
  }
  
  export default PlayerCard;