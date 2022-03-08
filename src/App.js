import React, {useState, useEffect} from 'react';
import axios from 'axios'

import {List, Tasks, AddList} from './assets/components'

import icon_list from './assets/components/icons/entypo-list.svg'

function App() {
  const [loading, setIsLoading] = useState(false)
    const [lists, setList] = useState([])
    const [colors, setColors] = useState([])
    const [tasks, setShowTask] = useState()

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
      console.log(newList);

      setList(newList)
    }

  return (<div className={'todo'}>
  <div className={'todo__sidebar'}>
  {
        lists ? <> <List  items={
          [
            {
              name: 'Все задачи',
              img: icon_list,
              icon : true,
              active: true,
              id: 1
            }
          ]
        } />
        <List 
        items={lists} 
        onShowList={ (item) =>  setShowTask(item) }
        removeList={ (id) => deleteList(id) }
        activeList={tasks}
        isVisible/> </> : 'Загрузка...' 
        
      }
      
    <AddList onAdd={addList} colors={colors}/>
   
  </div>

  <div className={'todo__tasks'}>
    {lists && tasks && <Tasks list={tasks} chengeTitle={chengeTitle} addTask={addTask} />}
  </div>
</div>
  );
}

export default App;
