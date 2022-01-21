import {FilterValuesType} from "./App";

export const FilterReducer = (state: FilterValuesType, action: GeneralType) => {
    switch (action.type) {
        case 'CHANGE-FILTER': {
            return action.payload.value
        }
        default: return state
    }
}



type GeneralType = changeFilterAC
type changeFilterAC = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (value: FilterValuesType) => {
    return {
        type: 'CHANGE-FILTER',
        payload: {
            value: value
        } as const
    } as const
}