import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../Css/ToDoCss.css";
import { GET_TODO, actionStatus } from "../utils/utils";
import Body from "./Body";
import Footer from "./Footer";
import Header from "./Header";
import { useTheme } from "./ThemeContext";
import ToggleTheme from "./ToggleTheme";
import { produce } from "immer";
import request from "../utils/request";
import { getToDo } from "../actions/ToDo";
const ToDoList = () => {
   const dispatch =  useDispatch();
   const toDoItems = useSelector((state) => state.toDo.toDoList)
   const [filteredToDoItems, setFilteredToDoItems] = useState([]);
   const [filterType, setFilterType] = useState(actionStatus.ALL);
   const { theme } = useTheme();

   useEffect(() => {
      dispatch({type: GET_TODO})
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
      <div className={`${theme === "dark" ? "dark-theme" : ""}`}>
         <ToggleTheme />
         <Header theme={theme} />
         <Body items={filteredToDoItems} theme={theme} />
         <Footer onFilterChange={handleFilterChange} theme={theme} />
      </div>
   );
}

export default ToDoList;