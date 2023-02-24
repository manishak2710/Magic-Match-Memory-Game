import React from "react";

export default function Timer({ matches, gameOver, timeLimit }) {
  let won = false;
  let lost = false;
  if (matches === 6 && gameOver) won = true;
  if (timeLimit === 0 && !won) lost = true;
  console.log(won + " " + matches);
  return (
    <div>
      <div>Time left: {timeLimit} seconds</div>
      {gameOver ? <div>Game over!</div> : <div>Keep playing!</div>}
      {won ? <h5>You Won the game!</h5> : null}
      {lost ? <h5>Try again!</h5> : null}
    </div>
  );
}
