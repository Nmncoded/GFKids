/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Task from "./Task";
import { DroppableStrict } from "./DroppableStrict";

const Column = ({ id, title, tasks, ICON }) => {
  useEffect(() => {}, []);

  return (
    <div className="column">
      <h1>
        {title} {ICON}{" "}
      </h1>
      <DroppableStrict droppableId={id} >
        {(provided, snapshot) => (
          <div className="task-list" ref={provided.innerRef} {...provided.droppableProps}  >
            {tasks?.length > 0 ? (
              tasks?.map((task,index) => (
                <Task
                  key={task.id}
                  type={task.type}
                  id={task.id}
                  title={task.title}
                  colTitle={title}
                  icon={task.icon}
                  index={index}
                />
              ))
            ) : (
              <p className="">Drag n drop here</p>
            )}
            {provided && provided.placeholder}
          </div>
        )}
      </DroppableStrict>
    </div>
  );
};

export default Column;
