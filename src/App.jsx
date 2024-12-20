/* eslint-disable no-unused-vars */

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { cardImages } from "./data/data.json";
import "./App.css";
import SingleCard from "./components/SingleCard";

const App = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  const showConfetti = useMemo(() => score === 6 && cards.every((card) => card.matched) , [score, cards]);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random(), matched: false }));
    setCards(shuffledCards);
    setGameStarted(true);

  };

  // compare both selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.id === choiceOne.id || card.id === choiceTwo.id) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
        setScore((prevScore) => prevScore + 1);
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  const onReset = () => {
    window.location.reload();
  };

  if (!gameStarted) {
    return (
      <div className="landing-screen">
      {<Confetti  />}
        <h1>{'Memory Game'}</h1>
        <motion.button
          className="start-button"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={shuffleCards}
        >
          Start Game
        </motion.button>
      </div>
    );
  }


  return (
    <div className="App">
      {showConfetti && <Confetti />}
      <h1 className={ showConfetti ? "won": ''} >{ !showConfetti  ? 'Memory Game': 'Congratulations'}</h1>
      <div className="score-container" >
        <div>
          <span>Score: {score}</span>
          <span>Turns: {turns}</span>
        </div>
        <button onClick={onReset}>Reset</button>
      </div>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
