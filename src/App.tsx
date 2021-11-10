import React from 'react';
import './App.css';
import TodoList from "./TodoList";


//Create
//Read
//Update
//Delete
//CRUD

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

function App() {

    //BLL:
    const todoListTitle_1: string = 'What to learn'
    const todoListTitle_2: string = 'What to buy'
    const task_1: Array<TaskType> = [
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'CSS', isDone: true},
        {id: 3, title: 'REACT', isDone: false},
    ]
    const task_2: Array<TaskType> = [
        {id: 4, title: 'Meat', isDone: false},
        {id: 5, title: 'Beer', isDone: false},
        {id: 6, title: 'Milk', isDone: true},
    ]
    //UI:
    return (
        <div className="App">
            <TodoList title={todoListTitle_1} tasks={task_1}/>
            <TodoList title={todoListTitle_2} tasks={task_2}/>

        </div>
    );
}

export default App;
