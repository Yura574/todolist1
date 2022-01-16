import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoListType";
import {v1} from "uuid";

export type FilterValueType =  'all' | 'completed' | 'active'

function App() {
    debugger
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'NodeJS', isDone: true},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
    ])

    let [filter, setFilter] = useState<FilterValueType>('all')

    function removeTask(id: string) {
        const task2 = tasks.filter(t => t.id !== id)
        setTasks(task2)
    }
    function addNewTask (title: string) {
        const newTask= {id: v1(), title: title, isDone: false}
        setTasks([newTask, ...tasks])
    }

    function changeFilter(value: 'all' | 'active' | 'completed') {
        setFilter(value)
    }
        function changeTaskStatus (taskId: string, isDone: boolean) {
        const task = tasks.find(t => t.id === taskId)
            if(task){
                task.isDone = isDone
            }
            setTasks([...tasks])
        }

    let taskForTodoList = tasks;

    if (filter === 'completed') {
        taskForTodoList = tasks.filter(t => t.isDone)
    }
    if (filter === 'active') {
        taskForTodoList = tasks.filter(t => !t.isDone)
    }


    return (
        <div className="App">
            <TodoList title='what to read'
                      tasks={taskForTodoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addNewTask ={addNewTask}
                      changeTaskStatus={changeTaskStatus}
                      filter={filter}
            />
        </div>
    );
}

export default App;
