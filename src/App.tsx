import {Header} from "./APP/Header/Header";
import React from "react";
import {AppTodolist} from "./APP/Body/AppTodolist";


export const App = React.memo(() => {
    console.log('render App')
    return (
        <div>
            <Header/>
            <AppTodolist/>
        </div>
    )
})