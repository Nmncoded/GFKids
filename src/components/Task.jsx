/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

const Task = ({ id, title, icon }) => {
  return (
    <div className="task-item">
      {/* <span className="handle"></span> */}
      {icon}
      <p>{title}</p>
    </div>
  );
};

export default Task;
