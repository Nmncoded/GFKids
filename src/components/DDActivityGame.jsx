/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useEffect, useMemo, useState, useContext } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { playSound, SOUND_EFFECTS } from "../helpers";
import Column from "./Column";
import TaskContext from "../context/context";


const DDActivityGame = () => {
  const [score, setScore] = useState(0);
  const [turns, setTurns] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const {data,setData} = useContext(TaskContext);

  console.log(data);

  const showConfetti = false;

  const onReset = () => {
    window.location.reload();
  };

  return (
    <div className="App">
      {showConfetti && <Confetti />}
      <h1 className={showConfetti ? "won" : ""}>
        {!showConfetti ? "Activity Game" : "Congratulations"}
      </h1>
      <div className="score-container">
        <div>
          <span>Score: {score}</span>
          <span>Turns: {turns}</span>
        </div>
        <button onClick={onReset}>Reset</button>
      </div>
      <section className="section">
        <div className="container">
          {
            data?.map((column) => (
              <Column
                key={column.id}
                id={column.id}
                title={column.title}
                tasks={column.tasks}
                ICON={column.ICON}
              />
            ))
          }
        </div>
      </section>
    </div>
  );
};

export default DDActivityGame;
