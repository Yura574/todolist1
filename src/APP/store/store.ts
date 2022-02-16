import {combineReducers, createStore} from "redux";
import {todolistReducer} from "./todolist-reducer";
import {taskReducer} from "./task-reducer";


const rootReducer = combineReducers({
    todolist: todolistReducer,
    tasks: taskReducer
})

export type StoreType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)


// @ts-ignore
window.store = store