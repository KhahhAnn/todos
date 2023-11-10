import React from "react";
import { FaTrash } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";

const ToDoItem = ({
   todo,
   hoveredId,
   editableId,
   editText,
   onToggle,
   onEdit,
   onDelete,
   setHoveredId,
   setEditableId,
   setEditText,
   handleSaveEdit,
   handleCancelEdit,
   handleEdit,
   handleDelete
}) => {
   return (
      <div
         key={todo.id}
         className="to-do-item-container"
         onMouseEnter={() => setHoveredId(todo.id)}
         onMouseLeave={() => setHoveredId(null)}
      >
         <div className="checkbox-container">
            <input
               className="toggle"
               type="checkbox"
               onChange={() => onToggle(todo.id)}
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
               {hoveredId === todo.id && (
                  <div>
                     {editableId === todo.id ? (
                        <>
                           <button
                              className="save-button"
                              onClick={() => handleSaveEdit(todo.id)}
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
                           onClick={() => handleEdit(todo.id)}
                        />
                     )}
                     <FaTrash
                        className="delete-icon"
                        style={{ color: "#e6360a", marginRight: 10 }}
                        onClick={() => handleDelete(todo.id)}
                     />
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};

export default ToDoItem;