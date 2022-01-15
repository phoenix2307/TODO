import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItem} from "./AddItem";
import {EditableSpan} from "./EditableSpan";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    filter: FilterValuesType
    updateTask: (todolistId: string, id: string, title: string) => void
    updateTodolist: (todolistId: string, title: string) => void

}

export function Todolist(props: PropsType) {
    // let [title, setTitle] = useState("")
    // let [error, setError] = useState<string | null>(null)

    /*    const addTask = () => {
            let newTitle = title.trim();
            if (newTitle !== "") {
                props.addTask(newTitle, props.id);
                setTitle("");
            } else {
                setError("Title is required");
            }
        }*/

    /*    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            setTitle(e.currentTarget.value)
        }*/

    /*    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
            setError(null);
            if (e.charCode === 13) {
                addTask();
            }
        }*/

    const removeTodolist = () => props.removeTodolist(props.id)
    const onAllClickHandler = () => props.changeFilter("all", props.id)
    const onActiveClickHandler = () => props.changeFilter("active", props.id)
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id)
    const callbackHandler = (title: string) => {
        props.addTask(title, props.id)
    }
    const onClickHandler = (taskId: string) => {
        props.removeTask(taskId, props.id)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>, taskId: string) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeTaskStatus(taskId, newIsDoneValue, props.id);
    }
    const callbackHandlerForUpdateTask = (id:string, title: string) => {
        props.updateTask(props.id, id, title)
    }

    return <div>
        <h3>
        <EditableSpan title={props.title} callback={(title)=>props.updateTodolist(props.id, title)}/>
            <button onClick={removeTodolist}>x</button>
        </h3>
        <div>
            <AddItem
                callback={callbackHandler}/>
        </div>
        <ul>
            {
                props.tasks.map(t => {

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input
                            type="checkbox"
                            onChange={(e) =>{
                                onChangeHandler(e, t.id)}}
                            checked={t.isDone}/>

                        <EditableSpan
                            title={t.title}
                            callback={(title)=>callbackHandlerForUpdateTask(t.id, title)}
                        />
                        <button onClick={() => onClickHandler(t.id)}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}


