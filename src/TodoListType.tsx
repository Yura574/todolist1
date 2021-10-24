import React from "react";
import {FilterValueType} from "./App";

export type  TaskType = {
    id: number,
    title: string,
    isDone: boolean
}

type TodoListType = {
    title: string,
    tasks: Array<TaskType>
    removeTask: (id:number) => void
    changeFilter: (value: FilterValueType) => void
}


export function TodoList(props: TodoListType) {

    const task = props.tasks.map(t => <li key={t.id}>
            <input  type="checkbox" checked={t.isDone}/>
            <span>{t.title}</span>
            <button onClick={() => {
                props.removeTask(t.id)
            }}>x
            </button>
        </li>
    )

    return (

        <div>
            <h1>{props.title}</h1>
            <div>
                <input type="text"/>
                <button>x</button>
            </div>
            <div>{task}</div>
            <div>
                <button onClick={() => {props.changeFilter('all')}}>All</button>
                <button onClick={() => {props.changeFilter('active')}}>Active</button>
                <button onClick={() => {props.changeFilter('completed')}}>Completed</button>
            </div>
        </div>
    )
}