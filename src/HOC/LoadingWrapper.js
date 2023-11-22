import React, { useRef, useState } from "react";

const LoadingWrapper = (WrappedComponent) => {
   return function WithLoadingComponent(props) {
      const {
         items: initialToDoItems,
         numberToShow = 5,
         endScrollPosition = 20,
      } = props;

      const [itemsToShow, setItemsToShow] = useState(numberToShow);
      const [loading, setLoading] = useState(false);

      const isGettingRef = useRef(false);

      const handleScroll = (event) => {
         const element = event.target;
         if (
            element.scrollTop + element.clientHeight >=
            element.scrollHeight - endScrollPosition &&
            !isGettingRef.current
         ) {
            isGettingRef.current = true;
            fetchMoreData();
         }
      };

      const fetchMoreData = () => {
         if (itemsToShow >= initialToDoItems.length) {
            return;
         }
         setLoading(true);
         setTimeout(() => {
            setItemsToShow((prevItems) => prevItems + numberToShow);
            isGettingRef.current = false;
            setLoading(false);
         }, 1000);
      };

      return (
         <WrappedComponent
            {...props}
            itemsToShow={itemsToShow}
            onScroll={handleScroll}
            fetchMoreData={fetchMoreData}
            loading={loading}
         />
      );
   };
};

export default LoadingWrapper;
