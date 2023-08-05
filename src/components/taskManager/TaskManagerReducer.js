import './TaskManager.css'
import Task from './Task'
import { useState, useRef, useEffect, useReducer } from 'react'
import useLocalStorage from 'use-local-storage'
import Alert from '../alert/Alert'
import Confirm from '../confirm/Confirm'

const taskReducer = (state, action) => {
    if (action.type === "EMPTY_FIELD") {
        return {
            ...state,
            isAlertOpen: true,
            alertContent:"Please enter name & date",
            alertClass: 'danger'
        }
    } 
    if (action.type === "CLOSE_ALERT") {
        return {
            ...state, isAlertOpen: false
        };
    }

    return state;
};


const TaskManagerReducer = () => {
    const [name, setName] = useState("")
    const [date, setDate] = useState("")

    const [tasks, setTasks] = useLocalStorage("tasks", [])

    // const [taskID, setTaskID] = useState(null)
    const [isEditing, setIsEditing] = useState(false)

    const initialState = {
        tasks,
        taskID: null,
        isEditing: false,
        isAlertOpen: false,
        alertContent: "This is an alert",
        alertClass:"success"
    }
    const [state, dispatch] = useReducer(taskReducer, initialState)

    const nameInputRef = useRef(null);
    


    useEffect(() => {
        nameInputRef.current.focus()
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!name || !date) {
            dispatch({
                type: "EMPTY_FIELD",
            })
        }
        
    };

    const editTask = (id) => {

    };

    const deleteTask = (id) => {

    };

    const completeTask = (id) => {
  
    };

    const closeAlert = () => {
        dispatch({
            type: "CLOSE_ALERT"
        })
    };

  return (
    <div className='--bg-primary'>
        {state.isAlertOpen && 
            <Alert alertContent={state.alertContent} 
                    alertClass={state.alertClass} 
                    onCloseAlert={closeAlert} 
            />
        }
        
        {/* <Confirm /> */}
        <h2 className='--text-center --text-light'>Task Manager using useReducer</h2>
        <div className='--flex-center --p'>
            <div className='--card --width-500px --p --flex-center'>
                <form onSubmit={handleSubmit} className='--form-control form'>
                    <div style={{display:'flex'}}>
                            <label htmlFor="name">Task</label>
                            <input type="text" 
                                    placeholder='Task Name' 
                                    name='name' 
                                    value={name} 
                                    onChange={(e) => 
                                        setName(e.target.value)} 
                                    ref={nameInputRef}
                            />
                    </div>
                    <div style={{display:'flex'}}>
                            <label htmlFor="date">Task</label>
                            <input type="date" 
                                    name='date'
                                    value={date} 
                                    onChange={(e) => 
                                        setDate(e.target.value)}
                            />
                    </div>
                    <button className='--btn --btn-success --btn-block --p'>
                        {isEditing ? "Edit Task": 'Save Task'}
                    </button>
                </form>
            </div>
        </div>
        <article className='--flex-center --my2' style={{flexDirection: 'column'}}>
            <div className='--width-500px --p'>
            <h2 className='--text-light'>Task List</h2>
            <hr style={{backgroundColor: '#fff'}}/>
            </div>
            {tasks.length === 0 ? (
                <p className='--text-light'>No task added...</p>
            ):(
                <div>
                    {tasks.map((task) => {
                        return <Task 
                                    {...task} 
                                    editTask={editTask} 
                                    deleteTask={deleteTask} 
                                    completeTask={completeTask}/>;
                    })}
                </div>
            )}
        </article>
    </div>
    
  )
}

export default TaskManagerReducer
