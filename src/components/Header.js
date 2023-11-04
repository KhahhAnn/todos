import { useState, useRef, useEffect } from "react";

const Header = ({ addTodo, toDoItems }) => {
   const inputRef = useRef();
   const [toDo, setToDo] = useState("");

   useEffect(() => {
      setToDo("");
      inputRef.current.focus();
   }, [toDoItems]);

   const handleInputChange = (e) => {
      setToDo(e.target.value);
   };

   const handleKeyPress = (e) => {
      if (e.key === "Enter" && toDo.trim() !== "") {
         addTodo(toDo.trim());
      }
   };

   return (
      <header>
         <h1 className="header-text">todos</h1>
         <input
            ref={inputRef}
            className="input-todo"
            placeholder="What needs to be done"
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            value={toDo}
         />
      </header>
   );
};

export default Header;
