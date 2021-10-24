import React from "react";

type  TaskType = {
    id: number,
    title: string,
    isDone: boolean
}

type TodoListType = {
    title: string,
    task: Array<TaskType>
}


export function TodoList(props: TodoListType) {



    return (

        <div>
            <h1>{props.title}</h1>
            <div>
                <input type="text"/>
                <button>+</button>
            </div>
            <li><input type="checkbox" checked={props.task[0].isDone}/> <span>{props.task[0].title}</span></li>
            <li><input type="checkbox" checked={props.task[1].isDone}/> <span>{props.task[1].title}</span></li>
            <li><input type="checkbox" checked={props.task[2].isDone}/> <span>{props.task[2].title}</span></li>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}