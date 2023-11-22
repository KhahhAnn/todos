import { useRef, useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToDo, checkAll } from "../actions/ToDo";

const Header = ({theme }) => {
   const dispatch = useDispatch();
   const inputRef = useRef();
   const [toDo, setToDo] = useState("");

   const handleCheckAll = () => {
      dispatch(checkAll())
   }
   const handleInputChange = (e) => {
      setToDo(e.target.value);
   };

   const handleKeyPress = (e) => {
      if (e.key === "Enter" && toDo.trim() !== "") {
         setToDo("");
         dispatch(addToDo(toDo.trim()));
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
