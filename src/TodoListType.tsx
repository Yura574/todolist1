import React, {ChangeEvent} from "react";
import {FilterValueType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

export type  PropsType = {
    id: string,
    title: string,
    isDone: boolean
}

type TodoListType = {
    title: string,
    tasks: Array<PropsType>
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValueType, todolistId: string) => void
    addNewTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilterValueType
    id: string
    removeTodolist: (todolistId: string) => void
    changeTitleTodolist: (title: string, todolistId: string) => void
    changeTitleTask: (title: string, todolistId: string, taskId: string) => void
}


export function TodoList(props: TodoListType) {


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
        const changeTitle = (title: string) => {
            props.changeTitleTask(title, props.id, t.id,)
        }
        return (
            <li key={t.id} className={t.isDone ? 'opacity' : ''}>
                <Checkbox
                    checked={t.isDone}
                    onChange={changeStatus}
                    color={'secondary'}
                    size={'small'}
                />
                <EditableSpan title={t.title} changeTitle={changeTitle}/>
                <IconButton onClick={deleteTask} size={'small'} color={"primary"}><Delete/></IconButton>
            </li>

        )
    })

    const addTask = (title: string) => {
        props.addNewTask(title, props.id)
    }
    const changeTitleTodolist = (title: string) => {
        props.changeTitleTodolist(title, props.id)
    }
    return (

        <div>
            <h1><EditableSpan title={props.title} changeTitle={changeTitleTodolist}/>
                <IconButton color={'secondary'} size={'small'} onClick={() => props.removeTodolist(props.id)}><Delete/></IconButton>
            </h1>
            <AddItemForm addItem={addTask}/>

            <div>{task}</div>
            <div>
                <Button
                    variant={props.filter === 'all' ? 'contained' : 'text'}
                    onClick={setFilterAll}>All
                </Button>
                <Button color={'primary'}
                        variant={props.filter === 'active' ? 'contained' : 'text'}
                        onClick={setFilterActive}>Active
                </Button>
                <Button color={'secondary'}
                        variant={props.filter === 'completed' ? 'contained' : 'text'}
                        onClick={setFilterCompleted}>Completed
                </Button>
            </div>
        </div>
    )
}

