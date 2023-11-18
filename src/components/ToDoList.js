import { useEffect, useState } from "react";
import "../Css/ToDoCss.css";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import { actionStatus } from "../utils/utils";
import { useTheme } from "./ThemeContext";
import ToggleTheme from "./ToggleTheme";
import { useDispatch, useSelector } from "react-redux";
import { addToDo, checkAll, clearComplete, deleteToDo, toggleToDo, updateToDo } from "../actions/ToDo";

const ToDoList = () => {
   const dispatch = useDispatch();
   const toDoItems = useSelector((state) => state.toDo.toDoList)
   console.log(toDoItems);
   const [filteredToDoItems, setFilteredToDoItems] = useState([]);
   const [filterType, setFilterType] = useState(actionStatus.ALL);
   const { theme } = useTheme();
   useEffect(() => {
      if (filterType === actionStatus.ACTIVATE || filterType === actionStatus.COMPLETE) {
         switch (filterType) {
            case actionStatus.ACTIVATE:
               setFilteredToDoItems(toDoItems.filter((todo) => !todo.completed));
               break;
            case actionStatus.COMPLETE:
               setFilteredToDoItems(toDoItems.filter((todo) => todo.completed));
               break;
            default:
               break;
         }
      } else {
         setFilteredToDoItems(toDoItems);
      }
   }, [toDoItems, filterType]);


   const addTodo = (text) => {
      dispatch(addToDo(text));
   };

   const handleDelete = (id) => {
      dispatch(deleteToDo(id));
   };

   const handleEdit = (id, newText) => {
      dispatch(updateToDo(id, newText));
   };

   const handleToggle = (id) => {
      dispatch(toggleToDo(id))
   };

   const handleClearCompleted = () => {
      dispatch(clearComplete())
   };

   const handleCheckAll = () => {
      dispatch(checkAll())
   }

   const handleFilterChange = (newFilterType) => {
      setFilterType(newFilterType);
   };

   return (
      <div className={`${theme === "dark" ? "dark-theme" : ""}`}>
         <ToggleTheme />
         <Header addTodo={addTodo} toDoItems={toDoItems} onCheckAll={handleCheckAll} theme={theme} />
         <Body toDoItems={filteredToDoItems} onDelete={handleDelete} onToggle={handleToggle} onEdit={handleEdit} theme={theme} />
         <Footer toDoItems={toDoItems} onFilterChange={handleFilterChange} onClearCompleted={handleClearCompleted} theme={theme} />
      </div>
   );
}

export default ToDoList;
