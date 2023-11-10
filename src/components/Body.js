import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ToDoItem from "./ToDoItem";

const Body = ({ toDoItems, onDelete, onToggle, onEdit }) => {
   const [hoveredId, setHoveredId] = useState(null);
   const [editableId, setEditableId] = useState(null);
   const [editText, setEditText] = useState("");
   const [itemsToShow, setItemsToShow] = useState(5);

   const handleDelete = (id) => {
      onDelete(id);
   };

   const handleEdit = (id) => {
      setEditableId(id);
      const todoToEdit = toDoItems.find((todo) => todo.id === id);
      setEditText(todoToEdit.content);
   };

   const handleSaveEdit = (id) => {
      onEdit(id, editText);
      setEditableId(null);
   };

   const handleCancelEdit = () => {
      setEditableId(null);
   };

   const handleScroll = (event) => {
      const element = event.target;                    
      if (element.scrollHeight - element.scrollTop === element.clientHeight) {
         fetchMoreData();
      }
   };

   const fetchMoreData = () => {
      setTimeout(() => {
         setItemsToShow((prevItems) => prevItems + 5);
      }, 1000); 
   };

   useEffect(() => {
      setItemsToShow(5);
   }, [toDoItems]);
   return (
      <div
         className="todo-container"
         id="scrollableDiv"
         style={{
            overflowY: toDoItems.length > 5 ? "scroll" : "auto",
         }}
         onScroll={handleScroll}
      >
         {toDoItems.slice(0, itemsToShow).map((todo) => (
            <ToDoItem
               key={todo.id}
               todo={todo}
               hoveredId={hoveredId}
               editableId={editableId}
               editText={editText}
               onToggle={onToggle}
               onEdit={onEdit}
               onDelete={onDelete}
               setHoveredId={setHoveredId}
               setEditableId={setEditableId}
               setEditText={setEditText}
               handleSaveEdit={handleSaveEdit}
               handleCancelEdit={handleCancelEdit}
               handleEdit={handleEdit}
               handleDelete={handleDelete}
            />
         ))}
      </div>
   );
};

export default Body;
