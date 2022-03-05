import React, {useCallback} from "react";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {TaskType} from "../../APP/Body/Todolist/TodoList";
import {Checkbox} from "../Checkbox/Checkbox";
import {Button} from "../Button/MyButton/Button";
import deleteBasket from '../../APP/Header/image/deleteBasket.svg'
import './TasksComponent.css'
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, editTaskTitleAC, removeTaskAC} from "../../APP/store/task-reducer";

type TasksComponentType = {
    todolistId: string

    task: TaskType
}


export const TasksComponent = React.memo((props: TasksComponentType) => {
    console.log('render TaskComponent')
    const dispatch = useDispatch()
    const deleteTask = useCallback(() => {
        dispatch(removeTaskAC(props.todolistId, props.task.id))
    },[props.todolistId, props.task.id])
    const changeStatus = useCallback((id: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(props.todolistId, id, isDone))
    },[props.todolistId])
    const editTodoTitle = useCallback((title: string) => {
        dispatch(editTaskTitleAC(props.todolistId, props.task.id, title))
    },[props.todolistId, props.task.id])
    return (
        <div>
            <li key={props.task.id} className={props.task.isDone ? 'opacity' : ''}>

                <Checkbox id={props.task.id} isDone={props.task.isDone} changeTaskStatus={changeStatus}/>

                <EditableSpan callback={editTodoTitle} title={props.task.title}/>
                <Button nameButton={'x'} callback={deleteTask}
                        classes={'button_svg'}
                        img={deleteBasket}
                />
            </li>


        </div>

    )

})