/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { BsAlphabetUppercase } from "react-icons/bs";
import {  TiSortNumericallyOutline } from "react-icons/ti";
import { GrSelect } from "react-icons/gr";
import { RiNumber1,RiNumber2, RiNumber3 } from "react-icons/ri";
import { GiShinyApple, GiSoccerBall } from "react-icons/gi";
import { FaCat } from "react-icons/fa";
import TaskContext from "./context";
import TaskReducer from "./reducer";
import { SET_SEED } from "./types";
import { useReducer } from "react";

const tasks = [
  { id: "0", title: "One", icon: <RiNumber1  color="aqua" size={24} /> },
  { id: "1", title: "Three", icon: <RiNumber3  color="aqua" size={24} /> },
  { id: "2", title: "Two", icon: <RiNumber2  color="aqua" size={24} /> },
  { id: "3", title: "Cat", icon: <FaCat  color="aqua" size={24} style={{marginRight: ".4rem"}} /> },
  { id: "4", title: "Apple", icon: <GiShinyApple  color="aqua" size={24} style={{marginRight: ".4rem"}} /> },
  { id: "5", title: "Ball", icon: <GiSoccerBall  color="aqua" size={24} style={{marginRight: ".4rem"}} /> },
]

const initialData = [
  {
    id: '0',
    title: 'Numbers',
    tasks: [],
    ICON: <TiSortNumericallyOutline color="aqua" size={34} />
  },
  {
    id: '1',
    title: 'Select',
    tasks: [...tasks].sort(() => Math.random() - 0.5),
    ICON: <GrSelect color="aqua" size={24} />
  },
  {
    id: '2',
    tasks: [],
    title: 'Alphabets',
    ICON: <BsAlphabetUppercase color="aqua" size={34} />
  },
]

const TaskState = (props) => {
  const initialState = {
    data: initialData,
    loading: false,
  };
  const [state, dispatch] = useReducer(TaskReducer, initialState);

  const setData = (data) => {
    dispatch({
      type: SET_SEED,
      payload: data,
    });
  };

  return (
    <TaskContext.Provider
      value={{
        data: state.data,
        loading: state.loading,
        setData,
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
}

export default TaskState;