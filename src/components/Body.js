import React, { useState, useEffect } from "react";
import ToDoItem from "./ToDoItem";

const Body = ({ toDoItems, onDelete, onToggle, onEdit }) => {
   const [itemsToShow, setItemsToShow] = useState(5);
   const [isLoading, setIsLoading] = useState(false);

   const handleDelete = (id) => {
      onDelete(id);
   };

   const handleScroll = (event) => {
      const element = event.target;
      const scrollPercentage = (element.scrollTop + element.clientHeight) / element.scrollHeight;

      if (scrollPercentage > 0.8) {
         fetchMoreData();
      }
   };

   const fetchMoreData = () => {
      setIsLoading(true);
      setTimeout(() => {
         setItemsToShow((prevItems) => prevItems + 5);
         setIsLoading(false);
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
            maxHeight: "250px",
         }}
         onScroll={handleScroll}
      >
         {toDoItems.slice(0, itemsToShow).map((todo) => (
            <ToDoItem
               key={todo.id}
               todo={todo}
               onToggle={onToggle}
               onEdit={onEdit}
               onDelete={onDelete}
               handleDelete={handleDelete}
            />
         ))}
         {isLoading && <p>Loading...</p>}
      </div>
   );
};

export default Body;
