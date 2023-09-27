import { useState } from "react";
import Joke from "./Joke";
import Stories from "./Stories";
import Tasks from "./Tasks";
import Gallery from "./Gallery";
import Matrix from "./Matrix"
//continued later today!!
//using functional notation!!
const App = () => {

    const [userQuery, setUserQuery] = useState('');
    const [showGallery, setShowGallery] = useState('');
    const SearchQuery = () => {
        window.open(`https://google.com/search?q=${userQuery}`,  '_blank');
    }

    const toggleShowGallery = () => {
        setShowGallery(!showGallery) //changes the gallery state
    }
    const handleKeyPress = event => {
        if( event.key === "Enter"){
            SearchQuery();
        }
    }
    const updateUserQuery = event => {
        console.log('userQuery', userQuery)
        setUserQuery(event.target.value)
    }
    return (
        <div className="App">

            <h1>Hello Nana. Welcome to Your Hooks HomePage</h1>
            <div className="form" style={{textAlign: "center"}}>
                <input value={userQuery} onChange={updateUserQuery} 
                        onKeyUp={handleKeyPress} />
                    <button onClick={SearchQuery}>Search</button>
                    
            </div>
            <hr></hr>
            <Joke />
            <hr />
            <Tasks />
            <hr />
            <div>
                {/* Ternary operator to show the gallery component or notation */}
                {
                    showGallery ? <Gallery /> : null
                }

                <button onClick={toggleShowGallery}>
                    {showGallery ? 'Hide' : 'Show'} Gallery
                </button>         
                <hr />
            </div>
            <hr />
            <Stories />
            <hr />
            <Matrix />
            
        </div>
    )
}

export default App;