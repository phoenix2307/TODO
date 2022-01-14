import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {
    let todolistID1 = v1()
    let todolistID2 = v1()
    let [todolists, setTodoLists] = useState<Array<TodoListType>>([
            {id: todolistID1, title: 'What to learn', filter: 'all'},
            {id: todolistID2, title: 'What to buy', filter: 'all'}
        ]
    )
    // let [filter, setFilter] = useState<FilterValuesType>("all");
    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "Books", isDone: true},
            {id: v1(), title: "ZenBook", isDone: true},
            {id: v1(), title: "WebStorm", isDone: false},
            {id: v1(), title: "New case", isDone: false},
        ]
    })


    function removeTask(todoListID: string, id: string) {
        setTasks({...tasks, [todoListID]: tasks[todoListID].filter(f=> f.id !== id)})
        // let filteredTasks = tasks.filter(t => t.id != id);
        // setTasks(filteredTasks);
    }
    function addTask(todoListID: string, title: string) {
        let newTask = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})
        // let task = {id: v1(), title: title, isDone: false};
        // let newTasks = [task, ...tasks];
        // setTasks(newTasks);
    }
    function changeStatus(todoListID: string, taskId: string, isDone: boolean) {
        setTasks({...tasks, [todoListID]: tasks[todoListID].map(t=> t.id === taskId ? {...t, isDone} : t)})

        // let task = tasks.find(t => t.id === taskId);
        // if (task) {
        //     task.isDone = isDone;
        // }
        // setTasks([...tasks]);
    }
    function changeFilter(todoListID: string, value: FilterValuesType) {
        setTodoLists(todolists.map(m => m.id === todoListID ? {...m, filter: value} : m))
        // setFilter(value);
    }
    function removeTodoList(todolistID: string) {
        setTodoLists(todolists.filter(t=> t.id !== todolistID))
    }

    return (
        <div className="App">
            {todolists.map(t => {
                let tasksForTodolist = tasks[t.id];
                if (t.filter === "active") {
                    tasksForTodolist = tasks[t.id].filter(t => !t.isDone);
                }
                if (t.filter === "completed") {
                    tasksForTodolist = tasks[t.id].filter(t => t.isDone);
                }
                return (
                    <Todolist
                        key={t.id}
                        todoListID={t.id}
                        title={t.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        onClickHandler={removeTodoList}
                        filter={t.filter}
                    />
                )
            })}
        </div>
    );
}

export default App;
