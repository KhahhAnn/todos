import { v4 as uuid } from "uuid";

export const ADD_TODO = "ADD_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const UPDATE_TODO = "UPDATE_TODO";
export const TOGGLE_TODO = "TOGGLE_TODO";
export const CHECK_ALL = "CHECK_ALL";
export const CLEAR_COMPLETE = "CLEAR_COMPLETE";
export const SET_FILTER_TYPE = "SET_FILTER_TYPE";
export const GET_TODO = "GET_TODO";



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