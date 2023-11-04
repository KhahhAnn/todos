const Footer = ({ toDoItems, onFilterChange }) => {
   const handleFilterChange = (filterType) => {
      onFilterChange(filterType);
   };

   const completedCount = toDoItems.filter(todo => todo.completed).length;

   return (
      <div className="footer-container">
         <h3>{toDoItems.length - completedCount} items left</h3>
         <div className="option-container">
            <a href="#" onClick={() => handleFilterChange("all")}>All</a>
            <a href="#" onClick={() => handleFilterChange("active")}>Active</a>
            <a href="#" onClick={() => handleFilterChange("complete")}>Complete</a>
         </div>
         <div>
            {completedCount > 0 && (
               <div>
                  <a href="#" onClick={() => handleFilterChange("active")}>Clear completed</a>
               </div>
            )}
         </div>
      </div>
   );
}

export default Footer;
