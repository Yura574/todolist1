import {v1} from "uuid";
import {
    addTodolistAC,
    changeFilterTodolistAC,
    editTodolistTitleAC,
    removeTodolistAC,
    todolistReducer
} from "./todolist-reducer";
import {TodolistType} from "../Body/AppTodolist";


let todolistId1 = v1()
let todolistId2 = v1()

let initialState: Array<TodolistType>

beforeEach(() => {
    initialState = [
        {id: todolistId1, title: 'what to learn', filter: 'All'},
        {id: todolistId2, title: 'what to buy', filter: 'All'}
    ]
})

test('todolist should be deleted', () => {
    const endState = todolistReducer(initialState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
})

test('todolist should be add', () => {
    const endState = todolistReducer(initialState, addTodolistAC( '3','newTodolist'))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe('newTodolist')
})

test('title todolist should ba change', ()=> {
    const endState = todolistReducer(initialState, editTodolistTitleAC(todolistId1, 'newTitle'))

    expect(endState[0].title).toBe('newTitle')
    expect(endState[1].title).toBe('what to buy')
})

test('filter todolist should be changed', () => {
    const endState = todolistReducer(initialState, changeFilterTodolistAC(todolistId1, 'Completed'))

    expect(endState[0].filter).toBe('Completed')
    expect(endState[1].filter).toBe('All')
})