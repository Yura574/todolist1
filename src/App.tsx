import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoListType";
import {v1} from "uuid";

export type FilterValueType = 'all' | 'completed' | 'active'
type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}

function App() {

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolist, setTodolist] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'what to learn', filter: 'all'},
        {id: todolistId2, title: 'what to buy', filter: 'all'}
    ])

    let [tasks, setTasks] = useState({
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
        let todo = todolist.filter(tl => tl.id !== todolistId)
        setTodolist(todo)
    }

    function removeTask(id: string, todolistId: string) {
        let todo = tasks[todolistId]
        tasks[todolistId] = todo.filter(t => t.id !== id)
        setTasks({...tasks})
    }

    function addNewTask(title: string, todolistId: string) {

        const newTask = {id: v1(), title: title, isDone: false}
        tasks[todolistId] = [newTask, ...tasks[todolistId]]
        setTasks({...tasks})
    }

    function changeFilter(value: FilterValueType, todolistId: string) {
        let todo = todolist.find(tl => tl.id === todolistId)
        if (todo) {
            todo.filter = value
            setTodolist([...todolist])
        }

    }

    function changeTaskStatus(taskId: string, isDone: boolean, todolistId: string) {
        const tasksTodo = tasks[todolistId]
        const task = tasksTodo.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }

    }


    return (
        <div className="App">
            {
                todolist.map((tl) => {
                    let taskForTodoList = tasks[tl.id];

                    if (tl.filter === 'completed') {
                        taskForTodoList = tasks[tl.id].filter(t => t.isDone)
                    }
                    if (tl.filter === 'active') {
                        taskForTodoList = taskForTodoList.filter(t => !t.isDone)
                    }
                    return <TodoList
                        id={tl.id}
                        key={tl.id}
                        title={tl.title}
                        tasks={taskForTodoList}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addNewTask={addNewTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                    />
                })
            }

        </div>
    );
}

export default App;
