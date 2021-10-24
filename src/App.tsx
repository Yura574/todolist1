import React from 'react';
import './App.css';
import {TodoList} from "./TodoListType";

function App() {
    const task1 = [
        {id: 1, title: 'NodeJS', isDone: true},
        {id: 1, title: 'CSS', isDone: true},
        {id: 1, title: 'JS', isDone: true},
    ]
    const task2 = [
        {id: 1, title: 'Beer', isDone: true},
        {id: 1, title: 'Milk', isDone: false},
        {id: 1, title: 'Beer', isDone: false},
    ]
    return (
        <div className="App">
         <TodoList title = 'what to read' task={task1}/>
         <TodoList title='what to buy' task={task2}/>
        </div>
    );
}

export default App;
