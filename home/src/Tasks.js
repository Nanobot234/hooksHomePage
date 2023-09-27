import React, {useEffect, useState, useReducer} from "react";
import { v4 as uuidv4 } from 'uuid';

//initial state using the reducer pattern
const initialTasksState = {
    tasks: [],
    completedTasks: []
};

const TYPES = {
    ADD_TASK: 'ADD_TASK',
    COMPLETE_TASK: 'COMPLETE_TASK',
    DELETE_TASK: 'DELETE_TASK'
};


const tasksReducer = (state, action) => {

    console.log('state', state, 'action', action);

    //switch statement
    switch(action.type){
        case TYPES.ADD_TASK:
            return {
                ...state, tasks: [...state.tasks, action.task]
            }
        case TYPES.COMPLETE_TASK:
            const {completedTask} = action //this is destrcuuring the value we need right away from object
            return {
                //
                ...state,
                completedTasks: [...state.completedTasks, completedTask],
                tasks: state.tasks.filter(task => task.id !== completedTask.id)
            }
        case TYPES.DELETE_TASK:
            return {
                ...state,
                completedTasks: state.completedTasks.filter(t => t.id != action.task.id)
            }
    }
    
    //here you are retuning the changes to the state and then an array with the new tasks, and then the action.task
    return {
        ...state, tasks: [...state.tasks, action.task] //in the tasks property, you are combining the exisitng tasks with the new tasks from the action object.
    }
}
//local storage
const TASKS_STORAGE_KEY = 'TASKS_STORAGE_KEY'

const storeTasks = (taskMap) => {
    localStorage.setItem(
        TASKS_STORAGE_KEY,
        JSON.stringify(taskMap)
    )

}

//check to see  if you have stored tasks, if not will need to r
const readStoredTasks = () => {
    const taskMap = JSON.parse(localStorage.getItem(TASKS_STORAGE_KEY));

    //now do a ternary expression to return null if the tasksMap is empty otherwise

    return taskMap ? taskMap : initialTasksState 
}

function Tasks() {

    //makes seperate hooks, helps tract functioanlity
   

    const [taskText, setTaskText] = useState('');
    const storedTasks = readStoredTasks();

    const [state, dispatch] = useReducer(tasksReducer, storedTasks) //here you make tasksReducer as the reducer, and the intial state is whatever is stored in local storage !
    const { tasks, completedTasks } = state
        
    //fucntion to update Task tesxt, arrow func
    console.log('state', state);

    //now in the useEffect hook, creste code that will be run on every render. Interesting thing is that its done asynchonously
    useEffect(() => {
        storeTasks({ tasks, completedTasks }); //stores tasks locally on every render!
    })

    const updateTaskText = event => {
        setTaskText(event.target.value) //here your calling the hoke which is working to udpate the text.
    }

    const addTask = () => {
        //review this
        dispatch({ type: TYPES.ADD_TASK, task: { taskText, id: uuidv4() }});
      //spread operator gets all the elements in the array, then adds Tasks text inside the array 
        //now second paramenter , is what is saved in the tasks array, that is the tasks, with the id and 
        
    }

    const completedTask = completedTask => () => {
        //ok so will call the hook function

        //with reducer pattern, now will just dispatch

        dispatch({type: TYPES.COMPLETE_TASK, completedTask})

      
        //grays out
    }   

    const deleteTask = task => () => {
        dispatch({type: TYPES.DELETE_TASK, task})
        //here makes sense because your filtering out the paramete
        //with the parameter being the task that u deleted. SO u set the state to that
    }

    console.log("tasks",tasks)
    console.log("completedTasks",completedTasks)
    return (
        
        <div>
            <h3>Tasks</h3>
            <div className="form">
                <input value={taskText} onChange={updateTaskText}/>
                <button onClick={addTask}>Add Task</button>
            </div>
            <div className="task-list">
                {
                    
                    tasks.map(task => {
                        //now will destrcture tassk, since it has two values in them

                        const {id, taskText} = task                        
                        return <div key={id} onClick={completedTask(task)}>{taskText}</div> //need to pass in tasks duhh, but Ig


                    })
                }

            </div>

            <div className="completed-list">
                {
                completedTasks.map(task => {
                    //now will destructure
                    const {id, taskText} = task
                    return (
                        //ok so will delete tasks here
                        <div key={id} onClick={deleteTask(task)}>{taskText}</div>
                    )
                })
                }
            </div>
        </div>


    )

}

export default Tasks