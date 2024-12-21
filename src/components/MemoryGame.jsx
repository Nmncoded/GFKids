/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import SingleCard from "./SingleCard";
import { playSound, SOUND_EFFECTS } from "../helpers";


const MemoryGame = ({cards, setCards}) => {
  const [score, setScore] = useState(0);
  const [turns, setTurns] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  const showConfetti = useMemo(() => score === (cards.length/2) && cards.every((card) => card.matched) , [score, cards]);



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
        playSound(SOUND_EFFECTS.match);
        resetTurn();
        setScore((prevScore) => prevScore + 1);
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    if(!showConfetti)return;
    setTimeout(() =>     
      playSound(SOUND_EFFECTS.won)
    , 100);
  }, [showConfetti]);

  // handle a choice
  const handleChoice = (card) => {
    playSound(SOUND_EFFECTS.flip);
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

export default MemoryGame;
