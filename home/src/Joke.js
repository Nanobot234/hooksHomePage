import React, { useState } from "react";
import { useFetch } from "./hooks";
//this is a component 

//function will be used 
function Joke() {

    const [url] = useState('https://official-joke-api.appspot.com/jokes/random');
    const [forceFetch, setForceFetch] = useState(0) //integer that I increment to allow me to get a new joke
    const {setup,punchline} =  useFetch(url,{},forceFetch); 
    
    const updateJoke = () => {
       setForceFetch(forceFetch + 1)
}


console.log("setup",setup, "punchline", punchline)

return (
    <div>
        <h3>Joke</h3>
        <p>{setup}</p>
        <p><em>{punchline}</em></p>
        <button onClick={updateJoke}>Get another joke!</button>
    </div>
)
}

export default Joke
