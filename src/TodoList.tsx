import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTasks: (title: string) => void
    filter: FilterValuesType
    changeTaskStatus: (taskID: string, isDone: boolean) => void
}

function TodoList(props: PropsType) {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTasks(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle('')

    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const keyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask()
        }
    }
    const clickAll = () => props.changeFilter('all')
    const clickActive = () => props.changeFilter('active')
    const clickCompleted = () => props.changeFilter('completed')

    const tasksJSX = props.tasks.map(task => {

        const getClasses = () => task.isDone ? 'is-done' : '';
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) =>
            props.changeTaskStatus(task.id, e.currentTarget.checked)
        const removeTask = () => props.removeTask(task.id)

        return (
            <li key={task.id} className={getClasses()}>
                <input type="checkbox"
                       checked={task.isDone}
                       onChange={changeStatus}
                />
                <span>{task.title}</span>
                <button onClick={removeTask}>x</button>
            </li>
        )
    })
    const errorMessage = <div style={{color: "red"}}>Title is required!</div>

    const getBtnClass = (filter: FilterValuesType) => props.filter === filter ? 'active' : '';
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={changeTitle}
                    onKeyPress={keyPress}
                    className={error ? 'error' : ''}
                />
                <button onClick={addTask}>+</button>
                {error && errorMessage}
            </div>
            <ul>
                {tasksJSX}
            </ul>
            <div>
                <button
                    className={getBtnClass('all')}
                    onClick={clickAll}>All
                </button>
                <button
                    className={getBtnClass('active')}
                    onClick={clickActive}>Active
                </button>
                <button
                    className={getBtnClass('completed')}
                    onClick={clickCompleted}>Completed
                </button>
            </div>
        </div>
    )
}

export default TodoList;