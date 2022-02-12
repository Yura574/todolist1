import AppTodolist from "./AppTodolist";
import {Header} from "./Header/Header";
import img from './Header/image/plus.png'
import deleteIcon from "./Header/image/deleteIcon.svg"

export function App() {
    return (
        <div>
            <Header/>
            <AppTodolist/>
           <button><img src={deleteIcon} alt={''} style={{width: '20px'}}/></button>
        </div>
    )
}