import React, {useState} from 'react';
import './App.css';
import {PropsType, TodoList} from "./TodoListType";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type FilterValueType = 'all' | 'completed' | 'active'
type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}

type TasksStateType = {
    [key: string]: Array<PropsType>
}

function App() {

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodolist] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'what to learn', filter: 'all'},
        {id: todolistId2, title: 'what to buy', filter: 'all'}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
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

    const changeTitleTodolist = (title: string, todolistId: string) => {
        const todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.title = title
            setTodolist([...todolists])
        }
    }
    const changeTitleTask = (title: string, todolistId: string, taskId: string) => {
        debugger
        const task = tasks[todolistId]
        const taskTitle = task.find(t => t.id === taskId)
        if (taskTitle) {
            taskTitle.title = title
            setTasks({...tasks})
        }
    }

    function removeTodolist(todolistId: string) {
        let todo = todolists.filter(tl => tl.id !== todolistId)
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
        let todo = todolists.find(tl => tl.id === todolistId)
        if (todo) {
            todo.filter = value
            setTodolist([...todolists])
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

    function addTodolist(title: string) {
        const todolist: TodolistType = {
            id: v1(), title: title, filter: 'all'
        }
        setTodolist([todolist, ...todolists])


        setTasks({...tasks, [todolist.id]: []})
    }

    return (
        <div className="App">
            <AppBar position={'static'}>
                <Toolbar>
                    <IconButton edge={'start'}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={'h6'}>
                        News
                    </Typography>
                    <Button color={'inherit'}>Login</Button>
                </Toolbar>

            </AppBar>
            <Container fixed>
                <Grid container>
                    <Paper elevation={3} style={{padding: "10px", margin: "10px 0 10px 0"}} >
                    <AddItemForm addItem={addTodolist}/>
                    </Paper>
                </Grid>
                <Grid container spacing={5}>
                    {
                        todolists.map((tl) => {
                            let taskForTodoList = tasks[tl.id];

                            if (tl.filter === 'completed') {
                                taskForTodoList = tasks[tl.id].filter(t => t.isDone)
                            }
                            if (tl.filter === 'active') {
                                taskForTodoList = taskForTodoList.filter(t => !t.isDone)
                            }
                            return <Grid item>
                                <Paper elevation={3} style={{padding: '10px'}} >
                                    <TodoList
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
                                        changeTitleTask={changeTitleTask}
                                        changeTitleTodolist={changeTitleTodolist}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>

        </div>
    );
}

export default App;
