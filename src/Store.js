import { applyMiddleware, createStore } from "redux";
import rootReducer from "./reducer";
import createSagaMiddleware from "redux-saga"
import sagaRoot from "./saga/rootSaga";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
   rootReducer,
   applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(sagaRoot);

export default store;