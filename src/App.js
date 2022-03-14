import React, {useState, useEffect} from 'react';
import axios from 'axios'
import {
  Switch,
  Route,
  useHistory
} from "react-router-dom";

import { useLocation } from 'react-router-dom';

import {List, Tasks, AddList} from './assets/components'

import icon_list from './assets/components/icons/entypo-list.svg'

function App() {
    const [loading, setIsLoading] = useState(false)
    const [lists, setList] = useState(null)
    const [colors, setColors] = useState([])
    const [activeItem, setActiveItem] = useState(null)
    let history = useHistory()
    let location = useLocation()

    useEffect(() => {
      const load = async () => {
        setIsLoading(true)
        const res_Lists = await axios.get('http://localhost:3001/lists?_expand=color&_embed=tasks')
        const res_Colors = await axios.get('http://localhost:3001/colors')

        setList(res_Lists.data)
        setColors(res_Colors.data)
        setIsLoading(false)
      }
      load()
    }, [])

    const addList = (obj) => {
      const newList = [...lists, obj]
      setList(newList)
    }

    const deleteList = (id) => {
      const deleteList = lists.filter(list => list.id !== id)
      setList(deleteList)
    }

    const chengeTitle = (id, title) => {
      axios.patch('http://localhost:3001/lists/' + id, {
        name: title
      }).catch((error) => {
        alert('Не удалось обновить название списка, ошибка: ' + error)
      })
      const newList = lists.map(item => {
        if(item.id === id) {
          item.name = title
        }
        return item
      })
      setList(newList)
    }

    const addTask = (task) => {
      const newList = lists.map(item => {
        if(item.id === task.listId) {
          item.tasks = [ ...item.tasks, task ]
        }
        return item
      })
      setList(newList)
    }

    const onRemoveTask = (listId, idTask) => {
      if(window.confirm('Вы действительно хотите удалить эту задачу?')) {
        const newTasks = lists.map(list => {
          if(list.id === listId) {
            list.tasks = list.tasks.filter(task => task.id !== idTask)
          }
          return list
        })
        setList(newTasks)

        axios.delete('http://localhost:3001/tasks/' + idTask).catch((err) => {
          alert('Не удалось удалить задачу. Ошибка: ' + err)
        })
      }
     
    }
// { id: 12, text: '12312' }
    const onEditTask = (listId, taskObj) => {
      const newText = window.prompt('Измените текст задачи', taskObj.text)
      if (!newText.trim()) return
      const newTasks = lists.map(list => {
        if(list.id === listId) {
          list.tasks.map(task => {
            if(task.id === taskObj.id) {
              task.text = newText
            }
            return task
          })
        }
        return list
      })
      setList(newTasks)

      axios.patch('http://localhost:3001/tasks/' + taskObj.id, {
        text: newText
      }).catch((error) => {
        alert('Не удалось обновить название списка, ошибка: ' + error)
      })

    }

    const onCompleteTask = (listId, taskId, completed) => {
      const newTasks = lists.map(list => {

        if(list.id === listId) {
          list.tasks.map(task => {
            if(task.id === taskId) {
              task.completed = completed
            }
            return task
          })
        }
        return list
      })
      setList(newTasks)

      axios.patch('http://localhost:3001/tasks/' + taskId, {
        completed
      }).catch((error) => {
        alert('Не удалось отметить задачу, ошибка: ' + error)
      })
    }
    
    useEffect(() => {
      const listId = location.pathname.split('lists/')[1]
      if(lists) {
        const list = lists.find((list) => list.id === Number(listId))
  
        setActiveItem(list)
      }
      
  }, [location.pathname, lists])


  return ( <div className={'todo'}>
          <div className={'todo__sidebar'}>
            {
                lists ? <> <List  items={
                  [{
                      name: 'Все задачи',
                      img: icon_list,
                      icon : true,
                      active: location.pathname === '/',
                      withoutEmpty: false,
                      id: 1
                    }]
                } 
                onShowList={ () => {
                  history.push('/')
                }}
                
                />
                <List 
                      items={lists}  
                      onShowList={ (item) => history.push(`/lists/${item.id}`)}
                      removeList={ (id) => deleteList(id) }
                      activeList={activeItem}
                      isVisible/> </> : 'Загрузка...' 
              }
              
            <AddList onAdd={addList} colors={colors}/>
          
          </div>

          <div className={'todo__tasks'}>
              
                    <Route exact path='/'>
                        { lists && lists.map((list, i) => {
                            return <Tasks 
                                        key={i} 
                                        list={list} 
                                        chengeTitle={chengeTitle} 
                                        addTask={addTask}
                                        onRemove={onRemoveTask}
                                        onEditTask={onEditTask}
                                        onCompleteTask={onCompleteTask}
                                        withoutEmpty />
                        })}
                      </Route> 

                <Route path="/lists/:id">
                        { lists && activeItem && 
                        (<Tasks 
                            list={activeItem} 
                            chengeTitle={chengeTitle} 
                            addTask={addTask} 
                            onRemove={onRemoveTask}
                            onEditTask={onEditTask}
                            onCompleteTask={onCompleteTask}
                            withoutEmpty={activeItem.tasks && activeItem.tasks.length}
                        />)}
                  </Route> 
          </div>
        </div>
  )
}

export default App;


