import React, {useState} from 'react';
import '../../App.css';
import {PropsType, TodoList} from "./Todolist/TodoList";
import {v1} from "uuid";
import {AddNewList} from "./AddNewTodoList/AddNewList";

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

    let [todolist, setTodolist] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'what to learn', filter: 'All'},
        {id: todolistId2, title: 'what to buy', filter: 'All'}
    ])

    let [tasks, setTasks] = useState<TasksType>({

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

    function removeTodolist(todolistId: string) {
        setTodolist(todolist.filter(tl => tl.id !== todolistId))
    }

    function removeTask(id: string, todolistId: string) {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(tl => tl.id !== id)})
    }

    function addNewTask(title: string, todolistId: string) {
        const newTask = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todolistId]: [...tasks[todolistId], newTask]})
    }

    function changeFilter(value: FilterValueType, todolistId: string) {
        setTodolist(todolist.map(tl => tl.id === todolistId ? {...tl, filter: value} : tl))
    }

    function changeTaskStatus(taskId: string, isDone: boolean, todolistId: string) {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone} : t)})
    }

    const addTodolist = (title: string) => {
        const newId = v1()
        const newTodolist: TodolistType = {id: newId, title, filter: 'All'}
        setTodolist([ ...todolist, newTodolist])
        setTasks({...tasks, [newId]: []})
    }

    const editTaskTodolist = (todolistId: string, title: string, taskId: string) => {
        setTasks(
            {
                ...tasks, [todolistId]: tasks[todolistId].map(
                    tl => tl.id === taskId ? {...tl, title: title} : tl)

            })
    }
    const editTodolistTitle = (todolistId: string, title: string) => {
        setTodolist(todolist.map(tl => tl.id === todolistId ? {...tl, title: title} : tl))
    }


    return (
        <div className="App">
            <div >
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
                        editTaskTitle={editTaskTodolist}
                        editTodolistTitle={editTodolistTitle}
                    />
                })}
            </div>
            <div >
             <AddNewList addTodoList={addTodolist}/>
            </div>

        </div>
    );
}

export default AppTodolist;
