import {TasksType} from "../Body/AppTodolist";
import {todolistId1, todolistId2} from "./todolist-reducer";
import {removeTaskAC, taskReducer} from "./task-reducer";

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