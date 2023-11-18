import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

const LoadingWrapper = (WrappedComponent) => {
   const WithLoadingComponent = ({ ...props }) => {
      const toDoItems = useSelector((state) => state.toDo.toDoList);
      const [itemsToShow, setItemsToShow] = useState(5);
      const [loading, setLoading] = useState(false);

      const handleScroll = (event) => {
         const element = event.target;
         const scrollPercentage =
            (element.scrollTop + element.clientHeight) / element.scrollHeight;

         if (scrollPercentage > 0.8) {
            fetchMoreData();
         }
      };

      const fetchMoreData = () => {
         if (itemsToShow >= toDoItems.length) {
            return;
         }
         setLoading(true);
         setTimeout(() => {
            setItemsToShow((prevItems) => prevItems + 5);
            setLoading(false);
         }, 1000);
      };

      return (
         <WrappedComponent
            {...props}
            toDoItems={toDoItems}
            itemsToShow={itemsToShow}
            onScroll={handleScroll}
            fetchMoreData={fetchMoreData}
            loading={loading}
         />
      );
   };

   return WithLoadingComponent;
};

export default LoadingWrapper;
