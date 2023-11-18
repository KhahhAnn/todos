import { combineReducers } from "redux";
import todoReducer from "./ToDo";

const rootReducer = combineReducers({
   toDo: todoReducer,
})

export default rootReducer;