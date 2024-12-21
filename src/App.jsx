import { useState } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import "./App.css";
import DDActivityGame from "./components/DDActivityGame.jsx";
import MemoryGame from "./components/MemoryGame.jsx";
import { playSound, SOUND_EFFECTS } from "./helpers/index.js";
import { cardImages } from "./data/data.json";
import TaskState from "./context/state.jsx";


const App = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [cards, setCards] = useState([]);


  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random(), matched: false }));
    setCards(shuffledCards);

  };

  const startGame = (type) => {
    playSound(SOUND_EFFECTS.laugh);
    if(type === 'memory') {
      shuffleCards();
    }
    setGameStarted(type);
  };

  if (!gameStarted) {
    return (
      <div className="landing-screen">
        {<Confetti />}
        <div>
          <h1>{"Activity Game"}</h1>
          <motion.button
            className="start-button"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => startGame("activity")}
          >
            Start Game
          </motion.button>
        </div>
        <div>
          <h1>{"Memory Game"}</h1>
          <motion.button
            className="start-button"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => startGame("memory")}
          >
            Start Game
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <>
    {
      gameStarted === 'memory' &&
      <MemoryGame cards={cards} setCards={setCards} />
    }
    {
      gameStarted === 'activity' &&
      (
        <TaskState>
          <DDActivityGame />
        </TaskState>
      )
    }
    
    </>
  );
};

export default App;
