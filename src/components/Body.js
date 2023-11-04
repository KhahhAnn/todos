import { useState } from "react";
import { FaTrash } from "react-icons/fa";

const Body = ({ toDoItems, onDelete, onToggle }) => {
   const [hoveredIndex, setHoveredIndex] = useState(null);
   const handleDelete = (index) => {
      onDelete(index);
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
                     checked={todo.completed} // Sử dụng trạng thái từ todo trực tiếp.
                  />
               </div>
               <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", flex: 1 }}>
                  <div>
                     <h3 className={todo.completed ? "completed" : ""}>
                        {todo.text}
                     </h3>
                  </div>
                  <div>
                     {(hoveredIndex === index) && (
                        <FaTrash
                           className="delete-icon"
                           style={{ color: "#e6360a", marginRight: 10 }}
                           onClick={() => handleDelete(index)}
                        />
                     )}
                  </div>
               </div>
            </div>
         ))}
      </div>
   );
};

export default Body;
