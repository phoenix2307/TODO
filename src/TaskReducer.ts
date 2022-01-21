import {TaskType} from "./Todolist";
import {v1} from "uuid";

export const TaskReducer = (state: TaskType[], action: GeneralType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return state.filter(f => f.id !== action.id)
        }

        case 'ADD-TASK': {
            let newTask: TaskType = {id: v1(), title: action.payload.title, isDone: false};
            return [newTask, ...state]
        }

        default:
            return state
    }
}

type GeneralType = removeTaskACType | addTaskACType


type removeTaskACType = ReturnType<typeof removeTaskAC>

export const removeTaskAC = (id: string) => {
    return {
        type: 'REMOVE-TASK',
        id: id
    } as const
}

type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (title: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            title: title
        }
    } as const
}

