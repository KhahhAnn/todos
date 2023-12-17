import { call, put, takeLatest } from "redux-saga/effects";
import { ADD_TODO, CHECK_ALL, DELETE_TODO, GET_TODO, TOGGLE_TODO, UPDATE_TODO } from "../utils/utils";
import request from "../utils/request";

export const fetchApi = async () => {
   try {
      const response = await request.get("todo");
      return response.data;
   } catch (error) {
      console.log(error);
   }
};

export const addTodoApi = async (todo) => {
   try {
      const response = await request.post("todo", todo);
      return response.data;
   } catch (error) {
      console.log(error);
   }
};

export const editTodoApi = async (todo) => {
   try {
      const response = await request.put(`todo/${todo.id}`, todo);
      return response.data;
   } catch (error) {
      console.log(error);
   }
};

export const deleteTodoApi = async (id) => {
   try {
      const response = await request.delete(`todo/${id}`);
      return response.data;
   } catch (error) {
      console.log(error);
   }
};
function* fetchToDoWorker() {
   try {
      const todolist = yield call(fetchApi);
      yield put({ type: GET_TODO, payload: todolist });
   } catch (error) {
      console.log(error);
   }
}

function* addToDoWorker(action) {
   try {
      yield call(addTodoApi, action.payload);
      yield put({ type: GET_TODO });
   } catch (error) {
      console.log(error);
   }
}

function* editToDoWorker(action) {
   try {
      yield call(editTodoApi, action.payload);
      yield put({ type: GET_TODO });
   } catch (error) {
      console.log(error);
   }
}

function* deleteToDoWorker(action) {
   try {
      yield call(deleteTodoApi, action.payload);
      yield put({ type: GET_TODO });
   } catch (error) {
      console.log(error);
   }
}

function* checkAllWorker() {
   try {
      const response = yield call(request.get, 'todo');
      const todos = response.data;

      for (const todo of todos) {
         const updatedTodo = { ...todo, complete: !todo.complete };
         yield call(request.put, `todo/${todo.id}`, updatedTodo);
      }
      yield put({ type: GET_TODO });
   } catch (error) {
      console.log(error);
   }
}

function* toggleWorker(action) {
   try {
      const updatedTodo = { ...action.payload, complete: !action.payload.complete };
      yield call(request.put, `todo/${action.payload.id}`, updatedTodo);
   } catch (error) {
      console.log(error);
   }
}

function* toDoWatcher() {
   yield takeLatest(GET_TODO, fetchToDoWorker);
   yield takeLatest(ADD_TODO, addToDoWorker);
   yield takeLatest(UPDATE_TODO, editToDoWorker);
   yield takeLatest(DELETE_TODO, deleteToDoWorker);
   yield takeLatest(CHECK_ALL, checkAllWorker);
   yield takeLatest(TOGGLE_TODO, toggleWorker);
}

export default toDoWatcher;
