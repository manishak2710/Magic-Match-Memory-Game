import { useState, useEffect } from "react";
import "./App.css";
import { Header, Instructions, Match, SingleCard, Timer } from "./components";
//import {button, GameContainer, instructions,SingleCard} from "./styles";
const cardImages = [
  { src: "/img/helmet-1.png", stat: "", matched: false },
  { src: "/img/potion-1.png", stat: "", matched: false },
  { src: "/img/ring-1.png", stat: "", matched: false },
  { src: "/img/scroll-1.png", stat: "", matched: false },
  { src: "/img/shield-1.png", stat: "", matched: false },
  { src: "/img/sword-1.png", stat: "", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setchoiceOne] = useState(null);
  const [choiceTwo, setchoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [matches, setMatches] = useState(0);
  const [timeLimit, setTimeLimit] = useState(45);
  const [gameOver, setGameOver] = useState(false);

  //shuffling cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setchoiceOne(null);
    setchoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
    setTimeLimit(45);
    setGameOver(false);
  };

  //handling choice
  const handleChoice = (card) => {
    choiceOne ? setchoiceTwo(card) : setchoiceOne(card);
  };
  //compare choices
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        console.log(matches);
        setMatches(matches + 1);
        console.log(matches);
        if (matches === 5) setGameOver(true);
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 800);
      }
    }
  }, [choiceOne, choiceTwo]);
  // console.log(cards);
  //reset choice and increase turns
  const resetTurn = () => {
    setchoiceOne(null);
    setchoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };
  //start game automatically
  useEffect(() => {
    shuffleCards();
  }, []);

  //time limit
  useEffect(() => {
    if (timeLimit === 0) {
      setGameOver(true);
    } else {
      const timer = setTimeout(() => {
        setTimeLimit((prevTime) => (matches === 5 ? prevTime : prevTime - 1));
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLimit]);

  useEffect(() => {
    if (gameOver === true) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [gameOver]);

  return (
    <div className="App">
      <div className="head">
        <Header shuffleCards={shuffleCards} turns={turns} />
        <Instructions />
        <Timer matches={matches} timeLimit={timeLimit} gameOver={gameOver} />
      </div>

      <div className="game-container">
        <div className="board-container fade-in">
          <div className="card-grid">
            {cards.map((card) => (
              <div>
                <SingleCard
                  key={card.id}
                  card={card}
                  handleChoice={handleChoice}
                  flipped={
                    card === choiceOne || card === choiceTwo || card.matched
                  }
                  disabled={disabled}
                />
                <Match handleChoice={handleChoice} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
