/* eslint-disable react/prop-types */
import { BsAlphabetUppercase } from "react-icons/bs";
import {  TiSortNumericallyOutline } from "react-icons/ti";
import { GrSelect } from "react-icons/gr";
import { RiNumber1,RiNumber2, RiNumber3, RiNumber4 } from "react-icons/ri";
import { GiShinyApple, GiSoccerBall, GiSittingDog } from "react-icons/gi";
import { FaCat } from "react-icons/fa";
import TaskContext from "./context";
import TaskReducer from "./reducer";
import { SET_SEED } from "./types";
import { useReducer } from "react";

const tasks = [
  { id: "0", title: "One", icon: <RiNumber1  color="aqua" size={24} />, type: 'Numbers', isMatched: false },
  { id: "1", title: "Three", icon: <RiNumber3  color="aqua" size={24} />, type: 'Numbers', isMatched: false },
  { id: "2", title: "Two", icon: <RiNumber2  color="aqua" size={24} />, type: 'Numbers', isMatched: false },
  { id: "7", title: "Four", icon: <RiNumber4  color="aqua" size={24} />, type: 'Numbers', isMatched: false },
  { id: "3", title: "Cat", icon: <FaCat  color="aqua" size={24} style={{marginRight: ".4rem"}} />, type: 'Alphabets', isMatched: false  },
  { id: "4", title: "Apple", icon: <GiShinyApple  color="aqua" size={24} style={{marginRight: ".4rem"}} />, type: 'Alphabets', isMatched: false },
  { id: "5", title: "Ball", icon: <GiSoccerBall  color="aqua" size={24} style={{marginRight: ".4rem"}} />, type: 'Alphabets', isMatched: false  },
  { id: "6", title: "Dog", icon: <GiSittingDog  color="aqua" size={24} style={{marginRight: ".4rem"}} />, type: 'Alphabets', isMatched: false  },
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
        initialTasks: tasks,
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
}

export default TaskState;