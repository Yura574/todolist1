import React, {useReducer} from 'react';
import '../../App.css';
import {PropsType, TodoList} from "./Todolist/TodoList";
import {v1} from "uuid";
import {AddNewList} from "./AddNewTodoList/AddNewList";
import {
    addTodolistAC,
    changeFilterTodolistAC,
    editTodolistTitleAC,
    removeTodolistAC,
    todolistReducer
} from "../reducers/todolist-reducer";
import {
    addEmptyArrayNewTodolistAC,
    addNewTaskAC,
    changeTaskStatusAC,
    deleteArrayTasksAC, editTaskTitleAC,
    removeTaskAC,
    taskReducer
} from "../reducers/task-reducer";

export type FilterValueType = 'All' | 'Completed' | 'Active'
export type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}
export type TasksType = {
    [key: string]: Array<PropsType>
}

function AppTodolist() {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolist, dispatchToTodolist] = useReducer(todolistReducer, [
        {id: todolistId1, title: 'what to learn', filter: 'All'},
        {id: todolistId2, title: 'what to buy', filter: 'All'}
    ])

    let [tasks, dispatchToTasks] = useReducer(taskReducer, {
            [todolistId1]: [
                {id: v1(), title: 'NodeJS', isDone: true},
                {id: v1(), title: 'CSS', isDone: true},
                {id: v1(), title: 'JS', isDone: true},
                {id: v1(), title: 'React', isDone: false},
            ],
            [todolistId2]: [
                {id: v1(), title: 'Book', isDone: true},
                {id: v1(), title: 'Notebook', isDone: false}
            ],
        }
    )


    function removeTask(todolistId: string, taskId: string) {
        dispatchToTasks( removeTaskAC(todolistId, taskId))
    }

    function addNewTask(todolistId: string, title: string) {
        dispatchToTasks( addNewTaskAC(todolistId, title) )
    }


    function changeTaskStatus(todolistId: string, taskId: string, isDone: boolean) {
        dispatchToTasks( changeTaskStatusAC(todolistId, taskId, isDone))
    }

    const editTaskTitle = (todolistId: string, taskId: string, title: string) => {
        dispatchToTasks( editTaskTitleAC(todolistId, title, taskId) )
    }


    function removeTodolist(todolistId: string) {
        dispatchToTodolist( removeTodolistAC(todolistId))
        dispatchToTasks( deleteArrayTasksAC(todolistId))
    }

    const addTodolist = (title: string) => {
        const newId = v1()
        dispatchToTodolist( addTodolistAC(newId,title))
        dispatchToTasks(addEmptyArrayNewTodolistAC(newId))
    }

    const editTodolistTitle = (todolistId: string, title: string) => {
        dispatchToTodolist( editTodolistTitleAC(todolistId, title))
    }

    function changeFilter(todolistId: string, value: FilterValueType) {
        dispatchToTodolist( changeFilterTodolistAC(todolistId, value))
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
