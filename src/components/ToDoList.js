import { useEffect, useState } from "react";
import ToDoCss from "../Css/ToDoCss.css";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import { v4 as uuid } from "uuid";
import { actionStatus } from "../utils/utils";

const ToDoList = () => {
   const [toDoItems, setToDoItems] = useState([]);
   const [filteredToDoItems, setFilteredToDoItems] = useState([]);
   const [filterType, setFilterType] = useState(actionStatus.ALL);

   useEffect(() => {
      switch (filterType) {
         case actionStatus.ALL:
            setFilteredToDoItems(toDoItems);
            break;
         case actionStatus.ACTIVATE:
            setFilteredToDoItems(toDoItems.filter(todo => !todo.completed));
            break;
         case actionStatus.COMPLETE:
            setFilteredToDoItems(toDoItems.filter(todo => todo.completed));
            break;
         default:
            setFilteredToDoItems(toDoItems);
            break;
      }
   }, [toDoItems, filterType]);

   const addTodo = (text) => {
      setToDoItems(prevToDoItems => [{ id: uuid(), content: text, completed: false }, ...prevToDoItems]);
   };

   const handleDelete = (id) => {
      const newToDoItems = toDoItems.filter((todo) => todo.id !== id);
      setToDoItems(newToDoItems);
   };

   const handleEdit = (id, newText) => {
      const newToDoItems = toDoItems.map((todo) =>
         todo.id === id ? { ...todo, content: newText } : todo
      );
      setToDoItems(newToDoItems);
   };

   const handleToggle = (id) => {
      const newToDoItems = toDoItems.map((todo) =>
         todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      setToDoItems(newToDoItems);
   };

   const handleClearCompleted = () => {
      const newToDoItems = toDoItems.filter(todo => !todo.completed);
      setToDoItems(newToDoItems);
   };

   const handleCheckAll = () => {
      const areAllCompleted = toDoItems.every(todo => todo.completed);
      const updatedToDoItems = toDoItems.map(todo => ({ ...todo, completed: !areAllCompleted }));
      setToDoItems(updatedToDoItems);
   }

   const handleFilterChange = (newFilterType) => {
      setFilterType(newFilterType);
   };

   return (
      <div>
         <Header addTodo={addTodo} toDoItems={toDoItems} onCheckAll={handleCheckAll} />
         <Body toDoItems={filteredToDoItems} onDelete={handleDelete} onToggle={handleToggle} onEdit={handleEdit} />
         <Footer toDoItems={toDoItems} onFilterChange={handleFilterChange} onClearCompleted={handleClearCompleted} />
      </div>
   );
}

export default ToDoList;
