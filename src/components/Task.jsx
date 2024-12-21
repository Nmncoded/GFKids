/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { RxCrossCircled } from "react-icons/rx";



const Task = ({ id, title, icon, index, colTitle, type }) => {
  return (
    <Draggable draggableId={id} index={index} >
      {(provided, snapshot) => (
        <div className="task-item" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >
          
          {icon}
          <p>{title}</p>
          {
            colTitle !== 'Select'  && (
              colTitle === type ? (
                <IoCheckmarkDoneCircleOutline color="aqua" size={24} style={{ marginLeft: "auto" }} />
                
              )
              :
              (
                <RxCrossCircled color="aqua" size={24} style={{ marginLeft: "auto" }} />
              )
            )
          }
        </div>
      )}
    </Draggable>
  );
};

export default Task;
