import React from 'react'
import {FaCheckDouble, FaEdit, FaTrashAlt} from 'react-icons/fa'


const Task = ({id, name, date, isComplete, editTask, deleteTask, completeTask}) => {
  return (
    <div className={isComplete ? "task complete":"task"} 
            key={id}
            style={{display: 'block'},{width:'500px'}}>
        <span>
            <p><b>Task: </b>{name}</p>
            <p><b>Date: </b>{date}</p>
        </span>
        <span>
            <button onClick={() => editTask(id)}><FaEdit color='green'/></button>
            <button onClick={() => deleteTask(id)}><FaTrashAlt color='red'/></button>
            <button onClick={() => completeTask(id)}><FaCheckDouble color='purple'/></button>
        </span>
    </div>
  )
}

export default Task
