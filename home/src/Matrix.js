//first do the 
import React, {useState, useEffect} from "react";
import matrixPictures from '../src/data/matrix'
import { useDynamicTransition } from "./hooks";

const minimumDelay = 10;
const minimumIncrement = 1;

function Matrix() {
    const [delay, setDelay] = useState(500); //the delay for the images shown in the gallery
    const [increment,setIncrement] = useState(1);

    //const [delay, setDelay] = useState()
   const index = useDynamicTransition({
    delay, increment, length: matrixPictures.length
   });
        //in the box above the effect will refire
    const updateDelay = event => {
        const delay = Number(event.target.value);
        setDelay(delay < minimumDelay ? minimumDelay : delay);
        }

    const updateIncrement = event => {
        const increment = Number(event.target.value); //event.target.value gets the object 
        setIncrement (
        increment < minimumIncrement ? minimumIncrement: increment);
        }

        console.log('delay',delay, 'increment', increment)

    return (
        <div className="Matrix">
            <img src={matrixPictures[index]} alt="matrix-animation"/>

            <div className='multiform'>
                <div>
                    Frame transition delay (seconds):
                    <input type="number" onChange={updateDelay} />
                </div>
                <div>
                    Frame increment:
                    <input type="number" onChange={updateIncrement} />
                </div>
            </div>
        </div>
    )
}
export default Matrix