import React, {useCallback} from 'react';
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
import {useDispatch, useSelector} from "react-redux";
import {StoreType} from "../store/store";




export const  AppTodolist = React.memo(()=> {
    console.log('render AppTodolist')

    const dispatch = useDispatch()
    const todolist = useSelector<StoreType, TodolistStateType>(state => state.todolist)


    const removeTodolist = useCallback((todolistId: string) => {
        dispatch( removeTodolistAC(todolistId))
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        const newId = v1()
        dispatch( addTodolistAC(newId,title))
    },[dispatch])

    const editTodolistTitle = useCallback((todolistId: string, title: string) => {
        dispatch( editTodolistTitleAC(todolistId, title))
    },[dispatch])

    const changeFilter = useCallback((todolistId: string, value: FilterValueType) => {
        dispatch( changeFilterTodolistAC(todolistId, value))
    },[dispatch])


    return (
        <div className="App">
            <div>
                {todolist.map((tl) => {
                    return <TodoList
                        todolistId={tl.id}
                        key={tl.id}
                        title={tl.title}
                        changeFilter={changeFilter}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                        editTodolistTitle={editTodolistTitle}
                    />
                })}
            </div>
            <div>
                <AddNewList addTodoList={addTodolist}/>
            </div>

        </div>
    );
})

