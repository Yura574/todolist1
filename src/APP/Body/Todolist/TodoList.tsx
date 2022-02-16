import React from "react";
import {AddItemForm} from "../../../CommonComponent/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../CommonComponent/EditableSpan/EditableSpan";
import {TasksComponent} from "../../../CommonComponent/TaskComponent/TasksComponent";
import {Button} from "../../../CommonComponent/Button/MyButton/Button";
import deleteBasket from '../../Header/image/deleteBasket.svg'
import classes from "../../../CommonComponent/Button/MyButton/Button.module.css";
import classTodo from './Todolist.module.css'
import {FilterValueType} from "../AppTodolistWithReducer";

export type  PropsType = {
    id: string,
    title: string,
    isDone: boolean
}

type TodoList = {
    title: string,
    tasks: Array<PropsType>
    removeTask: (todolistId: string, id: string) => void
    changeFilter: (todolistId: string, value: FilterValueType) => void
    addNewTask: (title: string, todolistId: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    filter: FilterValueType
    todolistId: string
    removeTodolist: (todolistId: string) => void
    editTaskTitle: (todolistId: string, id: string, title: string) => void
    editTodolistTitle: (todolistId: string, title: string) => void
}


export function TodoList(props: TodoList) {

    const setFilter = (name: FilterValueType) => {
        props.changeFilter(props.todolistId, name)
    }

    const editTodolistTitle = (title: string) => props.editTodolistTitle(props.todolistId, title)
    const addTask = (title: string) => props.addNewTask(props.todolistId, title)

    return (

        <div className={classTodo.todoBody}>
            <h1><EditableSpan callback={editTodolistTitle} title={props.title}/>
                <Button nameButton={'x'}
                        callback={() => props.removeTodolist(props.todolistId)}
                        classes={'button_svg'}
                        img={deleteBasket}
                />
            </h1>

            <div><AddItemForm addItem={addTask}/></div>

            <TasksComponent tasks={props.tasks}
                            todolistId={props.todolistId}
                            removeTask={props.removeTask}
                            editTaskTitle={props.editTaskTitle}
                            changeTaskStatus={props.changeTaskStatus}
            />
            <div>

                <Button filter={props.filter}
                        nameButton={'All'}
                        callback={() => setFilter('All')}
                        classes={`${classes.btn} ${classes.bubble}   ${classes.left} `}/>
                <Button filter={props.filter}
                        nameButton={'Active'}
                        callback={() => setFilter('Active')}
                        classes={`${classes.buttonActive} ${classes.btn} ${classes.bubble}   ${classes.left}` }/>
                <Button filter={props.filter}
                        nameButton={'Completed'}
                        callback={() => setFilter('Completed')}
                        classes={`${classes.buttonCompleted}  ${classes.btn} ${classes.bubble}   ${classes.left}`}/>
            </div>
        </div>
    )
}