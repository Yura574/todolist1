import classes from "./Header.module.css";
import logoTodo from './image/Todolist.svg'
import React from "react";

export const Header = React.memo(() => {
    console.log('render Header')
    return (
        <div className={classes.headerBody}>
            <img
                className={classes.logo}
                 src={logoTodo}
                 alt={'logo'}/>

        </div>
    )
})