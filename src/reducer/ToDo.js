import {GET_TODO, ADD_TODO, CHECK_ALL, CLEAR_COMPLETE, DELETE_TODO, TOGGLE_TODO, UPDATE_TODO } from "../actions/ToDo";
import { produce } from "immer";


const initialState = {
   toDoList: [],
};

const todoReducer = (state = initialState, action) => {
   return produce(state, draftState => {
      switch (action.type) {
         case GET_TODO: {
            draftState.toDoList = action.payload;
            break;
         }
         case ADD_TODO: {
            draftState.toDoList.unshift(action.payload);
            break;
         }
         case DELETE_TODO: {
            draftState.toDoList = draftState.toDoList.filter(todo => todo.id !== action.payload);
            break;
         }
         case UPDATE_TODO: {
            const todoIndex = draftState.toDoList.findIndex(todo => todo.id === action.payload.id);
            if (todoIndex !== -1) {
               draftState.toDoList[todoIndex].content = action.payload.newText;
            }
            break;
         }
         case TOGGLE_TODO: {
            const todoIndex = draftState.toDoList.findIndex(todo => todo.id === action.payload.id);
            if (todoIndex !== -1) {
               draftState.toDoList[todoIndex].completed = !draftState.toDoList[todoIndex].completed;
            }
            break;
         }
         case CHECK_ALL: {
            const areAllCompleted = draftState.toDoList.every(todo => todo.completed);
            draftState.toDoList.forEach(todo => {
               todo.completed = !areAllCompleted;
            });
            break;
         }
         case CLEAR_COMPLETE: {
            draftState.toDoList = draftState.toDoList.filter(todo => !todo.completed);
            break;
         }
         default:
            break;
      }
   })
};

export default todoReducer;