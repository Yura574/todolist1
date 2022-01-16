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
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValueType
}


export function TodoList(props: TodoListType) {

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const addTask = () => {
        if (title.trim() !== '') {
            props.addNewTask(title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      setError(null)
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
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked)
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

    return (

        <div>
            <h1>{props.title}</h1>
            <div>
                <input type="text" value={title} onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? 'error-input' : ''}/>
                <button onClick={addTask}>+</button>

            </div>
            {error && <span
                className={error ? 'error-message' : ''}>{error}</span>}

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