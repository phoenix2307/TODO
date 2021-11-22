import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTasks: (title: string) => void
}

function TodoList(props: PropsType) {
    const [title, setTitle] = useState<string>('')
    const addTask = () => {
        props.addTasks(title)
        setTitle('')
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const keyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask()
        }
    }
    const clickAll = () => props.changeFilter('all')
    const clickActive = () => props.changeFilter('active')
    const clickCompleted = () => props.changeFilter('completed')

    const tasksJSX = props.tasks.map(task => {
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={() => props.removeTask(task.id)}>x</button>
            </li>
        )
    })
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={changeTitle}
                    onKeyPress={keyPress}
                />
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {tasksJSX}
            </ul>
            <div>
                <button onClick={clickAll}>All</button>
                <button onClick={clickActive}>Active</button>
                <button onClick={clickCompleted}>Completed</button>
            </div>
        </div>
    )
}

export default TodoList;