import React, { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toggleToDo } from "../actions/ToDo";
import { DELETE_TODO, TOGGLE_TODO, UPDATE_TODO } from "../utils/utils";

const ToDoItem = ({ todo }) => {
   const [editText, setEditText] = useState("");
   const [editableId, setEditableId] = useState(null);
   const dispatch = useDispatch();

   const handleDelete =  () => {
      dispatch({type: DELETE_TODO, payload: todo.id});
   };

   const handleCancelEdit = () => {
      setEditableId(null);
   };

   const handleSaveEdit = () => {
      const todoEit = {id: todo.id, content: editText};
      dispatch({type: UPDATE_TODO, payload: todoEit});
      setEditableId(null);
   };

   const toggleAPI = () => {
      dispatch({ type: TOGGLE_TODO, payload: todo });

   }
   const handleToggle = () => {
      dispatch(toggleToDo(todo.id));
      toggleAPI();
   };

   return (
      <div
         key={todo.id}
         className="to-do-item-container"
      >
         <div className="checkbox-container">
            <input
               className="toggle"
               type="checkbox"
               onChange={handleToggle}
               checked={todo.completed}
            />
         </div>
         <div
            style={{
               display: "flex",
               flexDirection: "row",
               justifyContent: "space-between",
               alignItems: "center",
               flex: 1
            }}
         >
            <div>
               {editableId === todo.id ? (
                  <input
                     className="input-edit"
                     type="text"
                     value={editText}
                     onChange={(e) => setEditText(e.target.value)}
                     autoFocus
                  />
               ) : (
                  <h3 className={todo.completed ? "completed" : ""}>{todo.content}</h3>
               )}
            </div>
            <div>
               <div>
                  {editableId === todo.id ? (
                     <>
                        <button
                           className="save-button"
                           onClick={handleSaveEdit}
                        >
                           Save
                        </button>
                        <button
                           className="cancel-button"
                           onClick={handleCancelEdit}
                        >
                           Cancel
                        </button>
                     </>
                  ) : (
                     <AiFillEdit
                        className="edit-icon"
                        style={{ color: "#e6360a", marginRight: 10 }}
                        onClick={() => setEditableId(todo.id)}
                     />
                  )}
                  <FaTrash
                     className="delete-icon"
                     style={{ color: "#e6360a", marginRight: 10 }}
                     onClick={handleDelete}
                  />
               </div>
            </div>
         </div>
      </div>
   );
};

export default ToDoItem;
