import {v1} from "uuid";
import {todolistId1, todolistId2} from "./todolist-reducer";
import {TasksType} from "../Body/AppTodolist";


type ActionsType= RemoveTaskAC

type RemoveTaskAC ={
    type: "REMOVE_TASK"
    todolistId: string
    taskId: string
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
    switch (action.type){
        case "REMOVE_TASK":
            return {...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        default:
            throw new Error(" action type wasnt find")
    }
}

export const removeTaskAC = (todolistId: string, taskId: string): RemoveTaskAC => ({
    type: "REMOVE_TASK",
    todolistId,
    taskId
})