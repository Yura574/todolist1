import React from "react";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {PropsType} from "../../TodoList";
import {Checkbox} from "../Checkbox/Checkbox";
import {Button} from "../Button/Button";

import deleteBasket from '../../Header/image/deleteBasket.svg'
import img from '../../Header/image/plus.png'
import './TasksComponent.css'

type TasksComponentType = {
    removeTask: (id: string, todolistId: string) => void
    tasks: Array<PropsType>
    todolistId: string
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    editTaskTitle: (todolistId: string, id: string, title: string) => void
}


export function TasksComponent(props: TasksComponentType) {
    return (

        <div>
            {props.tasks.map(t => {
                const deleteTask = () => {
                    props.removeTask(t.id, props.todolistId)
                }
                const changeStatus = (id: string, isDone: boolean) => {
                    props.changeTaskStatus(id, isDone, props.todolistId)
                }
                const editTodoTitle = (title: string) => {
                    props.editTaskTitle(props.todolistId, title, t.id)
                }
                return (
                    <li key={t.id} className={t.isDone ? 'opacity' : ''}>

                        <Checkbox id={t.id} isDone={t.isDone} changeTaskStatus={changeStatus}/>

                        <EditableSpan callback={editTodoTitle} title={t.title}/>
                        <Button nameButton={'x'} callback={() => deleteTask()}
                                classes={'button_svg'}
                                img={deleteBasket}
                        />
                    </li>

                )
            })
            }</div>

    )

}