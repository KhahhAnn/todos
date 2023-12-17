import { v4 as uuid } from "uuid";
import { ADD_TODO, CHECK_ALL, CLEAR_COMPLETE, DELETE_TODO, GET_TODO, TOGGLE_TODO, UPDATE_TODO } from "../utils/utils";

export const getToDo = (todos) => {
   return {
      type: GET_TODO,
      payload: todos.data,
   }
}


export const addToDo = (text) => {
   return {
      type: ADD_TODO,
      payload: {
         id: uuid(),
         content: text,
         completed: false,
      },
   };
};

export const deleteToDo = (id) => {
   return {
      type: DELETE_TODO,
      payload: id,
   };
};

export const updateToDo = (id, newText) => {
   return {
      type: UPDATE_TODO,
      payload: {
         id,
         newText,
      },
   };
};

export const toggleToDo = (id) => {
   return {
      type: TOGGLE_TODO,
      payload: {
         id
      },
   };
};

export const checkAll = () => {
   return {
      type: CHECK_ALL,
   };
};

export const clearComplete = () => {
   return {
      type: CLEAR_COMPLETE,
   };
};