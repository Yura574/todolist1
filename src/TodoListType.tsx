import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValueType} from "./App";

export type  TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

type TodoListType = {
    title: string,
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValueType) => void
    addNewTask: (title: string) => void
}


export function TodoList(props: TodoListType) {
    const [title, setTitle] = useState<string>('')
    const addTask = () => {
        props.addNewTask(title)
        setTitle('')

    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask()
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const setFilterAll = () => props.changeFilter('all')
    const setFilterActive = () => props.changeFilter('active')
    const setFilterCompleted = () => props.changeFilter('completed')
    const task = props.tasks.map(t => {
        const deleteTask = () => {
            props.removeTask(t.id)
        }
        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={deleteTask}>x</button>
            </li>
        )
    })

    return (

        <div>
            <h1>{props.title}</h1>
            <div>
                <input type="text" value={title} onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}/>
                <button onClick={addTask}>+</button>
            </div>
            <div>{task}</div>
            <div>
                <button onClick={setFilterAll}>All</button>
                <button onClick={setFilterActive}>Active</button>
                <button onClick={setFilterCompleted}>Completed</button>
            </div>
        </div>
    )
}