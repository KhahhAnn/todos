import React from "react";
import { useDispatch } from "react-redux";
import LoadingWrapper from "../HOC/LoadingWrapper";
import { deleteToDo, toggleToDo, updateToDo } from "../actions/ToDo";
import ToDoItem from "./ToDoItem";

const Body = ({ items, itemsToShow, onScroll, loading }) => {
   const dispatch = useDispatch();

   const handleDelete = (id) => {
      dispatch(deleteToDo(id));
   };

   const handleEdit = (id, newText) => {
      dispatch(updateToDo(id, newText));
   };

   const handleToggle = (id) => {
      dispatch(toggleToDo(id));
   };

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
               onToggle={handleToggle}
               onEdit={handleEdit}
               onDelete={handleDelete}
            />
         ))}
         {loading && <p>Loading...</p>}
      </div>
   );
};

const BodyWithLoading = LoadingWrapper(Body);
export default BodyWithLoading;
