import {FilterValuesType, TodolistType} from "./App";
import {v1} from "uuid";

export const todolistsReducer = (state: TodolistType[], action: GeneralACType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            state = state.filter(f => f.id !== action.payload.id)
            return state
        }
        case "ADD-TODOLIST": {
            let todoListID = v1()
            let newTodoList: TodolistType = {id: todoListID, title: action.payload.title, filter: 'all'}
            state = [...state, newTodoList]
            return state
        }
        case "CHANGE-TODOLIST-TITLE": {
            let newState = [...state]
            return newState.map(m => m.id === action.payload.id ? {...m, title: action.payload.title} : m)
        }
        case "CHANGE-TODOLIST-FILTER": {
            const newState = [...state]
            return newState.map(m => m.id === action.payload.id ? {...m, filter: action.payload.filter} : m)
        }
        default:
            throw new Error("I don't understand this type")
    }

}

type GeneralACType = removeTodolistACType
    | AddTodolistACType
    | ChangeTodoListTitleACType
    | ChangeTodoListFilterACType

type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {id}
    } as const
}

type AddTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title
        }
    } as const
}

type ChangeTodoListTitleACType = ReturnType<typeof changeTodoListTitleAC>
export const changeTodoListTitleAC = (id: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            id, title
        }
    } as const
}

type ChangeTodoListFilterACType = ReturnType<typeof changeTodoListFilterAC>
export const changeTodoListFilterAC = (id: string, filter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            id, filter
        }
    } as const
}