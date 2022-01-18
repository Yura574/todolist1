import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValueType} from "./App";

export type  PropsType = {
    id: string,
    title: string,
    isDone: boolean
}

type TodoListType = {
    title: string,
    tasks: Array<PropsType>
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValueType, todolistId:string) => void
    addNewTask: (title: string, todolistId:string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilterValueType
    id: string
    removeTodolist: (todolistId: string) => void
}


export function TodoList(props: TodoListType) {

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const addTask = () => {
        if (title.trim() !== '') {
            props.addNewTask(title.trim(), props.id)
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
    const setFilterAll = () => props.changeFilter('all', props.id)
    const setFilterActive = () => props.changeFilter('active', props.id)
    const setFilterCompleted = () => props.changeFilter('completed', props.id)
    const task = props.tasks.map(t => {
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

    return (

        <div>
            <h1>{props.title}<button onClick={() => props.removeTodolist(props.id)}>x</button></h1>
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