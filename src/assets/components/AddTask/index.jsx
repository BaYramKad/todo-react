import React, {useState} from 'react'
import axios from 'axios'

import addSvg from '../icons/add.svg'

import './AddTask.scss'

export default function AddTask({list, addTask }) {
    const [visibleChange, setVisibleChange] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [loading, setLoading] = useState(false)

    const showPopup = () => {
        setVisibleChange(!visibleChange)
    }

    const setTask = () => {
        if(!inputValue.trim()){
            alert('Введите название задачи')
            return
        }
        const newTask = {
            "listId": list.id,
            "text": inputValue,
            "completed": false
          }
          setLoading(true)
        axios.post('http://localhost:3001/tasks', newTask).then(({data}) => {
            addTask(data)
        }).catch(error => {
            alert('Не удалось добавить задачу Ошибка: ' + error)
        }).finally(() => {
            showPopup()
            setInputValue('')
            setLoading(false)
        })
    }

  return (
    <div className='task__items-add'>

        {
            !visibleChange ?  
                <div className="task-add" onClick={showPopup}>
                    <img src={addSvg} alt="add task" />Новая задача
                </div> 
            : <div className="task-add-value">
                <input 
                    onChange={ (e) => setInputValue(e.target.value)}
                    value={inputValue}
                    className="fild" 
                    type="text" 
                    placeholder="Название задачи"/>
                    <div className="buttons">
                        <button className="button" onClick={setTask}> {loading ? "Добавление..." : "Добавить задачу"} </button>
                        <button className="button" onClick={showPopup}> Отмена </button>
                    </div>
            </div>
        }

       

        
    </div>
  )
}
