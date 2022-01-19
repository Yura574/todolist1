import React, {ChangeEvent} from "react";
import {FilterValueType} from "./App";
import {AddItemForm} from "./AddItemForm";

export type  PropsType = {
    id: string,
    title: string,
    isDone: boolean
}

type TodoListType = {
    title: string,
    tasks: Array<PropsType>
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValueType, todolistId: string) => void
    addNewTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilterValueType
    id: string
    removeTodolist: (todolistId: string) => void
}


export function TodoList(props: TodoListType) {


    const setFilterAll = () => props.changeFilter('all', props.id)
    const setFilterActive = () => props.changeFilter('active', props.id)
    const setFilterCompleted = () => props.changeFilter('completed', props.id)
    const task = props.tasks.map(t => {
        debugger
        const deleteTask = () => {
            props.removeTask(t.id, props.id)
        }
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
        }
        return (
            <li key={t.id} className={t.isDone ? 'opacity' : ''}>
                <input type="checkbox"
                       checked={t.isDone}
                       onChange={changeStatus}

                />

                <span>{t.title}</span>
                <button onClick={deleteTask}>x</button>
            </li>

        )
    })

    const addTask = (title: string) => {
        props.addNewTask(title, props.id)
    }
    return (

        <div>
            <h1>{props.title}
                <button onClick={() => props.removeTodolist(props.id)}>x</button>
            </h1>
            <AddItemForm addItem={addTask} />

            <div>{task}</div>
            <div>
                <button
                    className={props.filter === 'all' ? 'isDone' : ''}
                    onClick={setFilterAll}>All
                </button>
                <button
                    className={props.filter === 'active' ? 'isDone' : ''}
                    onClick={setFilterActive}>Active
                </button>
                <button
                    className={props.filter === 'completed' ? 'isDone' : ''}
                    onClick={setFilterCompleted}>Completed
                </button>
            </div>
        </div>
    )
}