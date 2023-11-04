import { useEffect, useState } from "react";
import ToDoCss from "../Css/ToDoCss.css";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
const ToDoList = () => {
   const [toDoItems, setToDoItems] = useState([]);
   const [filteredToDoItems, setFilteredToDoItems] = useState([]);
   const [filterType, setFilterType] = useState("all");

   useEffect(() => {
      if (filterType === "all") {
         setFilteredToDoItems(toDoItems);
      } else if (filterType === "active") {
         setFilteredToDoItems(toDoItems.filter(todo => !todo.completed));
      } else if (filterType === "complete") {
         setFilteredToDoItems(toDoItems.filter(todo => todo.completed));
      }
   }, [toDoItems, filterType]);

   const addTodo = (todo) => {
      setToDoItems(prevToDoItems => [{ text: todo, completed: false }, ...prevToDoItems]);
   };

   const handleDelete = (index) => {
      const newToDoItems = toDoItems.filter((_, i) => i !== index);
      setToDoItems(newToDoItems);
   };

   const handleToggle = (index) => {
      const newToDoItems = toDoItems.map((todo, i) =>
         i === index ? { ...todo, completed: !todo.completed } : todo
      );
      setToDoItems(newToDoItems);
   };

   const handleFilterChange = (newFilterType) => {
      setFilterType(newFilterType);
   };

   const handleClearCompleted = () => {
      const newToDoItems = toDoItems.filter(todo => !todo.completed);
      setToDoItems(newToDoItems);
   };

   return (
      <div>
         <Header addTodo={addTodo} toDoItems={toDoItems} />
         <Body toDoItems={filteredToDoItems} onDelete={handleDelete} onToggle={handleToggle}/>
         <Footer toDoItems={toDoItems} onFilterChange={handleFilterChange} onClearCompleted={handleClearCompleted}/>
      </div>
   );
}

export default ToDoList;