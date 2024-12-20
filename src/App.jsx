/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
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
  const [confetti, setConfetti] = useState(false);
  const [choiceOne, setChoiceOne] = useState(null); 
  const [choiceTwo, setChoiceTwo] = useState(null); 

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random(),matched: false }));
    setCards(shuffledCards);
    setTurns(0);
    // setConfetti(false);
    setScore(0);
    setGameStarted(true);
  };

  // compare both selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
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
  };

  if (!gameStarted) {
    return (
      <div className="landing-screen">
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

  console.log(cards);

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={() => setGameStarted(false)}>Reset</button>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
