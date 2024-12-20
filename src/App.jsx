/* eslint-disable no-unused-vars */


import  { useState } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import "./App.css";

const App = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [confetti, setConfetti] = useState(false);

  if (!gameStarted) {
    return (
      <div className="landing-screen">
        <motion.button
          className="start-button"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setGameStarted(true)}
        >
          Start Game
        </motion.button>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button>Reset</button>
    </div>
  );
};

export default App;

