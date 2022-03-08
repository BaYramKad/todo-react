import React, {useRef, useState} from 'react'

import './Tasks.scss'
import edit from '../icons/edit.svg'

import {AddTask} from '../index'

const Tasks = ({list, chengeTitle, addTask}) => {
  const editTitle = () => {
      const newTitle = window.prompt('Измените заголовок списка', list.name)
      if(newTitle) {
        chengeTitle(list.id, newTitle)
        
      }
  }
  return <div className='tasks'>
          <h2 className='tasks__title'>
            { list && list.name}
          <i> 
            <img onClick={editTitle} src={edit} alt='edittitle'/>
          </i>
          </h2>

          <div className='tasks__items'>
            {list.tasks && !list.tasks.length && <h2>Задачи отсутствуют</h2>}
            { list && list.tasks && list.tasks.map((task, i) => (
              <div key={i} className="tasks__items-row">
              <div className="checkbox">
                  <input id={`task-${i}`} type='checkbox' />
                    <label htmlFor={`task-${i}`}>
                        <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </label>
    
                </div>
    
                <input readOnly className='task' value={task.text}/>
              </div>
            ) )
            }

            <AddTask list={list} addTask={addTask} />
        </div>
  </div>
}

export default Tasks
