import produce from "immer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../Css/ToDoCss.css";
import { GET_TODO, actionStatus } from "../utils/utils";
import Body from "./Body";
import Footer from "./Footer";
import { useTheme } from "./ThemeContext";
import ToggleTheme from "./ToggleTheme";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Header from "./Header";
const ToDoList = () => {
   const dispatch = useDispatch();
   const toDoItems = useSelector((state) => state.toDo.toDoList)
   const [filteredToDoItems, setFilteredToDoItems] = useState([]);
   const [filterType, setFilterType] = useState(actionStatus.ALL);
   const { theme } = useTheme();

   useEffect(() => {
      dispatch(GET_TODO);
   }, [dispatch])
   useEffect(() => {
      setFilteredToDoItems(produce(toDoItems, (draftState) => {
         if (filterType === actionStatus.ACTIVATE || filterType === actionStatus.COMPLETE) {
            switch (filterType) {
               case actionStatus.ACTIVATE:
                  return draftState.filter((todo) => !todo.completed);
               case actionStatus.COMPLETE:
                  return draftState.filter((todo) => todo.completed);
               default:
                  break;
            }
         }
         return draftState;
      }));
   }, [toDoItems, filterType]);

   const handleFilterChange = (newFilterType) => {
      setFilterType(newFilterType);
   };
   return (
      <Router>
         <div className={`${theme === "dark" ? "dark-theme" : ""}`}>
            <ToggleTheme />
            <Routes>
               <Route path="/todolist">
                  <div>
                     <Link to="/header">Thêm TODO</Link>
                     <Body items={filteredToDoItems} theme={theme} />
                     <Footer onFilterChange={handleFilterChange} theme={theme} />
                  </div>
               </Route>
               <Route path="/header">
                  <Header theme={theme} />
               </Route>
            </Routes>
         </div>
      </Router>
   );
}

export default ToDoList;