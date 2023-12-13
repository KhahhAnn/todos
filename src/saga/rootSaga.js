import { all } from "redux-saga/effects";
import toDoSaga from "./saga";

function* sagaRoot() {
   yield all([
      toDoSaga(),
   ])
}
export default sagaRoot;