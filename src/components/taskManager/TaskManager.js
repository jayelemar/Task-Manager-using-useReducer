import React from 'react'
import './TaskManager.css'

const TaskManager = () => {
  return (
    <div className='--bg-primary'>
        <h1 className='--text-center --text-light'>Task Manager using useState</h1>
        <div className='--flex-center --p'>
            <div className='--card --width-500px --p --flex-center'>
                <form action="" className='--form-control form'>
                    <div>
                            <label htmlFor="name">Task</label>
                            <input type="text" placeholder='Task Name' name='name'/>
                    </div>
                    <div>
                            <label htmlFor="date">Task</label>
                            <input type="date" name='date'/>
                    </div>
                    <button className='--btn --btn-success --btn-block --p'>Save Task</button>
                </form>
            </div>
            
        </div>
    </div>
    
  )
}

export default TaskManager
