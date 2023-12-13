import { call, put, takeLatest } from "redux-saga/effects";
import { addToDoItem, deleteToDoItem, editToDoItem, fetch } from "../api/axiosAPI";
import { ADD_TODO, DELETE_TODO, GET_TODO, UPDATE_TODO } from "../utils/utils";

function* fetchToDo() {
   try {
      const todolist = yield call(fetch);
      yield put({ type: GET_TODO, payload: todolist });
   } catch (error) {
      console.log(error);
   }
}

function* addToDo(action) {
   try {
      yield call(addToDoItem, action.payload);
      yield put({ type: GET_TODO });
   } catch (error) {
      console.log(error);
   }
}

function* editToDo(action) {
   try {
      yield call(editToDoItem, action.payload);
      yield put({ type: GET_TODO }); 
   } catch (error) {
      console.log(error);
   }
}

function* deleteToDo(action) {
   try {
      yield call(deleteToDoItem, action.payload);
      yield put({ type: GET_TODO }); 
   } catch (error) {
      console.log(error);
   }
}

function* toDoSaga() {
   yield takeLatest(GET_TODO, fetchToDo);
   yield takeLatest(ADD_TODO, addToDo);
   yield takeLatest(UPDATE_TODO, editToDo);
   yield takeLatest(DELETE_TODO, deleteToDo);
}

export default toDoSaga;
