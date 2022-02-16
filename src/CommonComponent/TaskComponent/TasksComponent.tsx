import React from "react";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {PropsType} from "../../APP/Body/Todolist/TodoList";
import {Checkbox} from "../Checkbox/Checkbox";
import {Button} from "../Button/MyButton/Button";
import deleteBasket from '../../APP/Header/image/deleteBasket.svg'
import './TasksComponent.css'

type TasksComponentType = {
    removeTask: (id: string, todolistId: string) => void
    tasks: Array<PropsType>
    todolistId: string
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    editTaskTitle: (todolistId: string, id: string, title: string) => void
}


export function TasksComponent(props: TasksComponentType) {
    debugger
    return (
        <div>
            {props.tasks.map(t => {
                const deleteTask = () => {
                    props.removeTask(props.todolistId, t.id)
                }
                const changeStatus = (id: string, isDone: boolean) => {
                    props.changeTaskStatus(props.todolistId, id, isDone)
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