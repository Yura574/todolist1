import React from 'react';
import '../../App.css';
import { TodoList} from "./Todolist/TodoList";
import {v1} from "uuid";
import {AddNewList} from "./AddNewTodoList/AddNewList";
import {
    addTodolistAC,
    changeFilterTodolistAC,
    editTodolistTitleAC, FilterValueType,
    removeTodolistAC,
    TodolistStateType
} from "../store/todolist-reducer";
import {
    addNewTaskAC,
    changeTaskStatusAC,
     editTaskTitleAC,
    removeTaskAC,
     TasksType
} from "../store/task-reducer";
import {useDispatch, useSelector} from "react-redux";
import {StoreType} from "../store/store";




function AppTodolist() {

    const dispatch = useDispatch()
    const todolist = useSelector<StoreType, TodolistStateType>(state => state.todolist)
    const tasks = useSelector<StoreType, TasksType>(state => state.tasks)


    function removeTask(todolistId: string, taskId: string) {
        dispatch( removeTaskAC(todolistId, taskId))
    }

    function addNewTask(todolistId: string, title: string) {
        dispatch( addNewTaskAC(todolistId, title) )
    }


    function changeTaskStatus(todolistId: string, taskId: string, isDone: boolean) {
        dispatch( changeTaskStatusAC(todolistId, taskId, isDone))
    }

    const editTaskTitle = (todolistId: string, taskId: string, title: string) => {
        dispatch( editTaskTitleAC(todolistId, title, taskId) )
    }


    function removeTodolist(todolistId: string) {
        dispatch( removeTodolistAC(todolistId))
    }

    const addTodolist = (title: string) => {
        const newId = v1()
        dispatch( addTodolistAC(newId,title))
    }

    const editTodolistTitle = (todolistId: string, title: string) => {
        dispatch( editTodolistTitleAC(todolistId, title))
    }

    function changeFilter(todolistId: string, value: FilterValueType) {
        dispatch( changeFilterTodolistAC(todolistId, value))
    }


    return (
        <div className="App">
            <div>
                {todolist.map((tl) => {
                    let taskForTodoList = tasks[tl.id];

                    if (tl.filter === 'Completed') {
                        taskForTodoList = tasks[tl.id].filter(t => t.isDone)
                    }
                    if (tl.filter === 'Active') {
                        taskForTodoList = taskForTodoList.filter(t => !t.isDone)
                    }
                    return <TodoList
                        todolistId={tl.id}
                        key={tl.id}
                        title={tl.title}
                        tasks={taskForTodoList}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addNewTask={addNewTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                        editTaskTitle={editTaskTitle}
                        editTodolistTitle={editTodolistTitle}
                    />
                })}
            </div>
            <div>
                <AddNewList addTodoList={addTodolist}/>
            </div>

        </div>
    );
}

export default AppTodolist;
