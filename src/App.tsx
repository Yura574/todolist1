import {Header} from "./APP/Header/Header";
import AppTodolistWithReducer from "./APP/Body/AppTodolistWithReducer";


export function App() {
    return (
        <div>
            <Header/>
            <AppTodolistWithReducer/>
        </div>
    )
}