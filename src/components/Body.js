import React from "react";
import ToDoItem from "./ToDoItem";
import LoadingWrapper from "../HOC/LoadingWrapper";

const Body = ({ onDelete, onToggle, onEdit, toDoItems, itemsToShow, onScroll, loading }) => {
   return (
      <div
         className="todo-container"
         id="scrollableDiv"
         style={{
            overflowY: toDoItems.length > 5 ? "scroll" : "auto",
            maxHeight: "250px",
         }}
         onScroll={onScroll}
      >
         {toDoItems.slice(0, itemsToShow).map((todo) => (
            <ToDoItem
               key={todo.id}
               todo={todo}
               onToggle={onToggle}
               onEdit={onEdit}
               onDelete={onDelete}
               handleDelete={onDelete}
            />
         ))}
         {loading && <p>Loading...</p>}
      </div>
   );
};

const BodyWithLoading = LoadingWrapper(Body)
export default BodyWithLoading;
