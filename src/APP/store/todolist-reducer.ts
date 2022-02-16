import {v1} from "uuid";

export type FilterValueType = 'All' | 'Completed' | 'Active'
export type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}
export type TodolistStateType = Array<TodolistType>
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

const initialState: TodolistStateType= [
    {id: todolistId1, title: 'what to learn', filter: 'All'},
    {id: todolistId2, title: 'what to buy', filter: 'All'}
]

export function todolistReducer(state: TodolistStateType = initialState, action: ActionType): TodolistStateType {
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
            return state
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

