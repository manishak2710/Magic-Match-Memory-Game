const Instructions = () => {
  return (
    <div className="Instruction container fade-in ">
      <h2 className="instructions-heading">Instructions</h2>
      <ul className="instructions-list">
        <li>Click on a card to flip it over.</li>
        <li>Try to find the matching card.</li>
        <li>If two cards match, they will stay flipped over.</li>
        <li>If two cards do not match, they will flip back over.</li>
        <li>Keep playing until all cards are matched! You have 45 seconds.</li>
      </ul>
    </div>
  );
};
export default Instructions;
