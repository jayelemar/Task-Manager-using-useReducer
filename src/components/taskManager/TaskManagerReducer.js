import React from 'react'
import './TaskManager.css'
import Task from './Task'
import { useState, useRef, useEffect } from 'react'
import useLocalStorage from 'use-local-storage'
import Alert from '../alert/Alert'
import Confirm from '../confirm/Confirm'

const TaskManagerReducer = () => {
    const [name, setName] = useState("")
    const [date, setDate] = useState("")
    // const [tasks, setTasks] = useState([])
    const [tasks, setTasks] = useLocalStorage("tasks", [])

    const [taskID, setTaskID] = useState(null)
    const [isEditing, setIsEditing] = useState(false)

    const nameInputRef = useRef(null);
    


    useEffect(() => {
        nameInputRef.current.focus()
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!name && !date || !name || !date) {
            alert("Please enter task name and date")
        } else if(name && date && isEditing) {
            setTasks(
                tasks.map((task) => {
                    if (task.id === taskID) {
                        return {...task, name, date, isComplete: false}
                    } else {
                        return task;
                    }
                })
            );
            setName("");
            setDate("");
            setIsEditing(false)
            setTaskID(null)
        } else {
            const newTask = {
                id: Date.now(), 
                name,
                date,
                isComplete: false
            }
            setTasks([...tasks, newTask])
            setName("")
            setDate("")
        }
    };

    const editTask = (id) => {
        // console.log(id)
        const thisTask = tasks.find((task) => task.id === id)
        setIsEditing(true)
        setTaskID(id)
        setName(thisTask.name);
        setDate(thisTask.date);
    };

    const deleteTask = (id) => {
        // console.log(id)
        if(window.confirm("Delete this task") === true) {
            const newTasks = tasks.filter((task) => task.id !== id);
            setTasks(newTasks);
        }
    };

    const completeTask = (id) => {
        // console.log(id)
        setTasks(
            tasks.map((task) => {
                if (task.id === id) {
                    return {...task, isComplete: true}
                } else {
                    return task
                }
            })
        )
    };

  return (
    <div className='--bg-primary'>
        {/* <Alert /> */}
        <Confirm />
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
