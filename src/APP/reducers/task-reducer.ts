import {v1} from "uuid";
import {todolistId1, todolistId2} from "./todolist-reducer";
import {PropsType} from "../Body/Todolist/TodoList";
import {TasksType} from "../Body/AppTodolistWithReducer";


type ActionsType = RemoveTaskACType | AddNewTaskACType | ChangeTaskStatusACType | EditTaskTitleACType
    | AddTodolistACType | RemoveTodolistACType


type RemoveTaskACType = {
    type: "REMOVE_TASK"
    todolistId: string
    taskId: string
}
type AddNewTaskACType = {
    type: "ADD_NEW_TASK_TYPE"
    todolistId: string
    title: string
    taskId: string
}
type ChangeTaskStatusACType = {
    type: 'CHANGE_TASK_STATUS'
    todolistId: string
    taskId: string
    isDone: boolean
}
type EditTaskTitleACType = {
    type: "EDIT_TASK_TITLE"
    todolistId: string
    taskId: string
    title: string
}
type AddTodolistACType = {
    type: "ADD_TODOLIST"
    todolistId: string
}
type RemoveTodolistACType = {
    type: "REMOVE_TODOLIST"
    todolistId: string
}


const initialState: TasksType = {
    [todolistId1]: [
        {id: v1(), title: 'NodeJS', isDone: true},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
    ],
    [todolistId2]: [
        {id: v1(), title: 'Book', isDone: true},
        {id: v1(), title: 'Notebook', isDone: false}
    ],
}


export const taskReducer = (state: TasksType = initialState, action: ActionsType): TasksType => {
    debugger
    switch (action.type) {
        case "REMOVE_TASK":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
            }
        case "ADD_NEW_TASK_TYPE":
            const newTask: PropsType = {id: action.taskId, title: action.title, isDone: false}
            return {
                ...state,
                [action.todolistId]: [...state[action.todolistId], newTask]
            }
        case "CHANGE_TASK_STATUS":
            return {
                ...state,
                [action.todolistId]:
                    state[action.todolistId].map(t => t.id === action.taskId ? {...t, isDone: action.isDone} : t)
            }
        case "EDIT_TASK_TITLE":
            return {
                ...state,
                [action.todolistId]:
                    state[action.todolistId].map(t => t.id === action.taskId ? {...t, title: action.title} : t)
            }
        case "ADD_TODOLIST":
            return {
                ...state, [action.todolistId]: []
            }
        case "REMOVE_TODOLIST":
            delete state[action.todolistId]
            return {
                ...state
            }


        default:
            throw new Error(" action type wasn't find")
    }
}

export const removeTaskAC = (todolistId: string, taskId: string): RemoveTaskACType => ({
    type: "REMOVE_TASK",
    todolistId,
    taskId
})
export const addNewTaskAC = (todolistId: string, title: string): AddNewTaskACType => ({
    type: 'ADD_NEW_TASK_TYPE',
    todolistId,
    taskId: v1(),
    title
})
export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean): ChangeTaskStatusACType => ({
    type: 'CHANGE_TASK_STATUS',
    todolistId,
    taskId,
    isDone
})
export const editTaskTitleAC = (todolistId: string, taskId: string, title: string): EditTaskTitleACType => ({
    type: "EDIT_TASK_TITLE",
    todolistId,
    taskId,
    title
})
export const addEmptyArrayNewTodolistAC = (todolistId: string): AddTodolistACType => ({
    type: "ADD_TODOLIST",
    todolistId
})
export const deleteArrayTasksAC = (todolistId: string): RemoveTodolistACType => ({
    type: "REMOVE_TODOLIST",
    todolistId
})
