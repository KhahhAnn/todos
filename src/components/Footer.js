const Footer = ({ toDoItems, onFilterChange, onClearCompleted, theme }) => {
   const handleFilterChange = (filterType) => {
      onFilterChange(filterType);
   };

   const completedCount = toDoItems.filter(todo => todo.completed === true).length;

   return (
      <div className="footer-container">
         <h3>{toDoItems.length - completedCount} items left</h3>
         <div className={`option-container ${theme  === "dark" ? "dark-option"  : ""}`}>
            <a href="#" onClick={() => handleFilterChange("all")}>All</a>
            <a href="#" onClick={() => handleFilterChange("active")}>Active</a>
            <a href="#" onClick={() => handleFilterChange("complete")}>Complete</a>
         </div>
         <div>
            {completedCount > 0 && (
               <div>
                  <a href="#" onClick={() => onClearCompleted()}>Clear completed</a>
               </div>
            )}
         </div>
      </div>
   );
}

export default Footer;
