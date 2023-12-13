import { useDispatch, useSelector } from "react-redux";
import { clearComplete } from "../actions/ToDo";
import { DELETE_TODO, GET_TODO, actionStatus } from "../utils/utils";
import request from "../utils/request";
import { useEffect, useState } from "react";

const Footer = ({ onFilterChange, theme }) => {
   const dispatch = useDispatch();
   const toDoItems = useSelector((state) => state.toDo.toDoList)
   const [remainingCount, setRemainingCount] = useState(0);
   const [completeCount, setCompleteCount] = useState(0);

   // useEffect(() => {
   //    dispatch({type: GET_TODO})
   // }, [dispatch])
   // useEffect(() => {
   //    const fetchData = async () => {
   //       try {
   //          const response = await request.get("todo")
   //          setCompleteCount(response.data.filter((todo) => todo.completed).length);
   //          setRemainingCount(response.data.length - completeCount);
   //       } catch (error) {
   //          console.log(console.error(error));
   //       }
   //    }
   //    fetchData();

   // }, [toDoItems, completeCount]);



   const handleFilterChange = (filterType) => {
      onFilterChange(filterType);
   };

   const clearCompleteAPI =  () => {
      toDoItems.forEach((todo) => {
         if(todo.complete) {
            dispatch({type: DELETE_TODO, payload: todo.id});
         }
      });
   }
   const handleClearCompleted = () => {
      dispatch(clearComplete());
      clearCompleteAPI();
   };

   return (
      <div className="footer-container">
         <h3> items left</h3>
         <div className={`option-container ${theme === "dark" ? "dark-option" : ""}`}>
            <a href="#" onClick={() => handleFilterChange(actionStatus.ALL)}>All</a>
            <a href="#" onClick={() => handleFilterChange(actionStatus.ACTIVATE)}>Active</a>
            <a href="#" onClick={() => handleFilterChange(actionStatus.COMPLETE)}>Complete</a>
         </div>
         <div>
            {completeCount > 0 && (
               <div>
                  <a href="#" onClick={handleClearCompleted}>Clear completed</a>
               </div>
            )}
         </div>
      </div>
   );
}

export default Footer;