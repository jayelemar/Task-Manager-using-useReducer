import './TaskManager.css'
import Task from './Task'
import { useState, useRef, useEffect, useReducer } from 'react'
import useLocalStorage from 'use-local-storage'
import Alert from '../alert/Alert'
import Confirm from '../confirm/Confirm'
import { taskReducer } from './taskReducer'

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
        alertClass:"success",
        isEditModalOpen: false,
        isDeleteModalOpen: false,
        modalTitle: "Delete Task",
        modalMsg: "You are to delete this task",
        modalActionText: "OK"
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

        if (name && date && state.isEditing) {
            const updatedTask = {
                id: state.taskID,
                name,
                date,
                isComplete: false,
            }
            dispatch({
                type: "UPDATE_TASK",
                payload: updatedTask
            });
            setName("");
            setDate("");
            setTasks(
                tasks.map((task) => {
                    if (task.id === updatedTask.id) {
                        return {
                            ...task,
                            name,
                            date,
                            isComplete: false
                        }
                    } return task;
                })
                // [...tasks, newTask]
                )
            return;
        }

        if (name && date) {
            const newTask = {
                id: Date.now(),
                name,
                date,
                isComplete: false,
            }
            dispatch({
                type: "ADD_TASK",
                payload: newTask
            })
            setName("");
            setDate("");
            setTasks([...tasks, newTask])
        }
    };

    const openEditModal = (id) => {
        dispatch({
            type: "OPEN_EDIT_MODAL",
            payload: id
        })
    };

    const editTask = () => {
        // console.log(state.taskID);
        const id = state.taskID
        dispatch({
            type: "EDIT_TASK",
            payload: id
        })
        const thisTask = state.tasks.find((task) => task.id === id)
        // console.log(thisTask)
        setName(thisTask.name)
        setDate(thisTask.date)
        closeModal();
    };

    const openDeleteModal = (id) => {
        dispatch({
            type: "OPEN_DELETE_MODAL",
            payload: id
        })
    };

    const deleteTask = () => {
        // console.log(state.taskID);
        const id = state.taskID;
        dispatch({
            type: "DELETE_TASK",
            payload: id
        });
        const newTasks = tasks.filter((task) => task.id !== id)
        setTasks(newTasks);
    };

    const completeTask = (id) => {
        dispatch({
            type: "COMPLETE_TASK",
            payload: id,
        })
        setTasks(
            tasks.map((task) => {
                if(task.id === id) {
                    return{
                        ...tasks,
                        isComplete: true
                    }
                }
                return task
            })
        )
    };

    const closeAlert = () => {
        dispatch({
            type: "CLOSE_ALERT"
        })
    };

    const closeModal = () => {
        dispatch({
            type: "CLOSE_MODAL"
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
        {state.isEditModalOpen && <Confirm modalTitle={state.modalTitle} 
                                            modalMsg={state.modalMsg} 
                                            modalActionText={state.modalActionText} 
                                            modalAction={editTask} 
                                            onCloseModal={closeModal} 
                                            />
        }
        {state.isDeleteModalOpen && <Confirm modalTitle={state.modalTitle} 
                                            modalMsg={state.modalMsg} 
                                            modalActionText={state.modalActionText} 
                                            modalAction={deleteTask} 
                                            onCloseModal={closeModal} 
                                            /> 
        }
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
                        {state.isEditing ? "Edit Task": 'Save Task'}
                    </button>
                </form>
            </div>
        </div>
        <article className='--flex-center --my2' style={{flexDirection: 'column'}}>
            <div className='--width-500px --p'>
            <h2 className='--text-light'>Task List</h2>
            <hr style={{backgroundColor: '#fff'}}/>
            </div>
            {state.tasks.length === 0 ? (
                <p className='--text-light'>No task added...</p>
            ):(
                <div>
                    {state.tasks.map((task) => {
                        return <Task key={task.id} 
                                    {...task} 
                                    editTask={openEditModal} 
                                    deleteTask={openDeleteModal} 
                                    completeTask={completeTask}/>;
                    })}
                </div>
            )}
        </article>
    </div>
    
    )
}

export default TaskManagerReducer
