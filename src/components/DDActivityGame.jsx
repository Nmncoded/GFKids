/* eslint-disable no-unused-vars */

import { useEffect, useMemo, useState, useContext } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { playSound, SOUND_EFFECTS } from "../helpers";
import Column from "./Column";
import TaskContext from "../context/context";
import { DragDropContext } from "react-beautiful-dnd";


const DDActivityGame = () => {
  const [score, setScore] = useState(0);
  const [turns, setTurns] = useState(0);
  const {data,setData,initialTasks} = useContext(TaskContext);
  const showConfetti = score === initialTasks?.length;


  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    // Drop outside the list
    if (!destination) return;

    // Drop in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Find source and destination columns
    const sourceColumn = data.find(col => col.id === source.droppableId);
    const destinationColumn = data.find(col => col.id === destination.droppableId);

    const taskBeingMoved = sourceColumn.tasks[source.index];

    // Check if task is matched, then not draggable
    if(taskBeingMoved?.isMatched){
      return;
    }

    const isMatchingMove = taskBeingMoved.type === destinationColumn.title;

    const updatedTask = {
      ...taskBeingMoved,
      isMatched: isMatchingMove
    };

    // Same column
    if (sourceColumn === destinationColumn) {
      const newTasks = Array.from(sourceColumn.tasks);
      newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, updatedTask);

      const newColumn = {
        ...sourceColumn,
        tasks: newTasks
      };

      const newColumns = data.map(col =>
        col.id === newColumn.id ? newColumn : col
      );
      setTurns(prev => prev + 1);
      setData(newColumns);
      return;
    }

    // Moving between columns
    const sourceTasks = Array.from(sourceColumn.tasks);
    sourceTasks.splice(source.index, 1);

    const destinationTasks = Array.from(destinationColumn.tasks);
    destinationTasks.splice(destination.index, 0, updatedTask);

    const newColumns = data.map(col => {
      if (col.id === sourceColumn.id) {
        return {
          ...col,
          tasks: sourceTasks
        };
      }
      if (col.id === destinationColumn.id) {
        return {
          ...col,
          tasks: destinationTasks
        };
      }
      return col;
    });
    setTurns(prev => prev + 1);
    if(isMatchingMove){
      playSound(SOUND_EFFECTS.match);
      setScore(prev => prev + 1);
    }else{
      playSound(SOUND_EFFECTS.wrong);
    }
    setData(newColumns);
  };


  const onReset = () => {
    window.location.reload();
  };

  return (
    <div className="App">
      {showConfetti && playSound(SOUND_EFFECTS.won)}
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
        <DragDropContext onDragEnd={onDragEnd} onDragUpdate={() => {}} >
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
        </DragDropContext>
      </section>
    </div>
  );
};

export default DDActivityGame;
