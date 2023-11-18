import { ADD_TODO, CHECK_ALL, CLEAR_COMPLETE, DELETE_TODO, SET_FILTER_TYPE, TOGGLE_TODO, UPDATE_TODO } from "../actions/ToDo";
import { actionStatus } from "../utils/utils";

const initialState = {
   toDoList: [],
};

const todoReducer = (state = initialState, action) => {
   switch (action.type) {
      case ADD_TODO: {
         return {
            ...state,
            toDoList: [...state.toDoList, action.payload],
         };
      }
      case DELETE_TODO: {
         return {
            ...state,
            toDoList: state.toDoList.filter((todo) => todo.id !== action.payload),
         };
      }
      case UPDATE_TODO: {
         const updatedList = state.toDoList.map((todo) =>
            todo.id === action.payload.id ? { ...todo, content: action.payload.newText } : todo
         );
         return {
            ...state,
            toDoList: updatedList,
         };
      }
      case TOGGLE_TODO: {
         const updatedList = state.toDoList.map((todo) =>
            todo.id === action.payload.id ? { ...todo, completed: !todo.completed } : todo
         );
         return {
            ...state,
            toDoList: updatedList,
         };
      }
      case CHECK_ALL: {
         const areAllCompleted = state.toDoList.every(todo => todo.completed);
         const updatedList = state.toDoList.map(todo => ({ ...todo, completed: !areAllCompleted }));
         return {
            ...state,
            toDoList: updatedList,
         };
      }
      case CLEAR_COMPLETE: {
         const newToDoList = state.toDoList.filter(todo => !todo.completed);
         return {
            ...state,
            toDoList: newToDoList,
         };
      }
      default:
         return state;
   }
};

export default todoReducer;