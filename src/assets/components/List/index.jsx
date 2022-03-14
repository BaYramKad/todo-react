import classNames from "classnames"
import React, {useState} from "react"
import axios from 'axios'

import './List.scss'
import Badge from "../Badge"

import remove from '../icons/remove-list.svg'

const List = ({ items, onClick, isVisible, removeList, onShowList, activeList, active }) => {
    const removeItem = (item) => {
        axios.delete('http://localhost:3000/lists/' + item.id).then(() => {
            removeList(item.id)
        })
    }
    return (<>
            <ul onClick={onClick} className={`list`}>
                {
                    items.map(item => {
                        return (<li key={item.id} onClick={ onShowList ?  () => onShowList(item) : null } className={classNames(item.className, { "active": item.active ? true :  activeList && activeList.id === item.id} )}>
                                {
                                    item.icon 
                                    ? <img src={item.img} alt="list icon"/> 
                                    : <Badge color={item.color.name}/>
                                }
                            <span>{item.name} { item.tasks &&  <i>{ `(${item.tasks && item.tasks.length >= 0 && item.tasks.length})` }</i>  } </span>
                            {
                                isVisible &&  <img 
                                onClick={ () => removeItem(item) }
                                className="list__remove-icon" 
                                src={remove} 
                                alt='remove button'/>
                            }
                        </li>)
                    })
                }
            </ul>
        </>
    )
}

export default List
