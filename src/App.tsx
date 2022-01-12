import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoListType";

export type FilterValueType =  'all' | 'completed' | 'active'

function App() {
    debugger
    let [task, setTask] = useState([
        {id: 1, title: 'NodeJS', isDone: true},
        {id: 2, title: 'CSS', isDone: true},
        {id: 3, title: 'JS', isDone: true},
        {id: 4, title: 'React', isDone: false},
    ])

    let [filter, setFilter] = useState<FilterValueType>('all')

    function removeTask(id: number) {
        const task2 = task.filter(t => t.id !== id)
        setTask(task2)
    }

    function changeFilter(value: 'all' | 'active' | 'completed') {
        setFilter(value)
    }

    let taskForTodoList = task;

    if (filter === 'completed') {
        taskForTodoList = task.filter(t => t.isDone)
    }
    if (filter === 'active') {
        taskForTodoList = task.filter(t => !t.isDone)
    }


    return (
        <div className="App">
            <TodoList title='what to read'
                      tasks={taskForTodoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
