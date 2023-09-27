//import hooks usestate and useEffct

import { useEffect, useState } from "react";

//this is a custom hook made
//forceFetch is just there to allow the api to be rerun when the numebr updates
export const useFetch = (url, initialValue, forceFetch) => {

    
    const [result, setResult] = useState(initialValue)

    useEffect(() => {
        fetch(url)
        .then(response => response.json())
        .then(json => 
        setResult(json));
      
    },[forceFetch]); //empty array avoids infinite loop
    return result
}

//custom hook to make

export const useDynamicTransition = ({ increment, delay, length}) => {
    //first define the states to use

    const [index, setIndex] = useState(0);

    //will use the use effect since it will be changed on every render
    useEffect (() => {
        const interval = setInterval(() => {
        setIndex(storedIndex => {
        return (storedIndex+increment)% length;
        })
        }, delay);

        return () => clearInterval(interval);

    }, [delay, increment]);
        
    return index;

   
}

