import React from "react";
import LoadingWrapper from "../HOC/LoadingWrapper";
import ToDoItem from "./ToDoItem";

const Body = ({ items, itemsToShow, onScroll, loading }) => {

   return (
      <div
         className="todo-container"
         id="scrollableDiv"
         style={{
            overflowY: itemsToShow > 5 ? "scroll" : "auto",
            maxHeight: "300px",
         }}
         onScroll={onScroll}
      >
         {items.slice(0, itemsToShow).map((todo) => (
            <ToDoItem
               key={todo.id}
               todo={todo}
            />
         ))}
         {loading && <p>Loading...</p>}
      </div>
   );
};

const BodyWithLoading = LoadingWrapper(Body);
export default BodyWithLoading;
