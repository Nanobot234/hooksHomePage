import React, {useState, useEffect} from "react";
import PICTURES from '../src/data/pictures'
import { useDynamicTransition } from "./hooks";

const SECONDS = 1000;
const minimumDelay = 1000;
const minimumIncrement = 1;

function Gallery() {
    //create states for delay and and increment variabkes with delay the intiial delay amount in millis and increments in seconds
    const [delay, setDelay] = useState(3 * SECONDS); //the delay for the images shown in the gallery
    const [increment,setIncrement] = useState(1);
    //return the image from the galery
    
    
    //custom hook defined to do the transition
   const index = useDynamicTransition({
        delay, increment, length: PICTURES.length
   })
    

    //above the 
    const updateDelay = event => {
        //save the delay, and then se thr  delay state variable , only when, its above minimum delay

        const delay = Number(event.target.value) * SECONDS


        setDelay(delay < minimumDelay ? minimumDelay : delay);
    }
    //funnction to increment between which pictures are shown and not?
    const updateIncrement = event => {
        const increment = Number(event.target.value)

        setIncrement(increment < minimumIncrement ? minimumIncrement : increment)
    }
    return (
        <div className="Gallery">
            <img
                src={PICTURES[index].image}
                alt="gallery"
            />
            {/* Here for the multiform things to work with 2:20 in the video */}
        
       
        <div className="multiform">
            <div>
                Gallery transition delay (seconds):
                <input type="number" onChange={updateDelay} />
            </div>
            <div>
                Gallery increment:
                <input type="number" onChange={updateIncrement} />
            </div>
        </div>

        
     </div>
    )
}

export default Gallery;