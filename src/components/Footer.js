import { useDispatch } from "react-redux";
import { clearComplete } from "../actions/ToDo";
import { actionStatus } from "../utils/utils";

const Footer = ({ toDoItems, onFilterChange, theme }) => {
   const dispatch = useDispatch();
   const handleFilterChange = (filterType) => {
      onFilterChange(filterType);
   };

   const handleClearCompleted = () => {
      dispatch(clearComplete())
   };

   const completedCount = toDoItems.filter(todo => todo.completed === true).length;

   return (
      <div className="footer-container">
         <h3>{toDoItems.length - completedCount} items left</h3>
         <div className={`option-container ${theme  === "dark" ? "dark-option"  : ""}`}>
            <a href="#" onClick={() => handleFilterChange(actionStatus.ALL)}>All</a>
            <a href="#" onClick={() => handleFilterChange(actionStatus.ACTIVATE)}>Active</a>
            <a href="#" onClick={() => handleFilterChange(actionStatus.COMPLETE)}>Complete</a>
         </div>
         <div>
            {completedCount > 0 && (
               <div>
                  <a href="#" onClick={handleClearCompleted}>Clear completed</a>
               </div>
            )}
         </div>
      </div>
   );
}

export default Footer;
