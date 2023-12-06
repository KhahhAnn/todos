import { useRef, useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToDo, checkAll } from "../actions/ToDo";
import request from "../utils/request";

const Header = ({theme }) => {
   const dispatch = useDispatch();
   const inputRef = useRef();
   const [toDo, setToDo] = useState("");

   const checkAllAPI = async () => {
      try {
         const response = await request.get("todo");
         const todos = response.data;
         console.log(todos);
         for (const todo of todos) {
            const updatedTodo = { ...todo, complete: !todo.complete };
            await request.put(`todo/${todo.id}`, updatedTodo);
         }
      } catch (error) {
         console.log(error);
      }
   };

   const handleCheckAll = () => {
      dispatch(checkAll());
      checkAllAPI();
   }
   const handleInputChange = (e) => {
      setToDo(e.target.value);
   };

   const handleKeyPress = async (e) => {
      if (e.key === "Enter" && toDo.trim() !== "") {
         dispatch(addToDo(toDo.trim()));
         setToDo("");
         try{
            await request.post("todo", {
               content: toDo.trim(),
               complete: false,
            })
         } catch (error) {
            console.error(error);
         }
      }
   };

   return (
      <header className={`${theme  === "dark" ? "dark-header"  : ""}`}>
         <h1 className="header-text">todos</h1>
         <AiOutlineDown className= "check-all"  onClick={handleCheckAll}/>
         <input
            ref={inputRef}
            className= "input-todo" 
            placeholder="What needs to be done"
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            value={toDo}
         />
      </header>
   );
};

export default Header;
