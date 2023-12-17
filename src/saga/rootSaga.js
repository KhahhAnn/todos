import { all } from "redux-saga/effects";
import toDoWatcher from "./saga";

function* sagaRoot() {
   yield all([
      toDoWatcher(),
   ])
}
export default sagaRoot;