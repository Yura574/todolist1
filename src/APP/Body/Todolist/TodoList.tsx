import React, {useCallback} from "react";
import {AddItemForm} from "../../../CommonComponent/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../CommonComponent/EditableSpan/EditableSpan";
import {TasksComponent} from "../../../CommonComponent/TaskComponent/TasksComponent";
import {Button} from "../../../CommonComponent/Button/MyButton/Button";
import deleteBasket from '../../Header/image/deleteBasket.svg'
import classes from "../../../CommonComponent/Button/MyButton/Button.module.css";
import classTodo from './Todolist.module.css'
import {FilterValueType} from "../../store/todolist-reducer";
import {useDispatch, useSelector} from "react-redux";
import {StoreType} from "../../store/store";
import {addNewTaskAC} from "../../store/task-reducer";

export type  TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

type TodoList = {
    title: string,
    changeFilter: (todolistId: string, value: FilterValueType) => void
    filter: FilterValueType
    todolistId: string
    removeTodolist: (todolistId: string) => void
    editTodolistTitle: (todolistId: string, title: string) => void
}


export const TodoList = React.memo((props: TodoList) => {
    console.log('render Todolist')
    const dispatch = useDispatch()
    let tasks = useSelector<StoreType, Array<TaskType>>(state => state.tasks[props.todolistId])

    if (props.filter === "Active") {
        tasks = tasks.filter(t => t.isDone)
    }
    if (props.filter === "Completed") {
        tasks = tasks.filter(t => !t.isDone)
    }

    const setFilter = useCallback((name: FilterValueType) => {
        props.changeFilter(props.todolistId, name)
    }, [props.changeFilter, props.todolistId])

    const editTodolistTitle = useCallback((title: string) => props.editTodolistTitle(props.todolistId, title), [props.editTodolistTitle, props.todolistId])
    const addTask = useCallback((title: string) => dispatch(addNewTaskAC(props.todolistId, title)), [props.todolistId])
    const removeTodolist = useCallback(() => props.removeTodolist(props.todolistId), [props.removeTodolist, props.todolistId])
    return (

        <div className={classTodo.todoBody}>
            <h1><EditableSpan callback={editTodolistTitle} title={props.title}/>
                <Button nameButton={'x'}
                        callback={removeTodolist}
                        classes={'button_svg'}
                        img={deleteBasket}
                />
            </h1>

            <div><AddItemForm addItem={addTask}/></div>

            <div>
                {tasks.map(task => <TasksComponent todolistId={props.todolistId} task={task} />)}
            </div>
            <div>
                <Button filter={props.filter}
                        nameButton={'All'}
                        callback={useCallback(() => setFilter('All'), [setFilter])}
                        classes={`${classes.btn} ${classes.bubble}   ${classes.left} `}/>
                <Button filter={props.filter}
                        nameButton={'Active'}
                        callback={useCallback(() => setFilter('Active'), [setFilter])}
                        classes={`${classes.buttonActive} ${classes.btn} ${classes.bubble}   ${classes.left}`}/>
                <Button filter={props.filter}
                        nameButton={'Completed'}
                        callback={useCallback(() => setFilter('Completed'), [setFilter])}
                        classes={`${classes.buttonCompleted}  ${classes.btn} ${classes.bubble}   ${classes.left}`}/>
            </div>
        </div>
    )
})