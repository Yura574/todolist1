import React from "react";
import {FilterValueType} from "./AppTodolist";
import {AddItemForm} from "./CommonComponent/AddItemForm/AddItemForm";
import {EditableSpan} from "./CommonComponent/EditableSpan/EditableSpan";
import {TasksComponent} from "./CommonComponent/TaskComponent/TasksComponent";
import {Button} from "./CommonComponent/Button/Button";

export type  PropsType = {
    id: string,
    title: string,
    isDone: boolean
}

type TodoList = {
    title: string,
    tasks: Array<PropsType>
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValueType, todolistId: string) => void
    addNewTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilterValueType
    todolistId: string
    removeTodolist: (todolistId: string) => void
    editTaskTitle: (todolistId: string, id: string, title: string) => void
    editTodolistTitle: (todolistId: string, title: string) => void
}


export function TodoList(props: TodoList) {

    const setFilter = (name: FilterValueType) => {
        props.changeFilter(name, props.todolistId)
    }

    const editTodolistTitle = (title: string) => props.editTodolistTitle(props.todolistId, title)
    const addTask = (title: string) => props.addNewTask(title, props.todolistId)

    return (

        <div>
            <h1><EditableSpan callback={editTodolistTitle} title={props.title}/>
                <Button nameButton={'x'}
                        callback={() => props.removeTodolist(props.todolistId)}
                        classes={''}
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
                        classes={'buttonAll'}/>
                <Button filter={props.filter}
                        nameButton={'Active'}
                        callback={() => setFilter('Active')}
                        classes={'button2'}/>
                <Button filter={props.filter}
                        nameButton={'Completed'}
                        callback={() => setFilter('Completed')}
                        classes={'button3'}/>
            </div>
        </div>
    )
}