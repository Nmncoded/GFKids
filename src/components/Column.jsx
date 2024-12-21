/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Task from "./Task";

const Column = ({ id, title, tasks, ICON }) => {
  useEffect(() => {}, []);

  return (
    <div className="column">
      <h1>
        {title} {ICON}{" "}
      </h1>
      <div className="task-list">
        {tasks?.length > 0 ? (
          tasks?.map((task) => (
            <Task
              key={task.id}
              id={task.id}
              title={task.title}
              icon={task.icon}
            />
          ))
        ) : (
          <p className="">
            Drag n drop here
          </p>
        )}
      </div>
    </div>
  );
};

export default Column;
