import React, { useEffect, useState } from "react";
import axios from 'axios'

import List from '../List'
import plus from '../icons/add.svg'
import closeSvg from '../icons/close.svg'
import Badge from "../Badge";

import './AddList.scss'


const AddButtonList = ({colors, onAdd}) => {
    const [vivsiblePopup, setvivsiblePopup] = useState(false)
    const [selectedColor, selectColor] = useState(3)
    const [value, setValue] = useState('')
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
      if(Array.isArray(colors)) {
        selectColor(colors.id)
      }
    }, [colors])


    const addList = async () => {
      if(!value.trim()) {
        alert('Заполните: Название списка')
        return
      }
      const newList =  {
        id: Math.ceil(Math.random() * 1000),
        name: value,
        colorId: selectedColor
      }
      setIsLoading(true)
      await axios.post('http://localhost:3000/lists', newList).then(({data}) => {
        let color = colors.filter( color => color.id === selectedColor)[0]
        const list = {...data, color, tasks: []} 
        onAdd(list)
        setvivsiblePopup(false)
      }).finally(() => {
        setIsLoading(false)
      })
     
      
      setValue('')
    }

    return <div className="add-list">
      <List items={
              [
                {
                  className: 'list__add-button',
                  name: 'Добавить кнопку',
                  img: plus,
                  icon: true,
                  id: 1
                }
              ]
            } 
            onClick={ () => setvivsiblePopup(true) }
            />

       {
         vivsiblePopup &&  <div className="add-list__popup">
           <img onClick={ () => setvivsiblePopup(false) } className="add-list__popup-close" src={closeSvg} alt="close popup" />
              <input 
              onChange={ e => setValue(e.target.value) }
              className="fild" 
              type="text" 
              placeholder="Название списка"/>
              <div className="add-list__popup-color">

                {
                  colors.map(color => {
                    return <Badge 
                    onClick={ () => selectColor(color.id) } 
                    key={color.id} 
                    color={color.name}  
                    active={ selectedColor === color.id ? 'active' : ''}
                    />
                  })
                }
              </div>
              
              <button onClick={addList} className="button"> {
                isLoading ? '...' : 'Добавить'
              } </button>
          </div>
       }
    </div>
}

export default AddButtonList