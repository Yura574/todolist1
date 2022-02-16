import {TasksType} from "../Body/AppTodolist";
import { todolistId1, todolistId2} from "./todolist-reducer";
import {
    addEmptyArrayNewTodolistAC,
    addNewTaskAC,
    changeTaskStatusAC, deleteArrayTasksAC,
    editTaskTitleAC,
    removeTaskAC,
    taskReducer
} from "./task-reducer";
import {v1} from "uuid";

export const a = 3

let initialState: TasksType

beforeEach(() => {
    initialState = {
        [todolistId1]: [
            {id: '1', title: 'NodeJS', isDone: true},
            {id: '2', title: 'CSS', isDone: true},
            {id: '3', title: 'JS', isDone: true},
            {id: '4', title: 'React', isDone: false},
        ],
        [todolistId2]: [
            {id: '1', title: 'Book', isDone: true},
            {id: '2', title: 'Notebook', isDone: false}
        ],
    }
})

test('task should be remove', () => {
    const endState = taskReducer(initialState, removeTaskAC(todolistId1, '2' ))

    expect(endState[todolistId1].length).toBe(3)
})

test('new task should be add', () => {

    const endState = taskReducer(initialState, addNewTaskAC(todolistId1, 'Redux'))

    expect(endState[todolistId1].length).toBe(5)
    expect(endState[todolistId1][4].title).toBe('Redux')
})

test('status task should be changed', () => {
    const endState = taskReducer(initialState, changeTaskStatusAC(todolistId1, '1', false))


    expect(endState[todolistId1][0].isDone).toBe(false)
    expect(endState[todolistId1].length).toBe(4)
})

test('title task should be changed', () =>{
    const endState = taskReducer(initialState, editTaskTitleAC(todolistId1, '4', 'YoYoYo'))

    expect(endState[todolistId1][3].title).toBe('YoYoYo')
})

test('empty array should be add', () => {
    const newTodolistId  = v1()
    const endState = taskReducer(initialState, addEmptyArrayNewTodolistAC(newTodolistId ) )

    expect(endState[newTodolistId].length).toBe(0)
    expect(endState[newTodolistId]).toBeTruthy()
})

test('array tasks should be deleted', () => {
    const endState = taskReducer(initialState, deleteArrayTasksAC(todolistId2))

    expect(endState[todolistId2]).toBeFalsy()
})