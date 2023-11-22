import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../Css/ToDoCss.css";
import { actionStatus } from "../utils/utils";
import Body from "./Body";
import Footer from "./Footer";
import Header from "./Header";
import { useTheme } from "./ThemeContext";
import ToggleTheme from "./ToggleTheme";
import { produce } from "immer";
const ToDoList = () => {
   const toDoItems = useSelector((state) => state.toDo.toDoList)
   const [filteredToDoItems, setFilteredToDoItems] = useState([]);
   const [filterType, setFilterType] = useState(actionStatus.ALL);
   const { theme } = useTheme();
   useEffect(() => {
      setFilteredToDoItems(produce(toDoItems, (draft) => {
         if (filterType === actionStatus.ACTIVATE || filterType === actionStatus.COMPLETE) {
            switch (filterType) {
               case actionStatus.ACTIVATE:
                  return draft.filter((todo) => !todo.completed);
               case actionStatus.COMPLETE:
                  return draft.filter((todo) => todo.completed);
               default:
                  break;
            }
         }
         return draft;
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
         <Footer toDoItems={toDoItems} onFilterChange={handleFilterChange} theme={theme} />
      </div>
   );
}

export default ToDoList;
