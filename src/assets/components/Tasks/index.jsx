import React, {useRef, useState} from 'react'

import './Tasks.scss'
import edit from '../icons/edit.svg'

import {AddTask, Task} from '../index'

const Tasks = ({list, chengeTitle, addTask, withoutEmpty, onRemove, onEditTask, onCompleteTask}) => {

  const editTitle = () => {
      const newTitle = window.prompt('Измените заголовок списка', list.name)
      if(newTitle) {
        chengeTitle(list.id, newTitle)
        
      }
  }
  return <div className='tasks'>
          <h2 className='tasks__title' style={{ color: list.color.hex }}>
            { list && list.name}
          <i> 
            <img onClick={editTitle} src={edit} alt='edittitle'/>
          </i>
          </h2>

          <div className='tasks__items'>
            {!withoutEmpty && <h2>Задачи отсутствуют</h2>}
            { list.tasks && list.tasks.map((task, i) => (
                  <Task
                  key={task.id}
                  list={list}
                  onRemove={onRemove}
                  onEdit={onEditTask}
                  onCompleteTask={onCompleteTask}
                  {...task}
                />
            ) )
            }

            <AddTask key={list.id} list={list} addTask={addTask} />
        </div>
  </div>
}

export default Tasks
