import classes from "./Header.module.css";
import logoTodo from './image/Todolist.svg'

export function Header() {
    return (
        <div className={classes.headerBody}>
            <img
                className={classes.logo}
                 src={logoTodo}
                 alt={'logo'}/>

        </div>
    )
}