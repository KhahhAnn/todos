import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";


const Body = ({ toDoItems, onDelete, onToggle, onEdit }) => {
   const [hoveredIndex, setHoveredIndex] = useState(null);
   const [editableIndex, setEditableIndex] = useState(null);
   const [editText, setEditText] = useState("");

   const handleDelete = (index) => {
      onDelete(index);
   }

   const handleEdit = (index) => {
      setEditableIndex(index);
      setEditText(toDoItems[index].text);
   }

   const handleSaveEdit = (index) => {
      onEdit(index, editText);
      setEditableIndex(null);
   }

   const handleCancelEdit = () => {
      setEditableIndex(null);
   }

   return (
      <div className="todo-container">
         {toDoItems.map((todo, index) => (
            <div
               key={index}
               className="to-do-item-container"
               onMouseEnter={() => setHoveredIndex(index)}
               onMouseLeave={() => setHoveredIndex(null)}
            >
               <div className="checkbox-container">
                  <input
                     className="toggle"
                     type="checkbox"
                     onChange={() => onToggle(index)}
                     checked={todo.completed}
                  />
               </div>
               <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", flex: 1 }}>
                  <div>
                     {editableIndex === index ? (
                        <input
                           className="input-edit"
                           type="text"
                           value={editText}
                           onChange={(e) => setEditText(e.target.value)}
                        />
                     ) : (
                        <h3 className={todo.completed ? "completed" : ""}>
                           {todo.text}
                        </h3>
                     )}
                  </div>
                  <div>
                     {(hoveredIndex === index) && (
                        <div>
                           {editableIndex === index ? (
                              <>
                                 <button className="save-button" onClick={() => handleSaveEdit(index)}>Save</button>
                                 <button className="cancel-button" onClick={handleCancelEdit}>Cancel</button>
                              </>
                           ) : (
                              <AiFillEdit
                                 className="edit-icon"
                                 style={{ color: "#e6360a", marginRight: 10 }}
                                 onClick={() => handleEdit(index)}
                              />
                           )}
                           <FaTrash
                              className="delete-icon"
                              style={{ color: "#e6360a", marginRight: 10 }}
                              onClick={() => handleDelete(index)}
                           />
                        </div>
                     )}
                  </div>
               </div>
            </div>
         ))}
      </div>
   );
};

export default Body;
