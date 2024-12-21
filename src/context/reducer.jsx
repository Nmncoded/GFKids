import { SET_SEED } from "./types";

const TaskReducer = (state, action) => {
  switch (action.type) {
    case SET_SEED:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
export default TaskReducer;