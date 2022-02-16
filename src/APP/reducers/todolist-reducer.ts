import {v1} from "uuid";
import {FilterValueType, TodolistType} from "../Body/AppTodolistWithReducer";


type StateType = Array<TodolistType>
type ActionType = RemoveTodolistType | AddTodolistACType | EditTodolistTitleACType | ChangeFilterTodolistAC


 type RemoveTodolistType = {
    type: 'REMOVE-TODOLIST'
    todolistId: string
}
 type AddTodolistACType = {
    type: "ADD_TODOLIST"
    todolistId: string
    title: string
}
 type EditTodolistTitleACType = {
    type: "EDIT_TODOLIST_TITLE"
    todolistId: string
    title: string
}
 type ChangeFilterTodolistAC = {
    type: "CHANGE_FILTER",
    todolistId: string,
    filterValue: FilterValueType
}

export let todolistId1 = v1()
export let todolistId2 = v1()

const initialState: Array<TodolistType> = [
    {id: todolistId1, title: 'what to learn', filter: 'All'},
    {id: todolistId2, title: 'what to buy', filter: 'All'}
]

export function todolistReducer(state: StateType = initialState, action: ActionType): StateType {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.todolistId)
        case  "ADD_TODOLIST":
            return [
                ...state, {id: action.todolistId, title: action.title, filter: 'All'}
            ]

        case "EDIT_TODOLIST_TITLE":
            return state.map(tl => tl.id === action.todolistId ? {...tl, title: action.title} : tl)
        case "CHANGE_FILTER":
            return state.map(tl => tl.id === action.todolistId ? {...tl, filter: action.filterValue} : tl)

        default:
            throw new Error("type wasn't find")
    }

}

export const removeTodolistAC = (todolistId: string): RemoveTodolistType => ({
    type: "REMOVE-TODOLIST",
    todolistId
})

export const addTodolistAC = (todolistId: string, title: string): AddTodolistACType => ({
    type: "ADD_TODOLIST",
    todolistId,
    title
})

export const changeFilterTodolistAC     = (todolistId: string, filterValue: FilterValueType): ChangeFilterTodolistAC => ({
    type: "CHANGE_FILTER",
    todolistId,
    filterValue
})

export const editTodolistTitleAC = (todolistId: string, title: string): EditTodolistTitleACType => ({
    type: "EDIT_TODOLIST_TITLE",
    title,
    todolistId
})

