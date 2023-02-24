import React from "react";

export default function Header({ shuffleCards, turns }) {
  return (
    <div className="container fade-in ">
      <h1 className="head">Welcome to "Magic Match"</h1>
      <p className="text-container">Test your memory with magic match🪄 </p>
      <button className="new-game-button" onClick={shuffleCards}>
        New Game
      </button>
      <p>Turns: {turns} </p>
    </div>
  );
}
