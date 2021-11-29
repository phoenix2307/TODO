import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";

//Create
//Read
//Update
//Delete
//CRUD

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    //BLL:
    const todoListTitle: string = 'What to learn'

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'REACT', isDone: false},
    ])
    const [filter, setFilter] = useState<FilterValuesType>('all')

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }
    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(task => task.id !== taskId))
    }
    const addTask = (newTaskTitle: string) => {
        // const newTaskTitle: string = 'New Task'
        const newTask: TaskType = {
            id: v1(),
            title: newTaskTitle,
            isDone: false
        }
        setTasks([newTask, ...tasks])
    }

    const changeTaskStatus = (taskID: string, isDone: boolean) => {
        const updatedTasks = tasks.map(t => t.id === taskID ? {...t, isDone: isDone} : t)
            setTasks(updatedTasks)
    }

    let tasksForRender = tasks
    if (filter === 'active') {
        tasksForRender = tasks.filter(t => t.isDone === false)
    }
    if (filter === 'completed') {
        tasksForRender = tasks.filter(t => t.isDone === true)
    }

    //UI:
    return (
        <div className="App">
            <TodoList
                title={todoListTitle}
                tasks={tasksForRender}
                filter={filter}
                addTasks={addTask}
                removeTask={removeTask}
                changeFilter={changeFilter}
                changeTaskStatus={changeTaskStatus}
            />
        </div>
    );
}

export default App;
