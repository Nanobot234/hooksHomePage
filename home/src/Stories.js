import React from "react";
import { useFetch } from "./hooks"; //defining the hook in a sperate class, to be used easily here!!

function Stories() {
    

        const stories = useFetch('https://news-proxy-230704.appspot.com/topstories',[])

        return (
            //Div tags wrap the whole body I guess could be used for styling puroses?
            <div className='Storues'>
                <h3>Stories</h3>
                {
            stories.map(storyIn => {
               const {id, by, time, title, url} = storyIn
                    //Now will reutnr the HTML for each element
                  return (
                    <div key={id}>
                    <div>{by} - {new Date(time * 1000).toLocaleString()}</div>
                    <a href={url} style={{paddingBottom:10}}>{title}</a>

                    
                </div>
                  )  
            })
        }
            </div>
        
        )
    }

export default Stories
