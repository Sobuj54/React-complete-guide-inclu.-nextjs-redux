function GameOver({ winner, onRestart }) {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {winner && <p>You've won {winner}!</p>}
      {!winner && <p>It&apos; a draw.</p>}
      <p>
        <button onClick={onRestart}>Rematch</button>
      </p>
    </div>
  );
}

export default GameOver;
